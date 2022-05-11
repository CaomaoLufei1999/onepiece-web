import React, { useState, useEffect, createElement } from 'react';
import moment from 'moment';
import { List, Avatar, Button, Card, Comment, Tooltip, Skeleton, Divider } from 'antd';
import {
  LikeOutlined,
  MessageOutlined,
  LikeFilled,
  DislikeFilled,
  DislikeOutlined,
} from '@ant-design/icons';
import InfiniteScroll from 'react-infinite-scroll-component';
import TextEditor from '../TextEditor';

const TopicInfo = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [showComment, setShowComment] = useState(false);
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [action, setAction] = useState(null);
  let count = 0;
  const loadMoreData = () => {
    if (loading) {
      return;
    }
    setLoading(true);
    fetch(`http://localhost:3000/topic_info?id_gte=${count * 20}&id_lte=${(count + 1) * 20 - 1}`)
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

  // 评论
  const reply = () => {
    setShowComment(!showComment);
  };

  const actions = [
    <Tooltip key="comment-basic-like" title="点赞">
      <span onClick={like}>
        {createElement(action === 'liked' ? LikeFilled : LikeOutlined)}
        <span>{likes}</span>
      </span>
    </Tooltip>,
    <Tooltip key="comment-basic-dislike" title="踩">
      <span onClick={dislike}>
        {React.createElement(action === 'disliked' ? DislikeFilled : DislikeOutlined)}
        <span>{dislikes}</span>
      </span>
    </Tooltip>,
    <Tooltip key="comment-basic-dislike" title="评论">
      <span onClick={reply}>
        {React.createElement(MessageOutlined)}
        <span>回复</span>
      </span>
    </Tooltip>,
  ];

  const listData = [];
  for (let i = 0; i < 5; i++) {
    listData.push({
      href: 'https://ant.design',
      title: `ant design part ${i}`,
      avatar: 'https://joeschmoe.io/api/v1/random',
      description:
        'Ant Design, a design language for background applications, is refined by Ant UED Team.',
      content:
        'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
    });
  }

  return (
    <Card>
      <InfiniteScroll
        dataLength={data.length}
        next={loadMoreData}
        hasMore={data.length < 10}
        loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
        endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
        scrollableTarget="scrollableDiv"
      >
        <List
          itemLayout="vertical"
          size="large"
          dataSource={data}
          renderItem={(item) => (
            <List.Item key={item.id} actions={actions} extra={<Button type="primary">关注</Button>}>
              <Comment
                author={
                  <a>
                    <strong>hello world</strong>
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
              {showComment === false ? null : (
                <div>
                  {/* 自己评论 */}
                  <TextEditor />

                  {/* 他人评论 */}
                  <List
                    className="comment-list"
                    header={`您有 ${data.length} 条评论`}
                    itemLayout="horizontal"
                    dataSource={listData}
                    renderItem={(item) => (
                      <Comment
                        actions={actions}
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
                      />
                    )}
                  />
                </div>
              )}
            </List.Item>
          )}
        />
      </InfiniteScroll>
    </Card>
  );
};

export default TopicInfo;
