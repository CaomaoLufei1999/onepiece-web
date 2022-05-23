import { Row, Col, Card, List, Button, Tag } from 'antd';
import TextEditor from './components/TextEditor';
import TopicInfo from './components/TopicInfo';
import UserInfo from './components/UserInfo';
import { GridContent } from '@ant-design/pro-layout';
import React, { useState, useEffect, createElement } from 'react';
import { Link } from 'umi';

const Topic = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const loadMoreData = () => {
    if (loading) {
      return;
    }
    setLoading(true);
    fetch(`http://localhost:3000/topic_activity?id_lte=10`)
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
    loadMoreData();
  }, []);

  return (
    <GridContent>
      <Row gutter={[16, 16]}>
        <Col span={17}>
          <Card>
            <TextEditor isShow={true} isAvatar={false} isBordered={false} isChoiceActivity={true} />
          </Card>
        </Col>

        <Col>
          <UserInfo />
        </Col>

        <Col span={17}>
          <TopicInfo showComment={false} />
        </Col>

        <Col>
          <Card
            title="热门活动"
            style={{ width: 300 }}
            actions={[
              <Link to="/bbs/topic/activities">
                <Button>查看更多</Button>
              </Link>,
            ]}
          >
            <List
              itemLayout="horizontal"
              dataSource={data}
              renderItem={(item, index) => (
                <List.Item>
                  <text>{index + 1}</text>
                  <List.Item.Meta
                    title={
                      <div
                        style={{
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        <span>{item.title}</span>
                        <span>{item.browseNum}</span>
                      </div>
                    }
                  />
                  {index < 3 ? <Tag color="#FF4D4F">热</Tag> : null}
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </GridContent>
  );
};

export default Topic;
