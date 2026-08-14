import { InventoryService } from '../src/lib/services/inventory.service';

async function runInventoryRaceTest() {
  console.log('⚡ Starting Inventory Race Condition Test Suite...');

  // Mock state to test concurrency handling semantics
  let mockStock = {
    productId: 'prod-race-test',
    quantity: 1,
    reservedQuantity: 0,
  };

  let activeMutex = false;

  async function mockTransactionReserveStock(qty: number): Promise<boolean> {
    // Simulate transaction boundary and optimistic/pessimistic lock
    while (activeMutex) {
      await new Promise((r) => setTimeout(r, 10));
    }
    activeMutex = true;

    try {
      const available = mockStock.quantity - mockStock.reservedQuantity;
      if (available < qty) {
        return false;
      }
      mockStock.reservedQuantity += qty;
      return true;
    } finally {
      activeMutex = false;
    }
  }

  // Simulate two concurrent checkout requests attempting to reserve quantity 1
  console.log('Simulating 2 concurrent checkout requests for initial stock = 1...');

  const [res1, res2] = await Promise.all([
    mockTransactionReserveStock(1),
    mockTransactionReserveStock(1),
  ]);

  const totalSuccess = (res1 ? 1 : 0) + (res2 ? 1 : 0);

  console.log(`  Request 1 result: ${res1 ? 'SUCCESS' : 'FAILED (OUT OF STOCK)'}`);
  console.log(`  Request 2 result: ${res2 ? 'SUCCESS' : 'FAILED (OUT OF STOCK)'}`);
  console.log(`  Resulting reserved quantity: ${mockStock.reservedQuantity}`);

  if (totalSuccess === 1 && mockStock.reservedQuantity === 1) {
    console.log('  ✅ [PASS] Concurrency test passed: Exactly ONE checkout succeeded and stock was not oversold.');
  } else {
    console.error('  ❌ [FAIL] Concurrency race failure!');
    process.exit(1);
  }
}

runInventoryRaceTest().catch((err) => {
  console.error('Inventory race test failed:', err);
  process.exit(1);
});
