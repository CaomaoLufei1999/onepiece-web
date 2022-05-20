// 使用 Mock
const Mock = require('mockjs');
var random = Mock.Random;

/**
 * 下面随机使用的静态数据
 */
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

/**
 * 各个路径的后缀，也是数据的存储体
 */
let rank_data_author = []; //作者排行榜 /rank/list/weekly
let rank_data_blog = []; //博客热榜 /rank/list/blog
let rank_data_domain = []; //积分总榜 /rank/list/total
let rank_data_point_id_1 = []; //领域榜的各个部分，暂未解决按需加载问题 /rank/list/content
let rank_data_point_id_2 = []; //同上
let rank_data_point_id_3 = []; //同上
let rank_data_point_id_4 = []; //同上
let rank_data_point_id_5 = []; //同上
let rank_data_solve = []; //解题作者榜 /rank/list/resolve
let Article_list = []; //全站搜索的博客列表 /search/articles
let Community_list = []; //博客社区的博客列表 /community
let Complex_list = []; //全站搜索的综合列表 /search/all
let users_list = []; //全站搜索的用户推荐列表 /search/users
let Posts_list = []; //全站搜索的帖子列表 /search/posts
let problem_list = []; //全站搜索的题目列表 /search/problems
let Read_list = []; //读书区的书籍列表 /read-book
let home_recommend_list = []; //首页的推荐博客列表 /home
let home_new_list = []; //首页的新发博客列表 /home
let home_news_list = []; //首页的资讯热点列表 /home
let home_hot_list = []; //首页的热榜博客列表 /home
let article_viewer_comment = []; //博客的评论数据 /article/detail
let article_viewer_content = []; //博客的内容数据 /article/detail
let article_viewer_info = []; //博客的各种数据 /article/detail
let home_public_data = []; //主页的公告栏数据 /home
let home_follow_data = []; //主页的粉丝数据 /home
let home_user_data = []; //主页的用户数据 /home
let home_good_author_list = []; //主页的推荐用户数据，显示不出来这个模块 /home
let topic_info = []; //灌水专区的用户数据 /talk/topic
let topic_info_comment = []; //灌水专区的评论数据 /talk/topic
let topic_activity = []; //灌水专区的活动列表 /talk/topic/activities
let owners = []; //全站搜索的owner，飞哥说改成搜索框 /search/articles

/**
 * 下面开始造数据
 */
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
    rank: i + 1,
    star: Math.ceil(Math.random() * 100) + 100,
    like: Math.ceil(Math.random() * 100) + 100,
    message: Math.ceil(Math.random() * 10) + 10,
    tags: ['Ant Design', '设计语言', '蚂蚁金服'],
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
  let temp_2 = {
    id: i + 1,
    title: '灌水乐园',
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
    time: '2022.5.6~2022.5.9',
    browseNum: '666',
    img: 'https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png',
  };
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
  problem_list.push({
    key: i,
    number: i + 1,
    title: '多重背包问题 I',
    resolve_count: '223',
    level: ['easy'],
    resolve_state: ['pass'],
  });
  Article_list.push(temp);
  Community_list.push(temp);
  Complex_list.push(temp);
  Posts_list.push(temp);
  Read_list.push(temp);
  home_recommend_list.push(temp);
  home_new_list.push(temp);
  home_hot_list.push(temp);
  users_list.push(temp_2);
  topic_activity.push(temp_2);
  article_viewer_content.push({
    id: i,
    title: `基于ByteMD的MarkDown渲染文章详情页面，目录使用markdown-navbar生成${i}`,
    label: '原创',
    content:
      '---\n' +
      '# frontmatter: https://jekyllrb.com/docs/front-matter/\n' +
      'layout: post\n' +
      'title: Blogging Like a Hacker\n' +
      '---\n' +
      '\n' +
      '## 一级标题下面包含2个二级标题：Markdown Basic Syntax\n' +
      '\n' +
      "I just love **bold text**. Italicized text is the _cat's meow_. At the command prompt, type `nano`.\n" +
      '\n' +
      'My favorite markdown editor is [ByteMD](https://github.com/bytedance/bytemd).\n' +
      '\n' +
      '1. First item\n' +
      '2. Second item\n' +
      '3. Third item\n' +
      '\n' +
      '> Dorothy followed her through many of the beautiful rooms in her castle.\n' +
      '\n' +
      '### JS代码示例\n' +
      '```js\n' +
      "import { Editor, Viewer } from 'bytemd'\n" +
      "import gfm from '@bytemd/plugin-gfm'\n" +
      '\n' +
      'const plugins = [\n' +
      '  gfm(),\n' +
      '  // Add more plugins here\n' +
      ']\n' +
      '\n' +
      'const editor = new Editor({\n' +
      '  target: document.body, // DOM to render\n' +
      '  props: {\n' +
      "    value: '',\n" +
      '    plugins,\n' +
      '  },\n' +
      '})\n' +
      '\n' +
      "editor.on('change', (e) => {\n" +
      '  editor.$set({ value: e.detail.value })\n' +
      '})\n' +
      '```\n' +
      '### Java代码\n' +
      '```java\n' +
      '/**\n' +
      ' * @author John Smith <john.smith@example.com>\n' +
      '*/\n' +
      'package l2f.gameserver.model;\n' +
      '\n' +
      'public abstract strictfp class L2Char extends L2Object {\n' +
      '  public static final Short ERROR = 0x0001;\n' +
      '\n' +
      '  public void moveTo(int x, int y, int z) {\n' +
      '    _ai = null;\n' +
      '    log("Should not be called");\n' +
      '    if (1 > 5) { // wtf!?\n' +
      '      return;\n' +
      '    }\n' +
      '  }\n' +
      '}\n' +
      '```\n' +
      '\n' +
      '## GFM Extended Syntax\n' +
      '\n' +
      'Automatic URL Linking: https://github.com/bytedance/bytemd\n' +
      '\n' +
      '~~The world is flat.~~ We now know that the world is round.\n' +
      '\n' +
      '- [x] Write the press release\n' +
      '- [ ] Update the website\n' +
      '- [ ] Contact the media\n' +
      '\n' +
      '| Syntax    | Description |\n' +
      '| --------- | ----------- |\n' +
      '| Header    | Title       |\n' +
      '| Paragraph | Text        |\n' +
      '\n' +
      '## Footnotes\n' +
      '\n' +
      "Here's a simple footnote,[^1] and here's a longer one.[^bignote]\n" +
      '\n' +
      '[^1]: This is the first footnote.\n' +
      "[^bignote]: Here's one with multiple paragraphs and code.\n" +
      '\n' +
      '    Indent paragraphs to include them in the footnote.\n' +
      '\n' +
      '    `{ my code }`\n' +
      '\n' +
      '    Add as many paragraphs as you like.\n' +
      '\n' +
      '## Gemoji\n' +
      '\n' +
      'Thumbs up: :+1:, thumbs down: :-1:.\n' +
      '\n' +
      'Families: :family_man_man_boy_boy:\n' +
      '\n' +
      'Long flags: :wales:, :scotland:, :england:.\n' +
      '\n' +
      '## Math Equation\n' +
      '\n' +
      'Inline math equation: $a+b$\n' +
      '\n' +
      '$$\n' +
      '\\displaystyle \\left( \\sum_{k=1}^n a_k b_k \\right)^2 \\leq \\left( \\sum_{k=1}^n a_k^2 \\right) \\left( \\sum_{k=1}^n b_k^2 \\right)\n' +
      '$$\n' +
      '\n' +
      '## Mermaid Diagrams\n' +
      '\n' +
      '```mermaid\n' +
      'graph TD;\n' +
      '  A-->B;\n' +
      '  A-->C;\n' +
      '  B-->D;\n' +
      '  C-->D;\n' +
      '```\n' +
      '\n' +
      '```mermaid\n' +
      'pie title Pets adopted by volunteers\n' +
      '"Dogs" : 386\n' +
      '"Cats" : 85\n' +
      '"Rats" : 15\n' +
      '```\n' +
      '\n' +
      '\n' +
      '| 标题1 | 标题2 |标题3 |\n' +
      '| --- | --- |--- |\n' +
      '|  111| 222 |333|\n',
  });
}

