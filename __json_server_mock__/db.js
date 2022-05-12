// 使用 Mock
const Mock = require('mockjs');
const {Tooltip} = require("_antd@4.20.3@antd");
const moment = require("moment");
const React = require("react");

var random = Mock.Random;

let rank_data_author = [];
let rank_data_blog = [];
let rank_data_domain = [];
let rank_data_point_id_1 = [];
let rank_data_point_id_2 = [];
let rank_data_point_id_3 = [];
let rank_data_point_id_4 = [];
let rank_data_point_id_5 = [];
let rank_data_solve = [];

/**
 * =========================================START==================================================
 */

// TODO data

/**
 * ===========================================END================================================
 */
for (let i = 0; i < 100; i++) {
  let name = random.cname(); // 随机中文名字
  let picture = 'https://randomuser.me/api/portraits/women/27.jpg'; //固定一个头像
  let concern = 1000 - i * 9; //关注数
  let praise = 10000 - i * 99; //点赞数
  let integral = 1232329 - 333 * i; //博客积分
  let solveNumber = 232 - i * 10;
  let title = random.csentence(7, 10); //标题
  let browse = 1232329 - 333 * i; //
  let comment = 2323 - 12 * i;
  let collection = 232 - 3 * i;
  let classify = Math.floor(Math.random() * 10);
  rank_data_author.push({
    id: i,
    type: 'author',
    name,
    picture,
    concern,
    praise,
    integral,
  });
  rank_data_blog.push({
    id: i,
    type: 'blog',
    title,
    browse,
    comment,
    collection,
  });
  rank_data_domain.push({
    id: i,
    type: 'domain',
    name,
    picture,
    concern,
    praise,
    integral,
  });
  rank_data_point_id_1.push({
    id: i,
    type: 'point',
    title,
    browse,
    comment,
    collection,
    classify,
  });
  rank_data_point_id_2.push({
    id: i,
    type: 'point',
    title,
    browse,
    comment,
    collection,
    classify,
  });
  rank_data_point_id_3.push({
    id: i,
    type: 'point',
    title,
    browse,
    comment,
    collection,
    classify,
  });
  rank_data_point_id_4.push({
    id: i,
    type: 'point',
    title,
    browse,
    comment,
    collection,
    classify,
  });
  rank_data_point_id_5.push({
    id: i,
    type: 'point',
    title,
    browse,
    comment,
    collection,
    classify,
  });

  rank_data_solve.push({
    id: i,
    type: 'solve',
    name,
    picture,
    concern,
    solveNumber,
  });
}

const titles = [
  'Alipay',
  'Angular',
  'Ant Design',
  'Ant Design Pro',
  'Bootstrap',
  'React',
  'Vue',
  'Webpack',
];
const avatars = [
  'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png', // Alipay
  'https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png', // Angular
  'https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png', // Ant Design
  'https://gw.alipayobjects.com/zos/rmsportal/sfjbOqnsXXJgNfCjCzDBL.png', // Ant Design Pro
  'https://gw.alipayobjects.com/zos/rmsportal/siCrBXXhmvTQGWPNLBow.png', // Bootstrap
  'https://gw.alipayobjects.com/zos/rmsportal/kZzEzemZyKLKFsojXItE.png', // React
  'https://gw.alipayobjects.com/zos/rmsportal/ComBAopevLwENQdKWiIn.png', // Vue
  'https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png', // Webpack
];
const covers = [
  'https://gw.alipayobjects.com/zos/rmsportal/uMfMFlvUuceEyPpotzlq.png',
  'https://gw.alipayobjects.com/zos/rmsportal/iZBVOIhGJiAnhplqjvZW.png',
  'https://gw.alipayobjects.com/zos/rmsportal/iXjVmWVHbCJAyqvDxdtx.png',
  'https://gw.alipayobjects.com/zos/rmsportal/gLaIAoVWTtLbBWZNYEMg.png',
];
const desc = [
  '那是一种内在的东西， 他们到达不了，也无法触及的',
  '希望是一个好东西，也许是最好的，好东西是不会消亡的',
  '生命就像一盒巧克力，结果往往出人意料',
  '城镇中有那么多的酒馆，她却偏偏走进了我的酒馆',
  '那时候我只会想自己想要什么，从不想自己拥有什么',
];
const user = [
  '付小小',
  '曲丽丽',
  '林东东',
  '周星星',
  '吴加好',
  '朱偏右',
  '鱼酱',
  '乐哥',
  '谭小仪',
  '仲尼',
];

