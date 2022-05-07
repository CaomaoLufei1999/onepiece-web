import { Row, Col, Card, List, Button, Tag } from 'antd';
import TextEditor from './components/TextEditor';
import TopicInfo from './components/TopicInfo';
import UserInfo from './components/UserInfo';

const Topic = () => {
  const data = [
    { id: 1, title: '你好世界', num: 666 },
    {
      id: 2,
      title: '你好世界你好世界你好世界你好世界你好世界你好世界你好世界你好世界你好世界你好世界',
      num: 666,
    },
    { id: 3, title: '你好世界', num: 666 },
    { id: 4, title: '你好世界', num: 666 },
    { id: 5, title: '你好世界', num: 666 },
    { id: 6, title: '你好世界你好世界你好世界你好世界你好世界你好世界你好世界你好世界', num: 666 },
    { id: 7, title: '你好世界', num: 666 },
    { id: 8, title: '你好世界', num: 666 },
    { id: 9, title: '你好世界', num: 666 },
    { id: 10, title: '你好世界', num: 666 },
  ];

  // 跳转至话题专区话题分类列表页
  const ToListPage = (props) => {
    window.location.href = window.location.pathname + '/activities';
  };

  return (
    <Row gutter={[16, 16]}>
      <Col span={17}>
        <TextEditor />
      </Col>
      <Col>
        <UserInfo />
      </Col>

      <Col span={17}>
        <TopicInfo />
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
                      style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                    >
                      <span>{item.title}</span>
                      <span>666</span>
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
  );
};

export default Topic;
