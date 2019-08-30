import React from 'react';
import { Provider } from 'mobx-react';

export default ({ children, }) => (
  <Provider>
    {children}
  </Provider>
);