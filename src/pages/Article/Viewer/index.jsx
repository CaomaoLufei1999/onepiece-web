import React, {useMemo, useEffect, useRef, FC, useState} from 'react'
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
  Radio, Card, Calendar, List, Avatar, Tag, Skeleton, Statistic, Image, Comment, Tooltip, BackTop,
} from "antd";
import './index.less';
import JsCookie from "js-cookie";
// 编辑 / 视图
import {Editor, Viewer} from "@bytemd/react";
import breaks from '@bytemd/plugin-breaks';
import footnotes from '@bytemd/plugin-footnotes';
import gfm from "@bytemd/plugin-gfm";
import gemoji from "@bytemd/plugin-gemoji";
import highlight from "@bytemd/plugin-highlight";
// import highlight from "@bytemd/plugin-highlight-ssr";
import mediumZoom from "@bytemd/plugin-medium-zoom";
import frontmatter from '@bytemd/plugin-frontmatter';
// import math from '@bytemd/plugin-math';
import math from '@bytemd/plugin-math-ssr';
import mermaid from '@bytemd/plugin-mermaid';
// 引入基础css
import "bytemd/dist/index.min.css";
// 引入高亮css
import "highlight.js/styles/vs.css";
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
import {FooterToolbar, GridContent, PageContainer} from "@ant-design/pro-layout";
import styles from "@/pages/Home/index.less";
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
  StarTwoTone, TagsFilled,
  TeamOutlined
} from "@ant-design/icons";
import RecommendUsers from "@/pages/Home/components/RecommendUsers";

// 目录
import MarkdownNavbar from 'markdown-navbar';
import 'markdown-navbar/dist/navbar.css';
import TextArea from "antd/es/input/TextArea";
import moment from "moment";

// state = {
//   initLoading: true,
//   loading: false,
//   commentData: commentData,
//   // list: [],
// };
const commentData = [
  {
    actions: [<span key="comment-list-reply-to-0">回 复</span>],
    author: '天呆',
    avatar: 'https://joeschmoe.io/api/v1/random',
    userId: "001",
    type: "comment",
    replyUserId: "",
    replayUserName: "",
    content: (
      <p>
        We supply a series of design principles, practical patterns and high quality design
        resources (Sketch and Axure), to help people create their product prototypes beautifully and
        efficiently.
      </p>
    ),
    datetime: (
      <Tooltip title={moment().subtract(1, 'days').format('YYYY-MM-DD HH:mm:ss')}>
        <span>{moment().subtract(1, 'days').fromNow()}</span>
      </Tooltip>
    ),
  },
  {
    actions: [<span key="comment-list-reply-to-0">回 复</span>],
    author: 'Han Solo',
    avatar: 'https://joeschmoe.io/api/v1/random',
    userId: "002",
    replyUserId: "001",
    replayUserName: "天天发呆的程序员",
    type: "replay",
    content: (
      <p>
        We supply a series of design principles, practical patterns and high quality design
        resources (Sketch and Axure), to help people create their product prototypes beautifully and
        efficiently.
      </p>
    ),
    datetime: (
      <Tooltip title={moment().subtract(2, 'days').format('YYYY-MM-DD HH:mm:ss')}>
        <span>{moment().subtract(2, 'days').fromNow()}</span>
      </Tooltip>
    ),
  },
  {
    actions: [<span key="comment-list-reply-to-0">回 复</span>],
    author: 'Han Solo',
    avatar: 'https://joeschmoe.io/api/v1/random',
    userId: "002",
    replyUserId: "001",
    replayUserName: "天天发呆的程序员",
    type: "replay",
    content: (
      <p>
        We supply a series of design principles, practical patterns and high quality design
        resources (Sketch and Axure), to help people create their product prototypes beautifully and
        efficiently.
      </p>
    ),
    datetime: (
      <Tooltip title={moment().subtract(2, 'days').format('YYYY-MM-DD HH:mm:ss')}>
        <span>{moment().subtract(2, 'days').fromNow()}</span>
      </Tooltip>
    ),
  },
  {
    actions: [<span key="comment-list-reply-to-0">回 复</span>],
    author: 'Han Solo',
    avatar: 'https://joeschmoe.io/api/v1/random',
    userId: "002",
    replyUserId: "001",
    replayUserName: "天天发呆的程序员",
    type: "replay",
    content: (
      <p>
        We supply a series of design principles, practical patterns and high quality design
        resources (Sketch and Axure), to help people create their product prototypes beautifully and
        efficiently.
      </p>
    ),
    datetime: (
      <Tooltip title={moment().subtract(2, 'days').format('YYYY-MM-DD HH:mm:ss')}>
        <span>{moment().subtract(2, 'days').fromNow()}</span>
      </Tooltip>
    ),
  },
];