for (let i = 0; i < 10; i++) {
  const obj = {
    id: i,
    author: user[i % 10],
    href: 'https://ant.design',
    title: titles[i % 8],
    avatar: avatars[i % 8],
    description:
      'Ant Design, a design language for background applications, is refined by Ant UED Team.',
    content:
      'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
    like: Math.ceil(Math.random() * 100) + 100,
    disLike: Math.ceil(Math.random() * 100) + 10,
    message: Math.ceil(Math.random() * 10) + 10,
  };
  article_viewer_comment.push({
    author: '天呆',
    avatar: 'https://joeschmoe.io/api/v1/random',
    userId: '001',
    type: 'comment',
    replyUserId: '',
    replayUserName: '',
    content:
      'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully andefficiently.',
  });
  topic_info.push(obj);
  topic_info_comment.push(obj);
  owners.push({
    id: i,
    name: random.cname(),
  });
  home_public_data.push({
    avatar: avatars[i % 8],
    title: `OnePiece社区Version0.0.${i}版本发布`,
    titleHref: 'https://ant.design',
    time: '2022-02-01',
    desc: '该版本目前正处于测试阶段，前端页面多数正处于开发过程中，尚未接入后端接口。',
  });
  home_good_author_list.push({
    avatar: avatars[i % 8],
    name: user[i % 10],
    href: 'https://ant.design',
    desc: '2022年CSDN博客之星TOP8，CSDN博客专家，Java领域优质创作者，阿里巴巴全栈开发工程师。',
  });
  home_follow_data.push({
    id: `trend-${i}`,
    updatedAt: new Date(),
    user: {
      name: user[i % 10],
      avatar: avatars[i % 8],
    },
    group: {
      name: '高逼格设计天团',
      link: 'http://github.com/',
    },
    project: {
      name: '六月迭代',
      link: 'http://github.com/',
    },
    template: '在 @{group} 新建项目 @{project}',
  });
}

article_viewer_info.push({
  author: '天天发呆的程序员',
  time: '2021-10-24 10:24:00',
  classify: '后端',
  tags: ['Java', 'JavaScript', 'React'],
  readNum: 56,
  collectNum: 8,
  starNum: 2223,
});

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
  rank: 6,
});

//结尾的输出
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
    topic_info_comment,
    Read_list,
    article_viewer_comment,
    article_viewer_content,
    article_viewer_info,
    home_public_data,
    home_follow_data,
    home_user_data,
    home_good_author_list,
    home_recommend_list,
    home_new_list,
    home_news_list,
    home_hot_list,
  };
};
