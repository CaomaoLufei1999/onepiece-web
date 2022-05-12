import React, { useEffect, useState } from 'react';
import { StarTwoTone, LikeOutlined, MessageFilled, LoadingOutlined } from '@ant-design/icons';
import { Button, List, Skeleton, Tag } from 'antd';
import ArticleListContent from './ArticleListContent';
import styles from './index.less';

const New = () => {
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [newList, setNewList] = useState([]);
  const [data, setData] = useState([]);

  const loadRecommendList = () => {
    if (loading) {
      return;
    }
    fetch('http://localhost:3000/home_new_list')
      .then((res) => res.json())
      .then((body) => {
        setNewList([...body]);
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
    fetch('http://localhost:3000/home_new_list')
      .then((res) => res.json())
      .then((body) => {
        const newData = data.concat([...body]);
        setData(newData);
        setNewList(newData);
        setLoadingMore(false);
        window.dispatchEvent(new Event('resize'));
      });
  };

  const loadMoreDom = newList.length > 0 && (
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
      dataSource={newList}
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
  );
};

export default New;
