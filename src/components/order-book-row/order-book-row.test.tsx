import React from 'react';
import renderer from 'react-test-renderer';

import OrderBookRow from './index';

describe('<OrderBookRow />', () => {
  it('has 2 children', () => {
    const props = { price: 0, percentage: 20, size: 2, total: 10 }
    const tree = renderer.create(<OrderBookRow {...props} />).toJSON();

    // @ts-ignore
    expect(tree.children.length).toBe(2);
  });
});
