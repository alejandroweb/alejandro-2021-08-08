import { OrderBookQueue } from './use-order-book.types';

const MAX_ROWS = 10;

/**
 * Prepares the orders to be parsed, adding the missing ones and removing the orders
 * with size 0.
 *
 * @param {Object} old
 * @param {Array<Array<Number>>} list
 * @returns { Object }
 */
const prepareOrders = (old: { [key: string]: number }, list: number[][]) =>
  list.reduce(
    (carry, item) => {
      const [price, size] = item;

      if (size === 0) {
        delete carry[price];
      } else {
        carry[price] = size;
      }

      return carry;
    },
    { ...old }
  );

/**
 * Creates a new object with all of asks and bids ready to be saved and sent to the view
 *
 * @param {Object} queue
 * @param {Array<Array<Number>>} asks
 * @param {Array<Array<Number>>} bids
 * @returns {Object}
 */
export const mergeOrderData = (queue: OrderBookQueue, asks: number[][], bids: number[][]) => ({
  asks: prepareOrders(queue.asks, asks),
  bids: prepareOrders(queue.bids, bids),
});

const sumSizes = (orders: [string, number][]) => {
  let sizes = 0;

  return orders.map((item) => {
    sizes += item[1];

    return {
      price: parseFloat(item[0]),
      size: item[1],
      total: sizes,
    };
  });
};

/**
 * Generates de information needed to show the orders data in the view. It creates a new data
 * structure including totals and grouping the information in price ranges.
 *
 * @param {Object} orders
 * @param {Number} groupBy
 * @returns {Object}
 */
export const groupOrders = (orders: OrderBookQueue, groupBy: number) => {
  const newAsks = sumSizes(Object.entries(orders.asks).sort((a, b) => (a[0] > b[0] ? 1 : -1)));
  const newBids = sumSizes(Object.entries(orders.bids).sort((a, b) => (a[0] < b[0] ? 1 : -1)));
  const highestTotal = Math.max(
    newAsks[newAsks.length - 1].total,
    newBids[newBids.length - 1].total
  );

  return {
    asks: newAsks.reverse().slice(-MAX_ROWS),
    bids: newBids.slice(0, MAX_ROWS),
    highestTotal,
  };
};