const Article_list = [];
const Community_list = [];
const Complex_list = [];
const Posts_list = [];
const Read_list = [];
for (let i = 0; i < 100; i++) {
  let temp = {
    id: i,
    owner: user[i % 10],
    title: titles[i % 8],
    avatar: avatars[i % 8],
    cover: parseInt(`${i / 4}`, 10) % 2 === 0 ? covers[i % 4] : covers[3 - (i % 4)],
    status: ['active', 'exception', 'normal'][i % 3],
    percent: Math.ceil(Math.random() * 50) + 50,
    logo: avatars[i % 8],
    href: 'https://ant.design',
    updatedAt: new Date(new Date().getTime() - 1000 * 60 * 60 * 2 * i).getTime(),
    createdAt: new Date(new Date().getTime() - 1000 * 60 * 60 * 2 * i).getTime(),
    subDescription: desc[i % 5],
    description:
      '在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。',
    activeUser: Math.ceil(Math.random() * 100000) + 100000,
    newUser: Math.ceil(Math.random() * 1000) + 1000,
    star: Math.ceil(Math.random() * 100) + 100,
    like: Math.ceil(Math.random() * 100) + 100,
    message: Math.ceil(Math.random() * 10) + 10,
    content:
      '段落示意：蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。',
    members: [
      {
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ZiESqWwCXBRQoaPONSJe.png',
        name: '曲丽丽',
        id: 'member1',
      },
      {
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/tBOxZPlITHqwlGjsJWaF.png',
        name: '王昭君',
        id: 'member2',
      },
      {
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/sBxjgqiuHMGRkIjqlQCd.png',
        name: '董娜娜',
        id: 'member3',
      },
    ],
  };
  Community_list.push(temp);
  Article_list.push(temp);
  Complex_list.push(temp);
  Posts_list.push(temp);
  Read_list.push(temp);
}

let owners = [];
for (let i = 0; i < 10; i++) {
  owners.push({
    id: i,
    name: random.cname(),
  });
}

const problem_list = [];
for (let i = 0; i < 100; i++) {
  problem_list.push({
    key: i,
    number: i + 1,
    title: '多重背包问题 I',
    resolve_count: '223',
    level: ['easy'],
    resolve_state: ['pass'],
  });
}

const users_list = [];
const topic_activity = [];
const topic_info = [];
for (let i = 0; i < 100; i++) {
  let temp = {
    id: i + 1,
    gender: 'male',
    name: {
      title: 'Mr',
      first: 'Sander',
      last: 'Olsen',
    },
    email: 'sander.olsen@example.com',
    picture: {
      large: 'https://randomuser.me/api/portraits/men/85.jpg',
      medium: 'https://randomuser.me/api/portraits/med/men/85.jpg',
      thumbnail: 'https://randomuser.me/api/portraits/thumb/men/85.jpg',
    },
    nat: 'DK',
  };
  users_list.push(temp);
  topic_activity.push(temp);
  topic_info.push(temp);
}

const topic_data = [];
for (let i = 0; i < 15; i++) {
  topic_data.push({ id: i, title: '你好世界', num: 666 });
}

const article_viewer_comment = [];
const article_viewer_content = [];
const article_viewer_info = [];
for (let i = 0; i < 15; i++) {
  article_viewer_comment.push({
    author: '天呆',
    avatar: 'https://joeschmoe.io/api/v1/random',
    userId: "001",
    type: "comment",
    replyUserId: "",
    replayUserName: "",
    content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully andefficiently.',
  })
}
article_viewer_content.push({
  title: '基于ByteMD的MarkDown渲染文章详情页面，目录使用markdown-navbar生成',
  label: '原创',
  content: "---\n" +
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
    "|  111| 222 |333|\n",
})
article_viewer_info.push({
  author: '天天发呆的程序员',
  time: '2021-10-24 10:24:00',
  classify: '后端',
  tags: ['Java', 'JavaScript', 'React'],
  readNum: 56,
  collectNum: 8,
  starNum: 2223,
})

