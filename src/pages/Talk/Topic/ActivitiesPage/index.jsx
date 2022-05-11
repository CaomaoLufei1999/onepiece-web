import React, { useState, useEffect } from 'react';
import { List, Skeleton, Card, Divider, Row, Col } from 'antd';
import { FireFilled } from '@ant-design/icons';
import InfiniteScroll from 'react-infinite-scroll-component';

const ActivitiesPage = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  let count = 0;
  const loadMoreData = () => {
    if (loading) {
      return;
    }
    setLoading(true);
    fetch(
      `http://localhost:3000/topic_activity?id_gte=${count * 10}&id_lte=${(count + 1) * 10 - 1}`,
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

  return (
    <Card
      title="热门活动"
      style={{
        width: 700,
        margin: '0 auto',
      }}
    >
      <InfiniteScroll
        dataLength={data.length}
        next={loadMoreData}
        hasMore={data.length < 50}
        loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
        endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
        scrollableTarget="scrollableDiv"
      >
        <List
          dataSource={data}
          renderItem={(item, index) => (
            <List.Item key={item.id}>
              <List.Item.Meta
                title={<a href="https://ant.design">{item.name.last}</a>}
                description={
                  index < 3 ? (
                    <div>
                      <span>{item.email}</span>
                      <Row justify="space-between">
                        <Col>
                          <span>2022.5.6~2022.5.9</span>
                        </Col>
                        <Col>
                          <span style={{ color: '#fc5531' }}>
                            <FireFilled />
                            662
                          </span>
                        </Col>
                      </Row>
                      <img
                        width="100%"
                        alt="logo"
                        src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                      />
                    </div>
                  ) : (
                    <div>
                      <Row>{item.email}</Row>
                      <Row>
                        <Col>
                          <span>2022.5.6~2022.5.9</span>
                        </Col>
                        <Col offset={1}>
                          <span style={{ color: '#fc5531' }}>
                            <FireFilled />
                            662
                          </span>
                        </Col>
                      </Row>
                    </div>
                  )
                }
              />
              {index > 2 ? (
                <img
                  width={100}
                  alt="logo"
                  src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                />
              ) : null}
            </List.Item>
          )}
        />
      </InfiniteScroll>
    </Card>
  );
};
export default ActivitiesPage;
