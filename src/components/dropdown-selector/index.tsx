import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import SelectDropdown from 'react-native-select-dropdown';

import { Props } from './dropdown-selector.types';

const DropdownSelector: React.FC<Props> = ({ data, onSelectGroupBy }) => {
  return (
    <SelectDropdown
      data={data}
      defaultValue={data[0]}
      onSelect={onSelectGroupBy}
      buttonStyle={{
        backgroundColor: '#374151',
        borderRadius: 4,
        height: 24,
        width: 140,
      }}
      buttonTextStyle={{
        color: '#d4d8dc',
        fontSize: 14,
        fontWeight: '500',
      }}
      buttonTextAfterSelection={(selectedItem: number) => `Group ${selectedItem.toFixed(2)}`}
      renderDropdownIcon={() => <MaterialIcons name="expand-more" size={24} color="#d4d8dc" />}
      dropdownStyle={{
        backgroundColor: '#374151',
      }}
      rowStyle={{
        borderBottomColor: '#121927',
        height: 32,
      }}
      rowTextStyle={{
        color: '#d4d8dc',
        fontSize: 14,
        fontWeight: '500',
      }}
      rowTextForSelection={(item: number) => item.toFixed(2)}
    />
  );
};

export default DropdownSelector;
