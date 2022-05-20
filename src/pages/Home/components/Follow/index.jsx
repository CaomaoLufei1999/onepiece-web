import React, { useEffect, useState } from 'react';
import { StarTwoTone, LikeOutlined, MessageFilled, LoadingOutlined } from '@ant-design/icons';
import { Skeleton, Divider, Button, List, Tag } from 'antd';
import { Link } from 'umi';
import ArticleListContent from './ArticleListContent';
import styles from './index.less';
import InfiniteScroll from 'react-infinite-scroll-component';

const New = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  let count = 0;
  const loadMoreData = () => {
    if (loading) {
      return;
    }
    setLoading(true);
    fetch(
      `http://localhost:3000/home_follow_data?id_gte=${count * 8}&id_lte=${(count + 1) * 8 - 1}`,
    )
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

  const IconText = ({ icon, text }) => (
    <span>
      {icon} {text}
    </span>
  ); // 获取tab列表数据

  return (
    <InfiniteScroll
      dataLength={data.length}
      next={loadMoreData}
      hasMore={data.length < 100}
      loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
      endMessage={<Divider plain>暂时只有这么多哦！！！</Divider>}
      scrollableTarget="scrollableDiv"
    >
      <List
        size="large"
        className={styles.articleList}
        // loadMore={loadMoreDom}
        // loading={loading}
        rowKey="id"
        itemLayout="vertical"
        dataSource={data}
        renderItem={(item) => (
          <List.Item
            key={item.id}
            actions={[
              <IconText key="star" icon={<StarTwoTone />} text={item.star} />,
              <IconText key="like" icon={<LikeOutlined />} text={item.like} />,
              <IconText key="message" icon={<MessageFilled />} text={item.message} />,
            ]}
          >
            <List.Item.Meta
              title={<Link to={`/article/detail/${item.id}`}>{item.title}</Link>}
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

export default New;
