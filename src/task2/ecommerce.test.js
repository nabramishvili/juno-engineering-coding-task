import { bucketOrdersByUsers, fetchAllOrders, getLast2WeeksOrders, bucketOrdersByDate } from "./ecommerce";

test("Ecommerce - fetchAllOrders is array", async () => {
    let orders = await fetchAllOrders();
    expect(Array.isArray(orders)).toBe(true);
});

test("Ecommerce - bucketOrdersByUsers is object", async () => {
    let orders = await bucketOrdersByUsers();
    expect( typeof orders).toBe('object');
});

test("Ecommerce - getLast2WeeksOrders is array", async () => {
    let orders = await getLast2WeeksOrders();
    expect(Array.isArray(orders)).toBe(true);
});

test("Ecommerce - bucketOrdersByDate is object", async () => {
    let orders = await bucketOrdersByDate();
    expect( typeof orders).toBe('object');
});



