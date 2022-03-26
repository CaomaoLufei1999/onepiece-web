import React from 'react';
import {useRequest} from 'umi';
import {Button, Card, Divider, List, Skeleton, Tag} from 'antd';
import styles from './index.less';
import Avatar from "antd/es/avatar/avatar";
import {queryActivities} from "@/pages/Home/components/Follow/service";
import InfiniteScroll from 'react-infinite-scroll-component';
import moment from "moment";

const Follow = () => {
  const {loading: activitiesLoading, data: activities = []} = useRequest(queryActivities);

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
          avatar={<Avatar src={item.user.avatar}/>}
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
      loading={activitiesLoading}
      renderItem={(item) => renderActivities(item)}
      dataSource={activities}
      className={styles.activitiesList}
      size="large"
    />
  );
};

export default Follow;
