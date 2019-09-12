import React from 'react';
import { Provider } from 'mobx-react';

export default ({ children, }) => (
  <Provider
    userState="1111"
  >
    {children}
  </Provider>
);