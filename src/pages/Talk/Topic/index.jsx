import { Row, Col, Card, List, Button, Tag } from 'antd';
import TextEditor from './components/TextEditor';
import TopicInfo from './components/TopicInfo';
import UserInfo from './components/UserInfo';
import { GridContent } from '@ant-design/pro-layout';
import React, { useState, useEffect, createElement } from 'react';

const Topic = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const loadMoreData = () => {
    if (loading) {
      return;
    }
    setLoading(true);
    fetch(`http://localhost:3000/topic_data`)
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

  // 跳转至话题专区话题分类列表页
  const ToListPage = () => {
    window.location.href = window.location.pathname + '/activities';
  };

  return (
    <GridContent>
      <Row gutter={[16, 16]}>
        <Col span={17}>
          <Card>
            <TextEditor isShow={true} isAvatar={false} />
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
            actions={[<Button onClick={ToListPage}>查看更多</Button>]}
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
                        <span>{item.num}</span>
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
