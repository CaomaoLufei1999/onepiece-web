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
import DividerComponent from './Divider';
import InfiniteScroll from 'react-infinite-scroll-component';
// import List from 'rc-virtual-list';
/**
 * @en-US Add node
 * @zh-CN 添加节点
 * @param fields
 */

const DomainContentList = () => {
  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  let rankName = ['积分总榜', '作者周榜', '博客热榜', '领域内容榜单', '解题作者榜单'];

  const loadMoreData = () => {
    if (loading) {
      return;
    }
    setLoading(true);
    fetch('http://localhost:3000/results')
      .then((res) => res.json())
      .then((body) => {
        setData([...data, ...body]);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    loadMoreData();
  }, []);

  return (
    <Col className="gutter-row" span={18} style={{ marginTop: '-20px' }}>
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
                avatar={
                  <Avatar src={item.picture.large} style={{ height: '60px', width: '60px' }} />
                }
                title={
                  <a href="https://ant.design" style={{ fontSize: '18px' }}>
                    {item.name.first}
                  </a>
                }
                description={
                  <text>
                    粉丝数 130000 &nbsp;&nbsp;&nbsp;获赞 343434&nbsp;&nbsp;&nbsp; 博客积分 1332323
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
                关注Domain
              </Button>
            </List.Item>
          )}
        />
      </InfiniteScroll>
    </Col>
  );
};

export default DomainContentList;
