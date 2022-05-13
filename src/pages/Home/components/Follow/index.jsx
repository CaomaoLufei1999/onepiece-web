import React, { useEffect, useState } from 'react';
import { Button, Card, Divider, List, Skeleton, Tag } from 'antd';
import styles from './index.less';
import Avatar from 'antd/es/avatar/avatar';
import InfiniteScroll from 'react-infinite-scroll-component';
import moment from 'moment';

const Follow = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const loadFollowData = () => {
    if (loading) {
      return;
    }
    fetch('http://localhost:3000/home_follow_data')
      .then((res) => res.json())
      .then((body) => {
        setData([...body]);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    loadFollowData();
  }, []);

  const renderActivities = (item) => {
    const events = item.template.split(/@\{([^{}]*)\}/gi).map((key) => {
      if (item[key]) {
        return (
          <a href={item[key].link} key={item[key].name}>
            {item[key].name}
          </a>
        );
      }

      return key;
    });
    return (
      <List.Item key={item.id}>
        <List.Item.Meta
          avatar={<Avatar src={item.user.avatar} />}
          title={
            <span>
              <a className={styles.username}>{item.user.name}</a>
              &nbsp;
              <span className={styles.event}>{events}</span>
            </span>
          }
          description={
            <span className={styles.datetime} title={item.updatedAt}>
              {moment(item.updatedAt).fromNow()}
            </span>
          }
        />
      </List.Item>
    );
  };

  return (
    <List
      // loading={activitiesLoading}
      renderItem={(item) => renderActivities(item)}
      dataSource={data}
      className={styles.activitiesList}
      size="large"
    />
  );
};

export default Follow;
