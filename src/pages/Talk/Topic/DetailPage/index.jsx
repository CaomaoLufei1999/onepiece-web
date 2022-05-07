import React, { useState, createElement } from 'react';
import moment from 'moment';
import { List, Avatar, Button, Card, Row, Col, Comment, Tooltip, BackTop } from 'antd';
import {
  ToTopOutlined,
  LikeOutlined,
  MessageOutlined,
  MessageFilled,
  LikeFilled,
  ShareAltOutlined,
} from '@ant-design/icons';
import UserInfo from '../components/UserInfo';
import TopicInfo from '../components/TopicInfo';
import TextEditor from '../components/TextEditor';

const DetailPage = () => {
  const [likes, setLikes] = useState(0);
  const [showComment, setShowComment] = useState(false);
  const [action, setAction] = useState(null);

  // 回到顶部
  const style = {
    height: 40,
    width: 40,
    lineHeight: '40px',
    borderRadius: 4,
    backgroundColor: '#1088e9',
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 14,
  };

  // 赞
  const like = () => {
    let num = likes;
    if (action === 'liked') {
      setLikes(--num);
      setAction(null);
    } else {
      setLikes(++num);
      setAction('liked');
    }
  };

  // 查看评论
  const checkComment = () => {
    setShowComment(!showComment);
  };

  // 分享
  const share = () => {
    alert('分享');
  };

  const actions = [
    <Tooltip key="comment-basic-like" title="点赞">
      <span onClick={like} style={{ cursor: 'pointer' }}>
        {createElement(action === 'liked' ? LikeFilled : LikeOutlined)}
        {likes}
      </span>
    </Tooltip>,
    <Tooltip key="comment-basic-comment" title="查看评论">
      <span onClick={checkComment} style={{ cursor: 'pointer' }}>
        {createElement(showComment === true ? MessageFilled : MessageOutlined)}
        评论数
      </span>
    </Tooltip>,
    <Tooltip key="comment-basic-share" title="分享">
      <span onClick={share} style={{ cursor: 'pointer' }}>
        {createElement(ShareAltOutlined)}
        分享
      </span>
    </Tooltip>,
  ];

  return (
    <div>
      <Row>
        <Col span={17}>
          <Card>
            <List itemLayout="vertical" size="large">
              <List.Item key="hello" extra={<Button type="primary">关注</Button>} actions={actions}>
                <Comment
                  author={
                    <a>
                      <strong>Han Solo</strong>
                    </a>
                  }
                  avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />}
                  content={
                    <p>
                      We supply a series of design principles, practical patterns and high quality
                      design resources (Sketch and Axure), to help people create their product
                      prototypes beautifully and efficiently.
                    </p>
                  }
                  datetime={
                    <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                      <span>{moment().fromNow()}</span>
                    </Tooltip>
                  }
                />
              </List.Item>
            </List>

            {showComment === false ? null : (
              <div>
                <TextEditor />
                <TopicInfo />
              </div>
            )}
          </Card>
        </Col>

        <Col span={1} offset={1}>
          <UserInfo />
        </Col>
      </Row>

      <BackTop>
        <div style={style}>
          <ToTopOutlined />
        </div>
      </BackTop>
    </div>
  );
};

export default DetailPage;
