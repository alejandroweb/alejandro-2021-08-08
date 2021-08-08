export enum SocketMarkets {
  XBTUSD = 'PI_XBTUSD',
  ETHUSD = 'PI_ETHUSD',
}

export enum SocketState {
  Connecting,
  Open,
  Closed,
}

export interface OrderBookDataItem {
  price: number;
  size: number;
  total: number;
}

export interface OrderBookData {
  asks: OrderBookDataItem[];
  bids: OrderBookDataItem[];
  highestTotal: number;
}

export interface OrderBookQueue {
  asks: { [key: string]: number };
  bids: { [key: string]: number };
}
