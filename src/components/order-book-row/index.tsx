import React from 'react';

import {
  Container,
  Background,
  Info,
  PriceText,
  SizeText,
  TotalText,
} from './order-book-row.styles';
import { Props } from './order-book-row.types';

const OrderBookRow: React.FC<Props> = ({ price, size, total, percentage, type = 'ask' }) => {
  return (
    <Container>
      <Background percentage={percentage} type={type} />
      <Info>
        <PriceText type={type}>{price.toFixed(2)}</PriceText>
        <SizeText>{size}</SizeText>
        <TotalText>{total}</TotalText>
      </Info>
    </Container>
  );
};

export default OrderBookRow;
