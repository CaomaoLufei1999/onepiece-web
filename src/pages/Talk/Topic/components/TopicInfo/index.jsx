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
  const [commentData, setCommentData] = useState([]);
  const [showComment, setShowComment] = useState(false);
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [action, setAction] = useState(null);
  // let count = 0;
  const loadMoreData = () => {
    if (loading) {
      return;
    }
    setLoading(true);
    // fetch(`http://localhost:3000/topic_info?id_gte=${count * 20}&id_lte=${(count + 1) * 20 - 1}`)
    fetch(`http://localhost:3000/topic_info`)
      .then((res) => res.json())
      .then((body) => {
        setData([...data, ...body]);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
    // count++;
    // fetch(`http://localhost:3000/topic_info_comment?id_gte=${count * 20}&id_lte=${(count + 1) * 20 - 1}`)
    fetch(`http://localhost:3000/topic_info_comment`)
      .then((res) => res.json())
      .then((body) => {
        setCommentData([...data, ...body]);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
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

  return (
    <Card>
      <InfiniteScroll
        dataLength={data.length}
        next={loadMoreData}
        hasMore={data.length < 10}
        loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
        endMessage={<Divider plain>没有更多了~~ 🤐</Divider>}
        scrollableTarget="scrollableDiv"
      >
        <List
          itemLayout="vertical"
          size="large"
          dataSource={data}
          renderItem={(item) => (
            <List.Item
              key={item.id}
              actions={[
                <Tooltip key="comment-basic-like" title="点赞">
                  <span onClick={like}>
                    {React.createElement(action === 'liked' ? LikeFilled : LikeOutlined)}
                    <span>{item.like}</span>
                  </span>
                </Tooltip>,
                <Tooltip key="comment-basic-dislike" title="踩">
                  <span onClick={dislike}>
                    {React.createElement(action === 'disliked' ? DislikeFilled : DislikeOutlined)}
                    <span>{item.disLike}</span>
                  </span>
                </Tooltip>,
                <Tooltip key="comment-basic-dislike" title="评论">
                  <span onClick={reply}>
                    {React.createElement(MessageOutlined)}
                    <span>回复</span>
                  </span>
                </Tooltip>,
              ]}
              extra={<Button type="primary">关注</Button>}
            >
              <Comment
                author={
                  <a>
                    <strong>{item.author}</strong>
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
              {showComment === false ? null : (
                <div>
                  {/* 自己评论 */}
                  <TextEditor />

                  {/* 他人评论 */}
                  <List
                    className="comment-list"
                    header={`您有 ${data.length} 条评论`}
                    itemLayout="horizontal"
                    dataSource={commentData}
                    renderItem={(item) => (
                      <Comment
                        actions={[
                          <Tooltip key="comment-basic-like" title="点赞">
                            <span onClick={like}>
                              {createElement(action === 'liked' ? LikeFilled : LikeOutlined)}
                              <span>{item.like}</span>
                            </span>
                          </Tooltip>,
                          <Tooltip key="comment-basic-dislike" title="踩">
                            <span onClick={dislike}>
                              {React.createElement(
                                action === 'disliked' ? DislikeFilled : DislikeOutlined,
                              )}
                              <span>{item.disLike}</span>
                            </span>
                          </Tooltip>,
                          <Tooltip key="comment-basic-dislike" title="评论">
                            <span onClick={reply}>
                              {React.createElement(MessageOutlined)}
                              <span>回复</span>
                            </span>
                          </Tooltip>,
                        ]}
                        title={<a href={item.href}>{item.title}</a>}
                        author={<strong>{item.author}</strong>}
                        avatar={<Avatar />}
                        content={<span>{item.content}</span>}
                        datetime={
                          <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                            <span>{moment().fromNow()}</span>
                          </Tooltip>
                        }
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
