import React, { useState, createElement, useEffect } from 'react';
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
  const [loading, setLoading] = useState(false);
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [data, setData] = useState([]);
  const [showComment, setShowComment] = useState(false);
  const [commentData, setCommentData] = useState([]);
  const [isComment, setIsComment] = useState(false);
  const [isReply, setIsReply] = useState(false);
  const [action, setAction] = useState(null);
  const [flag, setFlag] = useState(false);
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

  // 回复
  const reply = () => {
    setIsReply(!isReply);
  };

  // 查看评论
  const checkComment = (e) => {
    console.log(e.target);
    const div = e.parentNode.parentNode.parentNode.parentNode.parentNode;
    if (div.id.indexOf('commentId')) {
      div.classList.remove('commentId');
    } else {
      div.classList.add('commentId');
    }
    console.log(div);
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

  return (
    <GridContent>
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
    </GridContent>
  );
};

export default TopicInfo;