const home_public_data = [];
const home_user_data = [];
const home_good_author_list = [];
for (let i = 0; i < 3; i++) {
  home_public_data.push({
    avatar: 'https://joeschmoe.io/api/v1/random',
    title: `OnePiece社区Version0.0.${i}版本发布`,
    titleHref: 'https://ant.design',
    time: '2022-02-01',
    desc: "该版本目前正处于测试阶段，前端页面多数正处于开发过程中，尚未接入后端接口。",
  })
  home_good_author_list.push({
    avatar: 'https://joeschmoe.io/api/v1/random',
    name: '天天发呆的程序员',
    href: 'https://ant.design',
    desc: '2022年CSDN博客之星TOP8，CSDN博客专家，Java领域优质创作者，阿里巴巴全栈开发工程师。'
  })
}
home_user_data.push({
  avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
  name: '吴彦祖',
  userid: '00000001',
  email: 'antdesign@alipay.com',
  signature: '海纳百川，有容乃大',
  title: '交互专家',
  group: '蚂蚁金服－某某某事业群－某某平台部－某某技术部－UED',
  articleNum: 66,
  testAnswerNum: 10,
  testAnswerAllNum: 100,
  rank: 6
})


module.exports = () => {
  return {
    rank_data_author,
    rank_data_blog,
    rank_data_domain,
    rank_data_point_id_1,
    rank_data_point_id_2,
    rank_data_point_id_3,
    rank_data_point_id_4,
    rank_data_point_id_5,
    rank_data_solve,
    Article_list,
    owners,
    Community_list,
    Complex_list,
    Posts_list,
    problem_list,
    users_list,
    topic_activity,
    topic_info,
    topic_data,
    Read_list,
    article_viewer_comment,
    article_viewer_content,
    article_viewer_info,
    home_public_data,
    home_user_data,
    home_good_author_list,
  };
};

// {
//   "results": [
//     {
//       "type": "1",
//       "gender": "female",
//       "name": {
//         "title": "Ms",
//         "first": "Teuna",
//         "last": "Evers"
//       },
//       "email": "teuna.evers@example.com",
//       "picture": {
//         "large": "https://randomuser.me/api/portraits/women/27.jpg",
//         "medium": "https://randomuser.me/api/portraits/med/women/27.jpg",
//         "thumbnail": "https://randomuser.me/api/portraits/thumb/women/27.jpg"
//       },
//       "nat": "NL",
//       "title": "【蓝桥杯真题】当蓝桥杯开设Web组之后，对几题能拿省一？"
//     },
//     {
//       "type": "1",

//       "gender": "female",
//       "name": {
//         "title": "Miss",
//         "first": "Capucine",
//         "last": "Perrin"
//       },
//       "email": "capucine.perrin@example.com",
//       "picture": {
//         "large": "https://randomuser.me/api/portraits/women/15.jpg",
//         "medium": "https://randomuser.me/api/portraits/med/women/15.jpg",
//         "thumbnail": "https://randomuser.me/api/portraits/thumb/women/15.jpg"
//       },
//       "nat": "FR",
//       "title": "【蓝桥杯真题】当蓝桥杯开设Web组之后，对几题能拿省一？"
//     },
//     {
//       "type": "1",

//       "gender": "female",
//       "name": {
//         "title": "Miss",
//         "first": "Eleanor",
//         "last": "Carpenter"
//       },
//       "email": "eleanor.carpenter@example.com",
//       "picture": {
//         "large": "https://randomuser.me/api/portraits/women/40.jpg",
//         "medium": "https://randomuser.me/api/portraits/med/women/40.jpg",
//         "thumbnail": "https://randomuser.me/api/portraits/thumb/women/40.jpg"
//       },
//       "nat": "IE",
//       "title": "【蓝桥杯真题】当蓝桥杯开设Web组之后，对几题能拿省一？"
//     },
//     {
//       "type": "2",

