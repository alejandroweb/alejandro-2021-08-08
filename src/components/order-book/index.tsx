import React, { useState } from 'react';
import { View } from 'react-native';

import useOrderBook, { ORDER_GROUPS_BY_MARKET } from '../../hooks/use-order-book';
import { SocketState, SocketMarkets } from '../../hooks/use-order-book/use-order-book.types';
import DropdownSelector from '../dropdown-selector';
import OrderBookRow from '../order-book-row';
import {
  Bids,
  Container,
  Footer,
  FooterButtonWrapper,
  Header,
  KillerButton,
  SubHeader,
  SubHeaderTitle,
  Title,
  ToggleButton,
} from './order-book.styles';

// This should be an env var and live outside the code
const ENV_SOCKET_URL = 'wss://www.cryptofacilities.com/ws/v1';

const OrderBook: React.FC<object> = () => {
  const [marketGroup, setMarketGroup] = useState(ORDER_GROUPS_BY_MARKET[SocketMarkets.XBTUSD]);
  const { orders, readyState, connect, disconnect, toggleMarket, setGroupBy } =
    useOrderBook(ENV_SOCKET_URL);

  const handleOnPressKill = () => {
    if (readyState === SocketState.Closed) {
      connect();
    } else if (readyState === SocketState.Open) {
      disconnect();
    }
  };

  const handleOnToggleMarket = () => {
    if (readyState === SocketState.Open) {
      const newMarket = toggleMarket();

      setMarketGroup(ORDER_GROUPS_BY_MARKET[newMarket]);
    }
  };

  return (
    <Container>
      <Header>
        <Title>Order Book</Title>
        <DropdownSelector onSelectGroupBy={setGroupBy} data={marketGroup} />
      </Header>
      <SubHeader>
        <SubHeaderTitle>Price</SubHeaderTitle>
        <SubHeaderTitle>Size</SubHeaderTitle>
        <SubHeaderTitle>Total</SubHeaderTitle>
      </SubHeader>
      <View>
        {orders.asks.map((ask, index) => (
          <OrderBookRow
            key={`ask-${index}`}
            price={ask.price}
            size={ask.size}
            total={ask.total}
            percentage={(ask.total * 100) / orders.highestTotal}
          />
        ))}
      </View>
      <Bids>
        {orders.bids.map((bid, index) => (
          <OrderBookRow
            key={`bid-${index}`}
            price={bid.price}
            size={bid.size}
            total={bid.total}
            percentage={(bid.total * 100) / orders.highestTotal}
            type="bid"
          />
        ))}
      </Bids>
      <Footer>
        <FooterButtonWrapper>
          <ToggleButton onPress={handleOnToggleMarket}>Toggle Feed</ToggleButton>
        </FooterButtonWrapper>
        <KillerButton onPress={handleOnPressKill}>Kill Feed</KillerButton>
      </Footer>
    </Container>
  );
};

export default OrderBook;
