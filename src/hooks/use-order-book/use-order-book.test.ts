import { act, renderHook } from '@testing-library/react-hooks';
import WS from 'jest-websocket-mock';

import useOrderBook from './index';
import { SocketState } from './use-order-book.types';

const HOOK_URL = 'ws://localhost:1234';

describe('useOrderBook', () => {
  it('the server can subscribe after init', async () => {
    const server = new WS(HOOK_URL);
    const { result, waitForValueToChange } = renderHook(() => useOrderBook(HOOK_URL));

    await waitForValueToChange(() => result.current.readyState);
    await server.connected;

    expect(result.current.readyState).toBe(SocketState.Open);

    await expect(server).toReceiveMessage(
      JSON.stringify({
        event: 'subscribe',
        feed: 'book_ui_1',
        product_ids: ['PI_XBTUSD'],
      })
    );

    act(() => {
      result.current.disconnect();
    });

    expect(result.current.readyState).toBe(SocketState.Closed);

    server.close();
    WS.clean();
  });
});
