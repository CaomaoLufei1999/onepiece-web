import React, { useEffect, useState } from 'react';
import {
  StarTwoTone,
  LikeOutlined,
  MessageFilled,
  LoadingOutlined,
  FireTwoTone,
  FireFilled,
} from '@ant-design/icons';
import { Button, List, Skeleton, Tag } from 'antd';
import ArticleListContent from './ArticleListContent';
import styles from './index.less';

const Hot = () => {
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hotList, setHotList] = useState([]);
  const [data, setData] = useState([]);

  const loadRecommendList = () => {
    if (loading) {
      return;
    }
    fetch('http://localhost:3000/home_hot_list')
      .then((res) => res.json())
      .then((body) => {
        setHotList([...body]);
        setData([...body]);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    loadRecommendList();
  }, []);

  const loadMore = () => {
    setLoadingMore(true);
    fetch('http://localhost:3000/home_hot_list')
      .then((res) => res.json())
      .then((body) => {
        const newData = data.concat([...body]);
        setData(newData);
        setHotList(newData);
        setLoadingMore(false);
        window.dispatchEvent(new Event('resize'));
      });
  };

  const loadMoreDom = hotList.length > 0 && (
    <div
      style={{
        textAlign: 'center',
        marginTop: 16,
      }}
    >
      <Button
        onClick={loadMore}
        style={{
          paddingLeft: 48,
          paddingRight: 48,
        }}
      >
        {loadingMore ? (
          <span>
            <LoadingOutlined /> 加载中...
          </span>
        ) : (
          '加载更多'
        )}
      </Button>
    </div>
  );
  const IconText = ({ icon, text }) => (
    <span>
      {icon} {text}
    </span>
  ); // 获取tab列表数据

  return (
    <List
      size="large"
      className={styles.articleList}
      loadMore={loadMoreDom}
      loading={loading}
      rowKey="id"
      itemLayout="vertical"
      dataSource={hotList}
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
            title={
              <div>
                <span
                  style={{
                    marginRight: 5,
                    color: 'gray',
                    fontSize: 'small',
                  }}
                >
                  <b>
                    No.<span>{item.rank}</span>
                  </b>
                </span>
                <a className={styles.listItemMetaTitle} href={item.href}>
                  {item.title}
                </a>
                <FireFilled
                  style={{
                    float: 'right',
                    color: 'red',
                    fontSize: 'large',
                  }}
                />
              </div>
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
  );
};

export default Hot;
