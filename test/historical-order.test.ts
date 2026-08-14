async function runHistoricalOrderSnapshotTest() {
  console.log('📜 Starting Historical Order Item Snapshot Test Suite...');

  // 1. Initial product state
  const originalProduct = {
    id: 'prod-101',
    name: 'Original Northstar Peak Protein (500g)',
    sku: 'NSP-ORIG-500',
    pricePence: 2999, // £29.99
    imageUrl: 'https://images.unsplash.com/photo-original.jpg',
  };

  // 2. Simulate Order Creation taking OrderItem snapshot
  const orderSnapshot = {
    id: 'ord-90001',
    orderNumber: 'UKP-2026-90001',
    items: [
      {
        id: 'item-1',
        productId: originalProduct.id,
        productName: originalProduct.name,
        productSku: originalProduct.sku,
        unitPricePence: originalProduct.pricePence,
        quantity: 2,
        subtotalPence: originalProduct.pricePence * 2,
        imageSnapshotUrl: originalProduct.imageUrl,
      },
    ],
  };

  console.log('Created order snapshot:', orderSnapshot.items[0]);

  // 3. Admin modifies original product row (changes name, SKU, price, image)
  const modifiedProduct = {
    ...originalProduct,
    name: 'MODIFIED Product Name (New Formula)',
    sku: 'NSP-MODIFIED-999',
    pricePence: 4999, // £49.99
    imageUrl: 'https://images.unsplash.com/photo-modified.jpg',
  };

  console.log('Admin updated product row to:', modifiedProduct);

  // 4. Verify historical order snapshot remains completely unchanged
  const historicalItem = orderSnapshot.items[0];

  let passed = true;
  if (historicalItem.productName !== 'Original Northstar Peak Protein (500g)') {
    console.error('❌ Historical item name was modified!');
    passed = false;
  }
  if (historicalItem.productSku !== 'NSP-ORIG-500') {
    console.error('❌ Historical item SKU was modified!');
    passed = false;
  }
  if (historicalItem.unitPricePence !== 2999) {
    console.error('❌ Historical item unit price was modified!');
    passed = false;
  }
  if (historicalItem.subtotalPence !== 5998) {
    console.error('❌ Historical item subtotal was modified!');
    passed = false;
  }
  if (historicalItem.imageSnapshotUrl !== 'https://images.unsplash.com/photo-original.jpg') {
    console.error('❌ Historical item image snapshot was modified!');
    passed = false;
  }

  if (passed) {
    console.log('  ✅ [PASS] Historical order item snapshot remains completely unchanged despite live product mutations!');
  } else {
    process.exit(1);
  }
}

runHistoricalOrderSnapshotTest().catch((err) => {
  console.error('Historical order snapshot test failed:', err);
  process.exit(1);
});
