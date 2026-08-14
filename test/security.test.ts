import { RBACService } from '../src/lib/services/rbac.service';
import { Role } from '@prisma/client';
import { AdminCustomerService } from '../src/lib/services/admin-customer.service';
import { AdminProductSchema } from '../src/lib/validation';

async function runSecurityTests() {
  console.log('🔒 Starting Security & Authorization Test Suite...');
  let passed = 0;
  let total = 0;

  function assert(condition: boolean, description: string) {
    total++;
    if (condition) {
      console.log(`  ✅ [PASS] ${description}`);
      passed++;
    } else {
      console.error(`  ❌ [FAIL] ${description}`);
      throw new Error(`Security test failed: ${description}`);
    }
  }

  assert(
    !RBACService.hasPermission(Role.CUSTOMER, 'notification:read'),
    'CUSTOMER must NOT have notification:read permission'
  );
  assert(
    !RBACService.hasPermission(Role.STAFF, 'notification:resend'),
    'STAFF must NOT have notification:resend permission'
  );
  assert(
    RBACService.hasPermission(Role.ADMIN, 'notification:resend'),
    'ADMIN must have notification:resend permission'
  );

  // 1. CUSTOMER access to admin permissions
  assert(
    !RBACService.hasPermission(Role.CUSTOMER, 'dashboard:read'),
    'CUSTOMER must NOT have dashboard:read permission'
  );
  assert(
    !RBACService.hasPermission(Role.CUSTOMER, 'order:read'),
    'CUSTOMER must NOT have order:read permission'
  );
  assert(
    !RBACService.hasPermission(Role.CUSTOMER, 'settings:manage'),
    'CUSTOMER must NOT have settings:manage permission'
  );

  // 2. STAFF permissions vs restricted permissions
  assert(
    RBACService.hasPermission(Role.STAFF, 'product:read'),
    'STAFF must have product:read permission'
  );
  assert(
    RBACService.hasPermission(Role.STAFF, 'inventory:adjust'),
    'STAFF must have inventory:adjust permission'
  );
  assert(
    !RBACService.hasPermission(Role.STAFF, 'settings:manage'),
    'STAFF must NOT have settings:manage permission'
  );
  assert(
    !RBACService.hasPermission(Role.STAFF, 'role:manage'),
    'STAFF must NOT have role:manage permission'
  );

  // 3. ADMIN permissions vs role escalation
  assert(
    RBACService.hasPermission(Role.ADMIN, 'product:create'),
    'ADMIN must have product:create permission'
  );
  assert(
    RBACService.hasPermission(Role.ADMIN, 'settings:manage'),
    'ADMIN must have settings:manage permission'
  );
  assert(
    !RBACService.hasPermission(Role.ADMIN, 'role:manage'),
    'ADMIN must NOT have role:manage permission (cannot promote users or self)'
  );

  // 4. SUPER_ADMIN permissions
  assert(
    RBACService.hasPermission(Role.SUPER_ADMIN, 'role:manage'),
    'SUPER_ADMIN must have role:manage permission'
  );

  // 5. Test AdminCustomerService.updateUserRole authorization guard
  try {
    await AdminCustomerService.updateUserRole('dummy-id', Role.SUPER_ADMIN, {
      id: 'admin-id',
      role: Role.ADMIN,
    });
    assert(false, 'ADMIN updating user role should have thrown an error');
  } catch (err: any) {
    assert(
      err?.message?.includes('Forbidden'),
      'ADMIN updating user role throws Forbidden error'
    );
  }

  try {
    await AdminCustomerService.updateUserRole('dummy-id', Role.SUPER_ADMIN, {
      id: 'staff-id',
      role: Role.STAFF,
    });
    assert(false, 'STAFF updating user role should have thrown an error');
  } catch (err: any) {
    assert(
      err?.message?.includes('Forbidden'),
      'STAFF updating user role throws Forbidden error'
    );
  }

  // 6. Test product price Zod validation (negative/zero price rejection)
  const invalidPriceResult = AdminProductSchema.safeParse({
    name: 'Test Product',
    slug: 'test-product',
    sku: 'TST-001',
    description: 'Test Description',
    shortDescription: 'Short desc',
    basePricePence: -500, // Invalid negative price!
    brandId: '00000000-0000-0000-0000-000000000000',
    categoryId: '00000000-0000-0000-0000-000000000000',
  });

  assert(!invalidPriceResult.success, 'Manipulated negative product price is rejected server-side');

  console.log(`\n🎉 Security Test Suite finished: ${passed}/${total} assertions passed.`);
}

runSecurityTests().catch((err) => {
  console.error('Security test failed:', err);
  process.exit(1);
});
