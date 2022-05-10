// 使用 Mock
const Mock = require('mockjs');

var random = Mock.Random;

let rank_data_author = [];
let rank_data_blog = [];
let rank_data_domain = [];
let rank_data_point = [];
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
  rank_data_point.push({
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
module.exports = () => {
  return { rank_data_author, rank_data_blog, rank_data_domain, rank_data_point, rank_data_solve };
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
