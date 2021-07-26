import React from 'react';
import { Provider } from 'react-redux';

import { store } from './store/store';
import { AppRouters } from './routers/AppRouters';

export const Negocio = () => {
  return (
    <div>
      <Provider store={ store }>
        <AppRouters />
      </Provider>
    </div>
  )
}
