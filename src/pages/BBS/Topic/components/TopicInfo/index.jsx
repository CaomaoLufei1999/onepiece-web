import React, { useState, createElement, useEffect } from 'react';
import moment from 'moment';
import {
  List,
  Avatar,
  Button,
  Card,
  Comment,
  Tooltip,
  Skeleton,
  Divider,
  Row,
  Collapse,
} from 'antd';
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
import { Link } from 'umi';
import TextEditor from '../TextEditor';
import { GridContent } from '@ant-design/pro-layout';

const TopicInfo = (props) => {
  const { showComment } = props;
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [commentData, setCommentData] = useState([]);
  const [isReply, setIsReply] = useState(false);
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
  const like = (value) => {
    if (action === 'liked') {
      // --value;
      setAction(null);
    } else {
      // ++value;
      setAction('liked');
    }
  };

  // 踩
  const dislike = (value) => {
    if (action === 'disliked') {
      // --value;
      setAction(null);
    } else {
      // ++value;
      setAction('disliked');
    }
  };

  // 回复
  const reply = () => {
    setIsReply(!isReply);
  };

  // 查看评论
  const checkComment = (value) => {
    return !value;
  };

  // 分享
  const share = () => {
    alert('分享');
  };

  // 跳转至详情页
  const toDetailPage = () => {
    window.location.href = '/talk/topic/detail';
  };

  return (
    <GridContent>
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
            renderItem={(item) => {
              let show = false;
              return (
                <div>
                  <List.Item
                    key={item.id}
                    actions={[
                      <Tooltip key="comment-basic-like" title="点赞">
                        <span onClick={() => like(item.like)}>
                          {React.createElement(action === 'liked' ? LikeFilled : LikeOutlined)}
                          <span>{item.like}</span>
                        </span>
                      </Tooltip>,
                      <Tooltip key="comment-basic-dislike" title="踩">
                        <span onClick={() => dislike(item.disLike)}>
                          {React.createElement(
                            action === 'disliked' ? DislikeFilled : DislikeOutlined,
                          )}
                          <span>{item.disLike}</span>
                        </span>
                      </Tooltip>,
                      <Tooltip>
                        <Collapse ghost>
                          <Collapse.Panel header="评论" key="comment-basic-dislike">
                            <p>你好</p>
                          </Collapse.Panel>
                        </Collapse>
                      </Tooltip>,
                      // <Tooltip key="comment-basic-dislike" title="评论">
                      //   <span onClick={() => {show = !show}}>
                      //     {React.createElement(MessageOutlined)}
                      //     <span>回复</span>
                      //   </span>
                      // </Tooltip>,
                    ]}
                    extra={<Button type="primary">关注</Button>}
                  >
                    <Comment
                      author={
                        <a>
                          <strong>{item.author}</strong>
                        </a>
                      }
                      avatar={<Avatar src={item.avatar} alt="头像" />}
                      content={<p>{item.content}</p>}
                      datetime={
                        <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                          <span>{moment().fromNow()}</span>
                        </Tooltip>
                      }
                    />
                  </List.Item>

                  <div style={show === false ? { display: 'none' } : null}>
                    {/* 自己评论 */}
                    <TextEditor isShow={true} isAvatar={true} />

                    {/* 他人评论 */}
                    {showComment === true ? (
                      <List
                        className="comment-list"
                        header={`您有 ${data.length} 条评论`}
                        itemLayout="horizontal"
                        dataSource={commentData}
                        renderItem={(item) => (
                          <Comment
                            actions={[
                              <Tooltip key="comment-basic-like" title="点赞">
                                <span onClick={() => like(item.like)}>
                                  {React.createElement(
                                    action === 'liked' ? LikeFilled : LikeOutlined,
                                  )}
                                  <span>{item.like}</span>
                                </span>
                              </Tooltip>,
                              <Tooltip key="comment-basic-dislike" title="踩">
                                <span onClick={() => dislike(item.disLike)}>
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
                    ) : (
                      <Link to={'/talk/topic/detail?' + item.href}>
                        <Button>
                          查看更多
                          <RightOutlined />
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              );
            }}
          />
        </InfiniteScroll>
      </Card>
    </GridContent>
  );
};

export default TopicInfo;
