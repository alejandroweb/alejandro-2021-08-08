import { useEffect, useRef, useState } from 'react';

import { groupOrders, mergeOrderData } from './order-parser';
import { OrderBookData, OrderBookQueue, SocketMarkets, SocketState } from './use-order-book.types';

export const ORDER_GROUPS_BY_MARKET = {
  [SocketMarkets.XBTUSD]: [0.5, 1, 2.5],
  [SocketMarkets.ETHUSD]: [0.05, 0.1, 0.25],
};

const useOrderBook = (url: string) => {
  const lastUpdate = useRef(Date.now() - 1000);
  const orderQueue = useRef<OrderBookQueue>({ asks: {}, bids: {} });
  const socket = useRef<WebSocket | null>(null);
  const market = useRef(SocketMarkets.XBTUSD);
  const groupBy = useRef(0.5);

  const [readyState, setReadyState] = useState(SocketState.Connecting);
  const [orders, setOrders] = useState<OrderBookData>({ asks: [], bids: [], highestTotal: 0 });

  useEffect(() => {
    connect();

    return () => socket.current!.close();
  }, []);

  const connect = () => {
    setReadyState(SocketState.Connecting);

    socket.current = new WebSocket(url);
    socket.current.onopen = onOpen;
    socket.current.onmessage = onMessage;
    socket.current.onerror = () => socket.current!.close();
    socket.current.onclose = () => setReadyState(SocketState.Closed);
  };

  const onOpen = () => {
    setReadyState(SocketState.Open);
    subscribe(market.current);
  };

  const onMessage = (message: MessageEvent) => {
    try {
      const msg = JSON.parse(message.data);
      const keys = Object.keys(msg);

      if (
        (keys.includes('feed') && msg.feed.includes('snapshot')) ||
        (keys.includes('asks') && keys.includes('bids') && msg.product_id === market.current)
      ) {
        const orders = mergeOrderData(orderQueue.current, msg.asks, msg.bids);

        orderQueue.current = orders;

        if (Date.now() - lastUpdate.current >= 1000) {
          setOrders(groupOrders(orderQueue.current, groupBy.current));
          lastUpdate.current = Date.now();
        }
      }
    } catch (_error) {
      // Message is ignored
    }
  };

  const disconnect = () => {
    socket.current!.close();
    socket.current = null;
    setReadyState(SocketState.Closed);
  };

  const subscribe = (market: SocketMarkets) => {
    resetData();
    sendMessage({
      event: 'subscribe',
      feed: 'book_ui_1',
      product_ids: [market],
    });
  };

  const unsubscribe = (market: SocketMarkets) =>
    sendMessage({
      event: 'unsubscribe',
      feed: 'book_ui_1',
      product_ids: [market],
    });

  const sendMessage = (message: object) => socket.current!.send(JSON.stringify(message));

  const toggleMarket = () => {
    unsubscribe(market.current);

    market.current =
      market.current === SocketMarkets.XBTUSD ? SocketMarkets.ETHUSD : SocketMarkets.XBTUSD;

    groupBy.current =
      market.current === SocketMarkets.XBTUSD
        ? ORDER_GROUPS_BY_MARKET[SocketMarkets.ETHUSD][0]
        : ORDER_GROUPS_BY_MARKET[SocketMarkets.XBTUSD][0];

    resetData();
    subscribe(market.current);

    return market.current;
  };

  const resetData = () => {
    lastUpdate.current = Date.now() - 1000;
    orderQueue.current = { asks: {}, bids: {} };
    groupBy.current = ORDER_GROUPS_BY_MARKET[market.current][0];
  };

  const setGroupBy = (group: number) => {
    groupBy.current = group;
  };

  return { readyState, orders, connect, disconnect, toggleMarket, setGroupBy };
};

export default useOrderBook;
