import { List, Skeleton, Divider, Tabs, Tag } from 'antd';
import ArticleListContent from '@/pages/Search/Articles/components/ArticleListContent';
import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import React, { useState, useEffect } from 'react';
import styles from '../index.less';
import InfiniteScroll from 'react-infinite-scroll-component';
// import List from 'rc-virtual-list';
/**
 * @en-US Add node
 * @zh-CN 添加节点
 * @param fields
 */

const ProceduralLife = () => {
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
    fetch(`http://localhost:3000/Community_list?type=procedural-life&_page=${count}&_limit=10&`)
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
  const IconText = ({ type, text }) => {
    switch (type) {
      case 'star-o':
        return (
          <span>
            <StarOutlined
              style={{
                marginRight: 8,
              }}
            />
            {text}
          </span>
        );

      case 'like-o':
        return (
          <span>
            <LikeOutlined
              style={{
                marginRight: 8,
              }}
            />
            {text}
          </span>
        );

      case 'message':
        return (
          <span>
            <MessageOutlined
              style={{
                marginRight: 8,
              }}
            />
            {text}
          </span>
        );

      default:
        return null;
    }
  };

  useEffect(() => {
    loadMoreData();
  }, []);
  return (
    <InfiniteScroll
      dataLength={data.length}
      next={loadMoreData}
      hasMore={data.length < 1000}
      loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
      endMessage={<Divider plain>没有更多了！！！</Divider>}
      scrollableTarget="scrollableDiv"
    >
      <List
        size="large"
        // loading={loading}
        rowKey="id"
        itemLayout="vertical"
        // loadMore={loadMoreDom}
        dataSource={data}
        renderItem={(item) => (
          <List.Item
            key={item.id}
            actions={[
              <IconText key="star" type="star-o" text={item.star} />,
              <IconText key="like" type="like-o" text={item.like} />,
              <IconText key="message" type="message" text={item.message} />,
            ]}
            extra={<div className={styles.listItemExtra} />}
          >
            <List.Item.Meta
              title={
                <a className={styles.listItemMetaTitle} href={item.href}>
                  {item.title}
                </a>
              }
              description={
                <span>
                  <Tag>Ant Design</Tag>
                  <Tag>设计语言</Tag>
                  <Tag>蚂蚁金服</Tag>
                </span>
              }
            />
            <ArticleListContent data={item} />
          </List.Item>
        )}
      />
    </InfiniteScroll>
  );
};

export default ProceduralLife;
