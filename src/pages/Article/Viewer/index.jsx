import React, { useMemo, useEffect, useRef, useState } from 'react';
import {
  Layout,
  Menu,
  Form,
  Input,
  Button,
  Row,
  Col,
  message,
  Modal,
  Radio,
  Card,
  Calendar,
  List,
  Avatar,
  Tag,
  Skeleton,
  Statistic,
  Image,
  Comment,
  Tooltip,
  BackTop,
} from 'antd';
import './index.less';
import JsCookie from 'js-cookie';
// 编辑 / 视图
import { Editor, Viewer } from '@bytemd/react';
import breaks from '@bytemd/plugin-breaks';
import footnotes from '@bytemd/plugin-footnotes';
import gfm from '@bytemd/plugin-gfm';
import gemoji from '@bytemd/plugin-gemoji';
import highlight from '@bytemd/plugin-highlight';
// import highlight from "@bytemd/plugin-highlight-ssr";
import mediumZoom from '@bytemd/plugin-medium-zoom';
import frontmatter from '@bytemd/plugin-frontmatter';
// import math from '@bytemd/plugin-math';
import math from '@bytemd/plugin-math-ssr';
import mermaid from '@bytemd/plugin-mermaid';
// 引入基础css
import 'bytemd/dist/index.min.css';
// 引入高亮css
import 'highlight.js/styles/vs.css';
// 引入主题: 主题列表 https://github.com/xitu/juejin-markdown-themes
// import 'juejin-markdown-themes/dist/juejin.min.css';// 掘金主题
// import 'juejin-markdown-themes/dist/geek-black.min.css';
import 'juejin-markdown-themes/dist/condensed-night-purple.min.css';
import 'juejin-markdown-themes/dist/condensed-night-purple';
// import 'juejin-markdown-themes/dist/smartblue.min.css';
// import 'juejin-markdown-themes/dist/devui-blue.min.css';
// import 'juejin-markdown-themes/dist/nico.min.css';
// import 'juejin-markdown-themes/dist/arknights.min.css';
// import 'juejin-markdown-themes/dist/fancy.min.css';
// import 'juejin-markdown-themes/dist/v-green.min.css';
// import 'juejin-markdown-themes/dist/hydrogen.min.css';
// 代码主题
import 'highlightjs/styles/atom-one-dark-reasonable.css';
// import 'highlightjs/styles/an-old-hope.css';
// import 'highlightjs/styles/a11y-dark.css';

import MarkNav from 'markdown-navbar';
import { FooterToolbar, GridContent, PageContainer } from '@ant-design/pro-layout';
import styles from '@/pages/Home/index.less';
import {
  BookFilled,
  CalendarOutlined,
  ClockCircleFilled,
  DislikeOutlined,
  EyeFilled,
  EyeOutlined,
  LikeFilled,
  LikeOutlined,
  LikeTwoTone,
  MessageOutlined,
  NotificationOutlined,
  OrderedListOutlined,
  StarFilled,
  StarOutlined,
  StarTwoTone,
  TagsFilled,
  TeamOutlined,
} from '@ant-design/icons';
import RecommendUsers from '@/pages/Home/components/RecommendUsers';

// 目录
import MarkdownNavbar from 'markdown-navbar';
import 'markdown-navbar/dist/navbar.css';
import TextArea from 'antd/es/input/TextArea';
import moment from 'moment';

const plugins = [
  gfm(),
  gemoji(),
  highlight(),
  mediumZoom(),
  breaks(),
  footnotes(),
  frontmatter(),
  math(),
  mermaid(),
];

