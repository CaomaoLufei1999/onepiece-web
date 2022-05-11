import { PlusOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { useHover } from 'ahooks';
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
import DividerComponent from './Divider';

import InfiniteScroll from 'react-infinite-scroll-component';
// import List from 'rc-virtual-list';
/**
 * @en-US Add node
 * @zh-CN 添加节点
 * @param fields
 */

const SolveList = () => {
  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  let count = 0;
  const loadMoreData = () => {
    if (loading) {
      return;
    }
    setLoading(true);
    fetch(`http://localhost:3000/rank_data_solve?id_gte=${count * 10}&id_lte=${(count + 1) * 10}`)
      .then((res) => res.json())
      .then((body) => {
        setData([...data, ...body]);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
    count++;
  };

  useEffect(() => {
    loadMoreData();
  }, []);

  return (
    <Col className="gutter-row" span={17} style={{ marginTop: '-20px' }}>
      <DividerComponent />
      <InfiniteScroll
        dataLength={data.length}
        next={loadMoreData}
        hasMore={data.length < 100}
        loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
        endMessage={<Divider plain>榜单只展示前一百名哦！！！🤐</Divider>}
        scrollableTarget="scrollableDiv"
      >
        <List
          itemLayout="horizontal"
          dataSource={data}
          renderItem={(item, index) => (
            <List.Item className={styles.rankItem}>
              <text
                className={
                  index == 0
                    ? styles.rankFirst
                    : index == 1
                    ? styles.rankSecond
                    : index == 2
                    ? styles.rankThird
                    : styles.rankCommon
                }
              >
                {index + 1}
              </text>
              <List.Item.Meta
                avatar={<Avatar src={item.picture} style={{ height: '60px', width: '60px' }} />}
                title={
                  <a href="https://ant.design" style={{ fontSize: '18px' }}>
                    {item.name}
                  </a>
                }
                description={
                  <text>
                    粉丝数 {item.concern} &nbsp;&nbsp;&nbsp;解题数 {item.solveNumber}
                  </text>
                }
              />
              <Button
                type="link"
                shape="round"
                size="middle"
                style={{
                  marginRight: '30px',
                  borderWidth: '1px',
                  // height: '30px',
                  borderColor: '#555666',
                  color: '#555666',
                }}
              >
                关注Solve
              </Button>
            </List.Item>
          )}
        />
      </InfiniteScroll>
    </Col>
  );
};

export default SolveList;