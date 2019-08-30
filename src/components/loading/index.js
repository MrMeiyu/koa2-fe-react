import React, { memo, } from 'react';
import { Spin, } from 'antd';

function Loading() {
  return <Spin />;
};

export default memo(Loading);