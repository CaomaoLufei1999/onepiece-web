import React from 'react';
import {StarTwoTone, LikeOutlined, MessageFilled, LoadingOutlined} from '@ant-design/icons';
import {useRequest} from 'umi';
import {Button, List, Skeleton, Tag} from 'antd';
import ArticleListContent from './ArticleListContent';
import {queryFakeList} from '../../service';
import styles from './index.less';

const pageSize = 8;

const New = () => {
  const {data, reload, loading, loadMore, loadingMore} = useRequest(
    () => {
      return queryFakeList({
        count: pageSize,
      });
    },
    {
      loadMore: true,
    },
  );
  const {data: listData} = useRequest(() => {
    return queryFakeList({
      count: 30,
    });
  });
  const list = data?.list || [];

  const loadMoreDom = list.length > 0 && (
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
            <LoadingOutlined/> 加载中...
          </span>
        ) : (
          '加载更多'
        )}
      </Button>
    </div>
  );
  const IconText = ({icon, text}) => (
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
      dataSource={list}
      renderItem={(item) => (
          <List.Item
            key={item.id}
            actions={[
              <IconText key="star" icon={<StarTwoTone/>} text={item.star}/>,
              <IconText key="like" icon={<LikeOutlined/>} text={item.like}/>,
              <IconText key="message" icon={<MessageFilled/>} text={item.message}/>,
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
            <ArticleListContent data={item}/>
          </List.Item>
      )}
    />
  );
};

export default New;