//       "gender": "female",
//       "name": {
//         "title": "Ms",
//         "first": "Alice",
//         "last": "Mackay"
//       },
//       "email": "alice.mackay@example.com",
//       "picture": {
//         "large": "https://randomuser.me/api/portraits/women/62.jpg",
//         "medium": "https://randomuser.me/api/portraits/med/women/62.jpg",
//         "thumbnail": "https://randomuser.me/api/portraits/thumb/women/62.jpg"
//       },
//       "nat": "CA",
//       "title": "【蓝桥杯真题】当蓝桥杯开设Web组之后，对几题能拿省一？"
//     },
//     {
//       "type": "3",

//       "gender": "female",
//       "name": {
//         "title": "Miss",
//         "first": "Angie",
//         "last": "Baker"
//       },
//       "email": "angie.baker@example.com",
//       "picture": {
//         "large": "https://randomuser.me/api/portraits/women/84.jpg",
//         "medium": "https://randomuser.me/api/portraits/med/women/84.jpg",
//         "thumbnail": "https://randomuser.me/api/portraits/thumb/women/84.jpg"
//       },
//       "nat": "GB",
//       "title": "【蓝桥杯真题】当蓝桥杯开设Web组之后，对几题能拿省一？"
//     },
//     {
//       "type": "4",

//       "gender": "male",
//       "name": {
//         "title": "Mr",
//         "first": "Barış",
//         "last": "Akbulut"
//       },
//       "email": "baris.akbulut@example.com",
//       "picture": {
//         "large": "https://randomuser.me/api/portraits/men/74.jpg",
//         "medium": "https://randomuser.me/api/portraits/med/men/74.jpg",
//         "thumbnail": "https://randomuser.me/api/portraits/thumb/men/74.jpg"
//       },
//       "nat": "TR",
//       "title": "【蓝桥杯真题】当蓝桥杯开设Web组之后，对几题能拿省一？"
//     },
//     {
//       "type": "5",

//       "gender": "male",
//       "name": {
//         "title": "Mr",
//         "first": "Leo",
//         "last": "Chan"
//       },
//       "email": "leo.chan@example.com",
//       "picture": {
//         "large": "https://randomuser.me/api/portraits/men/96.jpg",
//         "medium": "https://randomuser.me/api/portraits/med/men/96.jpg",
//         "thumbnail": "https://randomuser.me/api/portraits/thumb/men/96.jpg"
//       },
//       "nat": "CA",
//       "title": "【蓝桥杯真题】当蓝桥杯开设Web组之后，对几题能拿省一？"
//     },
//     {
//       "type": "6",

//       "gender": "male",
//       "name": {
//         "title": "Mr",
//         "first": "Pedro",
//         "last": "Santos"
//       },
//       "email": "pedro.santos@example.com",
//       "picture": {
//         "large": "https://randomuser.me/api/portraits/men/67.jpg",
//         "medium": "https://randomuser.me/api/portraits/med/men/67.jpg",
//         "thumbnail": "https://randomuser.me/api/portraits/thumb/men/67.jpg"
//       },
//       "nat": "ES",
//       "title": "【蓝桥杯真题】当蓝桥杯开设Web组之后，对几题能拿省一？"
//     },
//     {
//       "type": "7",

//       "gender": "female",
//       "name": {
//         "title": "Mrs",
//         "first": "Brooklyn",
//         "last": "Armstrong"
//       },
//       "email": "brooklyn.armstrong@example.com",
//       "picture": {
//         "large": "https://randomuser.me/api/portraits/women/22.jpg",
//         "medium": "https://randomuser.me/api/portraits/med/women/22.jpg",
//         "thumbnail": "https://randomuser.me/api/portraits/thumb/women/22.jpg"
//       },
//       "nat": "AU",
//       "title": "【蓝桥杯真题】当蓝桥杯开设Web组之后，对几题能拿省一？"
//     },
//     {
//       "type": "8",

//       "gender": "female",
//       "name": {
//         "title": "Ms",
//         "first": "Isabella",
//         "last": "Hart"
//       },
//       "email": "isabella.hart@example.com",
//       "picture": {
//         "large": "https://randomuser.me/api/portraits/women/25.jpg",
//         "medium": "https://randomuser.me/api/portraits/med/women/25.jpg",
//         "thumbnail": "https://randomuser.me/api/portraits/thumb/women/25.jpg"
//       },
//       "nat": "GB",
//       "title": "【蓝桥杯真题】当蓝桥杯开设Web组之后，对几题能拿省一？"
//     }
//   ]
// }