const ArticleDetail = (props) => {
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [articleComment, setArticleComment] = useState([]);
  const [articleContent, setArticleContent] = useState('');
  const [articleInfo, setArticleInfo] = useState('');
  console.log(props.location.pathname);
  let id = props.location.pathname.split('/').pop();
  console.log(id);
  const loadData = () => {
    if (loading) {
      return;
    }
    setLoading(true);
    fetch('http://localhost:3000/article_viewer_comment')
      .then((res) => res.json())
      .then((body) => {
        setArticleComment([...body]);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
    fetch(`http://localhost:3000/article_viewer_content?id=${id}`)
      .then((res) => res.json())
      .then((body) => {
        setArticleContent(body[0]);
      })
      .catch(() => {
        setLoading(false);
      });
    fetch('http://localhost:3000/article_viewer_info')
      .then((res) => res.json())
      .then((body) => {
        setArticleInfo(body[0]);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    loadData();
  }, []);

  const ExtraContent = () => (
    <div className={styles.extraContent}>
      <div className={styles.statItem}>
        {/*<Statistic title={<span><EyeFilled/> 阅读总数</span>} value={666}/>*/}
        <Statistic
          title={
            <span>
              <EyeFilled /> 阅读总数
            </span>
          }
          value={articleInfo.readNum}
        />
      </div>
      <div className={styles.statItem}>
        {/*<Statistic title={<span><StarFilled/> 收藏总数</span>} value={666} suffix=""/>*/}
        <Statistic
          title={
            <span>
              <StarFilled /> 收藏总数
            </span>
          }
          value={articleInfo.collectNum}
          suffix=""
        />
      </div>
      <div className={styles.statItem}>
        {/*<Statistic title={<span><LikeFilled/> 点赞总数</span>} value={666}/>*/}
        <Statistic
          title={
            <span>
              <LikeFilled /> 点赞总数
            </span>
          }
          value={articleInfo.starNum}
        />
      </div>
    </div>
  );

  const PageHeaderContent = ({ currentUser }) => {
    const loading = currentUser && Object.keys(currentUser).length;

    if (!loading) {
      return (
        <Skeleton
          avatar
          paragraph={{
            rows: 1,
          }}
          active
        />
      );
    }

    return (
      <div className={styles.pageHeaderContent}>
        <div className={styles.avatar}>
          <Avatar size="large" src={currentUser.avatar} />
        </div>
        <div className={styles.content}>
          <div className={styles.contentTitle}>{currentUser.name}</div>
          <div>
            <span style={{ marginRight: 20 }}>
              <ClockCircleFilled /> 发布于 {articleInfo.time}{' '}
            </span>
            <span style={{ marginRight: 20 }}>
              <BookFilled /> 文章归类: <Tag color="red">{articleInfo.classify}</Tag>
            </span>
            <span>
              <TagsFilled /> 文章标签:{' '}
              {
                <>
                  <Tag color="blue" style={{ marginRight: 10 }}>
                    java
                  </Tag>
                  <Tag color="blue" style={{ marginRight: 10 }}>
                    js
                  </Tag>
                  {/*----------------------------------------这里有问题------------------------------------------------*/}
                  {/*{*/}
                  {/*  articleInfo && articleInfo.tags && articleInfo.tags.map(item => {*/}
                  {/*    console.log('===========', item)*/}
                  {/*    return (*/}
                  {/*      <Tag color="blue" style={{marginRight: 10}}>{item}</Tag>*/}
                  {/*    )*/}
                  {/*  }*/}
                  {/*  )*/}
                  {/*}*/}
                </>
              }
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <PageContainer
      header={{
        title: '',
      }}
      content={
        <PageHeaderContent
          currentUser={{
            avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
            name: '天天发呆的程序员',
            userid: '00000001',
            email: 'antdesign@alipay.com',
            signature: '海纳百川，有容乃大',
            title: '交互专家',
            group: '蚂蚁金服－某某某事业群－某某平台部－某某技术部－UED',
          }}
        />
      }
      extraContent={<ExtraContent />}
    >
      <GridContent>
        <Row gutter={24}>
          <Col lg={18} md={24}>
            <Card
              className={''}
              bordered={false}
              title={
                <span style={{ fontSize: 'large', fontWeight: 'bold' }}>
                  {articleContent.title}
                </span>
              }
              // extra={<Tag color="green"><span style={{fontWeight: "bold"}}>转 载</span></Tag>}
              extra={
                <Tag color="red">
                  <span style={{ fontWeight: 'bold' }}>{articleContent.label}</span>
                </Tag>
              }
            >
              {/*<Editor*/}
              {/*  locale={zhHans}*/}
              {/*  // 内部的值*/}
              {/*  value={value}*/}
              {/*  // 插件*/}
              {/*  plugins={plugins}*/}
              {/*  // 动态修改值*/}
              {/*  onChange={v => setValue(v)}*/}
              {/*/>*/}
              <Viewer
                // 内部的值
                value={articleContent.content}
                // 插件
                plugins={plugins}
                // 动态修改值
                // onChange={v => setValue(v)}
              />
              {/*<FooterToolbar*/}
              {/*  // style={{*/}
              {/*  //   left: 208,*/}
              {/*  //   width: `calc(100% - 208px)`,*/}
              {/*  // }}*/}
              {/*>*/}
              {/*  <Button>提交</Button>*/}
              {/*</FooterToolbar>*/}
            </Card>
            <Card
              actions={[
                // <LikeOutlined key="like"/>,
                <LikeTwoTone key="like" />,
                <DislikeOutlined key="dislike" />,
                // <StarOutlined key="star"/>,
                <StarTwoTone key="star" />,
                <MessageOutlined key="comment" />,
              ]}
            >
              <>
                <Avatar
                  shape="square"
                  size="large"
                  src={<Image src="https://joeschmoe.io/api/v1/random" />}
                />
                <span style={{ marginLeft: 10, fontWeight: 'bold', marginRight: 10 }}>
                  <a>{articleInfo.author}</a>
                </span>
                <Button type="default" shape="round" icon={'关 注'} size={'small'} />
              </>
            </Card>
            <Card style={{ marginTop: 20 }} title="评论区">
              <Comment
                avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />}
                content={
                  <CommentEditor
                  // onChange={}
                  // onSubmit={}
                  // submitting={}
                  // value={}
                  />
                }
              />

              <List
                className="comment-list"
                header={`${articleComment.length} replies`}
                itemLayout="horizontal"
                dataSource={articleComment}
                pagination={{
                  onChange: (page) => {
                    console.log(page);
                  },
                  pageSize: 3,
                }}
                renderItem={(item) => (
                  <List.Item>
                    <Comment
                      actions={[<span key="comment-list-reply-to-0">回 复</span>]}
                      author={
                        <>
                          item.author
                          {item.userId === '001' ? <Tag color="default">作者</Tag> : ''}
                        </>
                      }
                      avatar={item.avatar}
                      content={
                        <>
                          <a href={'#'}>
                            @{item.replayUserName !== '' ? item.replayUserName : '作者'}
                          </a>
                          <span>
                            <p>{item.content}</p>
                          </span>
                        </>
                      }
                      datetime={
                        <Tooltip title={moment().subtract(1, 'days').format('YYYY-MM-DD HH:mm:ss')}>
                          <span>{moment().subtract(1, 'days').fromNow()}</span>
                        </Tooltip>
                      }
                      // children={}
                    />
                  </List.Item>
                )}
              />
            </Card>
          </Col>
          <Col lg={6} md={24}>
            <Card
              title={
                <span>
                  <OrderedListOutlined
                    style={{
                      marginRight: 10,
                    }}
                  />
                  目录
                </span>
              }
              style={{
                // marginBottom: 24,
                overflow: 'auto',
                position: 'fixed',
              }}
              hoverable={true}
              bordered={false}
              bodyStyle={{
                padding: 0,
              }}
            >
              {/* 目录生成 */}
              <MarkdownNavbar
                className="toc-list"
                source={articleContent.content}
                ordered={false} // 不包含标题前缀序号
              />
            </Card>
          </Col>
        </Row>
      </GridContent>
      <BackTop>
        <div className={'backTop'}>UP</div>
      </BackTop>
    </PageContainer>
  );
};

const CommentEditor = ({ onChange, onSubmit, submitting, value }) => (
  <>
    <Form.Item>
      <TextArea
        rows={4}
        // onChange={onChange} value={value}
      />
    </Form.Item>
    <Form.Item>
      <Button
        htmlType="submit"
        // loading={submitting} onClick={onSubmit}
        type="primary"
      >
        发布评论
      </Button>
    </Form.Item>
  </>
);

export default ArticleDetail;
