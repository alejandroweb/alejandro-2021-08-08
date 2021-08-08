import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  border: 5px solid #293341;
`;

export const Header = styled(SafeAreaView)`
  align-items: center;
  border-bottom-color: #293341;
  border-bottom-width: 2px;
  flex-direction: row;
  justify-content: space-between;
  padding: 8px 24px 8px 16px;
`;

export const Title = styled.Text`
  color: #d4d8dc;
  font-size: 15px;
  font-weight: 500;
`;

export const SubHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 4px 40px;
`;

export const Bids = styled.View`
  margin-top: 20px;
`;

export const SubHeaderTitle = styled.Text`
  color: #585f6d;
  flex: 1;
  font-weight: 600;
  text-transform: uppercase;
  text-align: right;
`;

export const Footer = styled(SafeAreaView)`
  background-color: #293341;
  flex-direction: row;
  justify-content: center;
  padding: 20px 0;
`;

export const FooterButtonWrapper = styled.View`
  margin-right: 8px;
`;

export const ToggleButton = styled(MaterialIcons.Button).attrs({
  name: 'compare-arrows',
  backgroundColor: '#5a35d8',
})``;

export const KillerButton = styled(MaterialIcons.Button).attrs({
  name: 'error-outline',
  backgroundColor: '#B3191F',
})``;

export const Error = styled(SafeAreaView)`
  background-color: #d73e42;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  align-items: center;
  justify-content: center;
  padding: 24px 8px;
`;

export const ErrorText = styled.Text`
  color: #ffffff;
  font-weight: 600;
`;
