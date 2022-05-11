import React, { useState, createElement } from 'react';
import moment from 'moment';
import { List, Avatar, Button, Card, Comment, Tooltip, Skeleton, Divider, Row } from 'antd';
import {
  LikeOutlined,
  MessageOutlined,
  LikeFilled,
  DislikeFilled,
  DislikeOutlined,
  MessageFilled,
  ShareAltOutlined,
  RightOutlined,
} from '@ant-design/icons';
import InfiniteScroll from 'react-infinite-scroll-component';
import TextEditor from '../TextEditor';
import { GridContent } from '@ant-design/pro-layout';

const TopicInfo = (props) => {
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [isComment, setIsComment] = useState(false);
  const [isReply, setIsReply] = useState(false);
  const [action, setAction] = useState(null);

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

  // 踩
  const dislike = () => {
    let num = dislikes;
    if (action === 'disliked') {
      setDislikes(--num);
      setAction(null);
    } else {
      setDislikes(++num);
      setAction('disliked');
    }
  };

  // 回复
  const reply = () => {
    setIsReply(!isReply);
  };

  // 查看评论
  const checkComment = (obj) => {
    // setIsComment(!isComment);
    console.log(this);
    // console.log(obj.parentNode.parentNode.id);
    // if (e.hasClass('showComment')) {
    //   e.removeClass('showComment');
    // } else {
    //   e.addClass('showComment');
    // }
  };

  // 分享
  const share = () => {
    alert('分享');
  };

  // 跳转至详情页
  const toDetailPage = () => {
    window.location.href = window.location.pathname + '/detail';
  };

  // List 组件所需的资源
  const actionsOne = [
    <Tooltip key="comment-basic-like" title="点赞">
      <span onClick={like}>
        {createElement(action === 'liked' ? LikeFilled : LikeOutlined)}
        <span>{likes}</span>
      </span>
    </Tooltip>,
    <Tooltip key="comment-basic-comment" title="查看评论">
      <span onClick={(e) => checkComment(e)} style={{ cursor: 'pointer' }}>
        {createElement(isComment === true ? MessageFilled : MessageOutlined)}
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
  const actionsTwo = [
    <Tooltip key="comment-basic-like" title="点赞">
      <span onClick={like}>
        {React.createElement(action === 'liked' ? LikeFilled : LikeOutlined)}
        <span>{likes}</span>
      </span>
    </Tooltip>,
    <Tooltip key="comment-basic-dislike" title="踩">
      <span onClick={dislike}>
        {React.createElement(action === 'disliked' ? DislikeFilled : DislikeOutlined)}
        <span>{dislikes}</span>
      </span>
    </Tooltip>,
    <Tooltip key="comment-basic-dislike" title="回复">
      <span onClick={reply}>
        {React.createElement(MessageOutlined)}
        <span>回复</span>
      </span>
    </Tooltip>,
  ];

  const listData = [];
  for (let i = 0; i < 5; i++) {
    listData.push({
      id: i,
      href: 'https://ant.design',
      title: `ant design part ${i}`,
      avatar: 'https://joeschmoe.io/api/v1/random',
      description:
        'Ant Design, a design language for background applications, is refined by Ant UED Team.',
      content:
        'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
      comment: false,
    });
  }

  return (
    <GridContent>
      <InfiniteScroll
        dataLength={listData.length}
        hasMore={listData.length < 10}
        loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
        endMessage={<Divider plain>没有更多了~~ 🤐</Divider>}
        scrollableTarget="scrollableDiv"
      >
        <Row justify={[10, 10]}>
          <List
            itemLayout="vertical"
            size="large"
            dataSource={listData}
            renderItem={(item) => (
              <Card className={item.id}>
                <List.Item
                  key={item.id}
                  className="comment"
                  actions={actionsOne}
                  extra={<Button type="primary">关注</Button>}
                >
                  <Comment
                    author={
                      <a>
                        <strong>{item.title}</strong>
                      </a>
                    }
                    avatar={<Avatar src={item.avatar} alt="Han Solo" />}
                    content={<p>{item.content}</p>}
                    datetime={
                      <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                        <span>{moment().fromNow()}</span>
                      </Tooltip>
                    }
                  />
                </List.Item>

                {/*自己评论*/}
                {<TextEditor isAvatar={true} isShow={!!document.querySelector('showComment')} />}

                {document.querySelector('showComment') === null ? null : props.showComment ===
                  false ? (
                  <Row>
                    <Button onClick={toDetailPage}>
                      查看更多
                      <RightOutlined />
                    </Button>
                  </Row>
                ) : (
                  // 展示他人评论
                  <List
                    className="comment-list"
                    header={`您有 ${data.length} 条评论`}
                    itemLayout="horizontal"
                    dataSource={listData}
                    renderItem={(item) => (
                      <Comment
                        actions={actionsTwo}
                        title={<a href="https://ant.design">你好</a>}
                        author={<strong>姓名</strong>}
                        avatar={<Avatar />}
                        content={
                          <span>
                            Ant Design, a design language for background applications, is refined by
                            Ant UED Team
                          </span>
                        }
                        datetime={<span>2022-05-04</span>}
                      >
                        {isReply === true ? <TextEditor isAvatar={true} /> : null}
                      </Comment>
                    )}
                  />
                )}
              </Card>
            )}
          />
        </Row>
      </InfiniteScroll>
    </GridContent>
  );
};

export default TopicInfo;