const plugins = [gfm(), gemoji(), highlight(), mediumZoom(), breaks(), footnotes(), frontmatter(), math(), mermaid()];

const ArticleDetail = () => {
  const [value, setValue] = useState('');

  return (
    <PageContainer
      header={{
        title: ""
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
      extraContent={<ExtraContent/>}
    >
      <GridContent>
        <Row gutter={24}>
          <Col lg={18} md={24}>
            <Card
              className={""}
              bordered={false}
              title={
                <span
                  style={{fontSize: "large", fontWeight: "bold"}}>基于ByteMD的MarkDown渲染文章详情页面，目录使用markdown-navbar生成
                </span>
              }
              // extra={<Tag color="green"><span style={{fontWeight: "bold"}}>转 载</span></Tag>}
              extra={<Tag color="red"><span style={{fontWeight: "bold"}}>原 创</span></Tag>}
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
                value={articleContent}
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
                <LikeTwoTone key="like"/>,
                <DislikeOutlined key="dislike"/>,
                // <StarOutlined key="star"/>,
                <StarTwoTone key="star"/>,
                <MessageOutlined key="comment"/>,
              ]}
            >
              <>
                <Avatar shape="square" size="large"
                        src={<Image src="https://joeschmoe.io/api/v1/random"/>}/>
                <span style={{marginLeft: 10, fontWeight: "bold", marginRight: 10}}><a>天天发呆的程序员</a></span>
                <Button type="default" shape="round" icon={"关 注"} size={"small"}/>
              </>
            </Card>
            <Card style={{marginTop: 20}} title="评论区">
              <Comment
                avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo"/>}
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
                header={`${commentData.length} replies`}
                itemLayout="horizontal"
                dataSource={commentData}
                pagination={{
                  onChange: page => {
                    console.log(page);
                  },
                  pageSize: 3,
                }}
                renderItem={item => (
                  <List.Item>
                    <Comment
                      actions={item.actions}
                      author={
                        <>
                          item.author
                          {
                            item.userId === "001" ? <Tag color="default">作者</Tag> : ""
                          }

                        </>
                      }
                      avatar={item.avatar}
                      content={
                        <>

                          <a href={"#"}>
                            @
                            {

                              item.replayUserName !== "" ? item.replayUserName : "作者"

                            }
                          </a>
                          <span>{item.content}</span>
                        </>
                      }
                      datetime={item.datetime}
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
                  <OrderedListOutlined style={{
                    marginRight: 10,
                  }}/>
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
                source={articleContent}
                ordered={false} // 不包含标题前缀序号
              />
            </Card>
          </Col>
        </Row>
      </GridContent>
      <BackTop>
        <div className={"backTop"}>UP</div>
      </BackTop>
    </PageContainer>
  )
};

const CommentEditor = ({onChange, onSubmit, submitting, value}) => (
  <>
    <Form.Item>
      <TextArea rows={4}
        // onChange={onChange} value={value}
      />
    </Form.Item>
    <Form.Item>
      <Button htmlType="submit"
        // loading={submitting} onClick={onSubmit}
              type="primary">
        发布评论
      </Button>
    </Form.Item>
  </>
);

const ExtraContent = () => (
  <div className={styles.extraContent}>
    <div className={styles.statItem}>
      <Statistic title={<span><EyeFilled/> 阅读总数</span>} value={56}/>
    </div>
    <div className={styles.statItem}>
      <Statistic title={<span><StarFilled/> 收藏总数</span>} value={8} suffix=""/>
    </div>
    <div className={styles.statItem}>
      <Statistic title={<span><LikeFilled/> 点赞总数</span>} value={2223}/>
    </div>
  </div>
);

const PageHeaderContent = ({currentUser}) => {
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
        <Avatar size="large" src={currentUser.avatar}/>
      </div>
      <div className={styles.content}>
        <div className={styles.contentTitle}>
          {currentUser.name}
        </div>
        <div>
          <span style={{marginRight: 20}}><ClockCircleFilled/> 发布于 {"2021-10-24 10:24:00"} </span>
          <span style={{marginRight: 20}}>
            <BookFilled/> 文章归类: <Tag color="red">后端</Tag>
          </span>
          <span><TagsFilled/> 文章标签: {
            <>
              <Tag color="blue" style={{marginRight: 10}}>Java</Tag>
              <Tag color="blue" style={{marginRight: 10}}>JavaScript</Tag>
              <Tag color="blue" style={{marginRight: 10}}>React</Tag>
            </>
          }</span>
        </div>
      </div>
    </div>
  );
};


export default ArticleDetail;

const articleContent = "---\n" +
  "# frontmatter: https://jekyllrb.com/docs/front-matter/\n" +
  "layout: post\n" +
  "title: Blogging Like a Hacker\n" +
  "---\n" +
  "\n" +
  "## 一级标题下面包含2个二级标题：Markdown Basic Syntax\n" +
  "\n" +
  "I just love **bold text**. Italicized text is the _cat's meow_. At the command prompt, type `nano`.\n" +
  "\n" +
  "My favorite markdown editor is [ByteMD](https://github.com/bytedance/bytemd).\n" +
  "\n" +
  "1. First item\n" +
  "2. Second item\n" +
  "3. Third item\n" +
  "\n" +
  "> Dorothy followed her through many of the beautiful rooms in her castle.\n" +
  "\n" +
  "### JS代码示例\n" +
  "```js\n" +
  "import { Editor, Viewer } from 'bytemd'\n" +
  "import gfm from '@bytemd/plugin-gfm'\n" +
  "\n" +
  "const plugins = [\n" +
  "  gfm(),\n" +
  "  // Add more plugins here\n" +
  "]\n" +
  "\n" +
  "const editor = new Editor({\n" +
  "  target: document.body, // DOM to render\n" +
  "  props: {\n" +
  "    value: '',\n" +
  "    plugins,\n" +
  "  },\n" +
  "})\n" +
  "\n" +
  "editor.on('change', (e) => {\n" +
  "  editor.$set({ value: e.detail.value })\n" +
  "})\n" +
  "```\n" +
  "### Java代码\n" +
  "```java\n" +
  "/**\n" +
  " * @author John Smith <john.smith@example.com>\n" +
  "*/\n" +
  "package l2f.gameserver.model;\n" +
  "\n" +
  "public abstract strictfp class L2Char extends L2Object {\n" +
  "  public static final Short ERROR = 0x0001;\n" +
  "\n" +
  "  public void moveTo(int x, int y, int z) {\n" +
  "    _ai = null;\n" +
  "    log(\"Should not be called\");\n" +
  "    if (1 > 5) { // wtf!?\n" +
  "      return;\n" +
  "    }\n" +
  "  }\n" +
  "}\n" +
  "```\n" +
  "\n" +
  "## GFM Extended Syntax\n" +
  "\n" +
  "Automatic URL Linking: https://github.com/bytedance/bytemd\n" +
  "\n" +
  "~~The world is flat.~~ We now know that the world is round.\n" +
  "\n" +
  "- [x] Write the press release\n" +
  "- [ ] Update the website\n" +
  "- [ ] Contact the media\n" +
  "\n" +
  "| Syntax    | Description |\n" +
  "| --------- | ----------- |\n" +
  "| Header    | Title       |\n" +
  "| Paragraph | Text        |\n" +
  "\n" +
  "## Footnotes\n" +
  "\n" +
  "Here's a simple footnote,[^1] and here's a longer one.[^bignote]\n" +
  "\n" +
  "[^1]: This is the first footnote.\n" +
  "[^bignote]: Here's one with multiple paragraphs and code.\n" +
  "\n" +
  "    Indent paragraphs to include them in the footnote.\n" +
  "\n" +
  "    `{ my code }`\n" +
  "\n" +
  "    Add as many paragraphs as you like.\n" +
  "\n" +
  "## Gemoji\n" +
  "\n" +
  "Thumbs up: :+1:, thumbs down: :-1:.\n" +
  "\n" +
  "Families: :family_man_man_boy_boy:\n" +
  "\n" +
  "Long flags: :wales:, :scotland:, :england:.\n" +
  "\n" +
  "## Math Equation\n" +
  "\n" +
  "Inline math equation: $a+b$\n" +
  "\n" +
  "$$\n" +
  "\\displaystyle \\left( \\sum_{k=1}^n a_k b_k \\right)^2 \\leq \\left( \\sum_{k=1}^n a_k^2 \\right) \\left( \\sum_{k=1}^n b_k^2 \\right)\n" +
  "$$\n" +
  "\n" +
  "## Mermaid Diagrams\n" +
  "\n" +
  "```mermaid\n" +
  "graph TD;\n" +
  "  A-->B;\n" +
  "  A-->C;\n" +
  "  B-->D;\n" +
  "  C-->D;\n" +
  "```\n" +
  "\n" +
  "```mermaid\n" +
  "pie title Pets adopted by volunteers\n" +
  "\"Dogs\" : 386\n" +
  "\"Cats\" : 85\n" +
  "\"Rats\" : 15\n" +
  "```\n" +
  "\n" +
  "\n" +
  "| 标题1 | 标题2 |标题3 |\n" +
  "| --- | --- |--- |\n" +
  "|  111| 222 |333|\n";
