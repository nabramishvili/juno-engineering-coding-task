////////////////////////////////////////////// Helper code, do not edit /////////////////////////////////////////
import { allIds, fetchOrderById } from "../api";

////////////////////////////////// Your code tasks is below //////////////////////////////////////////////////////

export const fetchAllOrders = () => {
    const ids = allIds;
    const orders = ids.map(fetchOrderById)
    return Promise.all(orders)
    // .....
    //   1. TODO: fetch all ids using the "fetchOrderById" and the given ids, make it work as efficient and clean as possible.
};

export const bucketOrdersByUsers = async () => {
    let ordersByUsers = {};
    //   2. TODO: using the function from section 1 you should now bucket the orders by user.
    // each key in the object (ordersByUsers) represents a userId and each value is an array of the orders of that user.
    const orders = await fetchAllOrders()
    for (const order of orders) {
        ordersByUsers[order.userId] = ordersByUsers[order.userId] ? [...ordersByUsers[order.userId], order] : [order]
    }
    return ordersByUsers;
};

const isRecentOrder = order => {
    const offset = (24 * 60 * 60 * 1000) * 14;
    return order.timestamp > Date.now() - offset
}

export const getLast2WeeksOrders = async () => {
    const orders = await fetchAllOrders()
    return orders.filter(isRecentOrder)
    //   3. TODO: fetch all Ids and return array with only the last 2 weeks orders. make it work as efficient and clean as possible.
};

export const bucketOrdersByDate = async () => {
    let ordersByDate = {};
    const lastOrders = await getLast2WeeksOrders()
    for (const order of lastOrders) { 
        const dateStr = (new Date(order.timestamp)).toDateString()
        ordersByDate[dateStr] = ordersByDate[dateStr] ? [...ordersByDate[dateStr], order] : [order]
    }
    //   4. TODO: using the function from section 3 bucket the orders by date.
    // each key in the object (ordersByDate) represents a day and each value is an array of the orders in that date.
    return ordersByDate;
};


////////////////////////////////////////
