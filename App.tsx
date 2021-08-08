import { StatusBar } from 'expo-status-bar';
import React from 'react';

import { Container } from './App.styles';
import OrderBook from './src/components/order-book';

export default function App() {
  return (
    <Container>
      <OrderBook />
      <StatusBar style="light" />
    </Container>
  );
}
