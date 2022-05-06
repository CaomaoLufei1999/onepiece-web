import { PlusOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import {
  Button,
  message,
  Input,
  Drawer,
  List,
  Avatar,
  Skeleton,
  Divider,
  Row,
  Col,
  Tooltip,
} from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import styles from '../index.less';

import InfiniteScroll from 'react-infinite-scroll-component';
// import List from 'rc-virtual-list';
/**
 * @en-US Add node
 * @zh-CN 添加节点
 * @param fields
 */

const DividerComponent = () => {
  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */

  return (
    <Divider orientation="right">
      <Tooltip placement="bottom" title="这里是我们热榜的规则说明塞">
        <QuestionCircleOutlined />
        &nbsp;
      </Tooltip>
      <text style={{ fontSize: '14px' }}>规则说明</text>
    </Divider>
  );
};

export default DividerComponent;
