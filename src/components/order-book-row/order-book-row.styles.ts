import styled from 'styled-components/native';

import { Props } from './order-book-row.types';

export const Container = styled.View``;

export const Background = styled.View<Pick<Props, 'percentage' | 'type'>>`
  align-self: flex-end;
  background-color: ${({ type }) => (type === 'ask' ? '#173839' : '#3C202C')};
  height: 30px;
  width: ${({ percentage }: { percentage: number }) => percentage}%;
`;

export const Info = styled.View`
  flex-direction: row;
  padding: 0 40px;
  position: absolute;
  align-items: center;
  justify-content: center;
`;

const CustomText = styled.Text`
  color: #ffffff;
  flex: 1;
  font-size: 14px;
  padding-top: 6px;
  text-align: right;
`;

export const PriceText = styled(CustomText)<Pick<Props, 'type'>>`
  color: ${({ type }) => (type === 'ask' ? '#31ae7b' : '#D73E42')};
`;

export const SizeText = styled(CustomText)``;

export const TotalText = styled(CustomText)``;
