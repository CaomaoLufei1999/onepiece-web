import React, {Fragment, useState} from 'react';
import ProList from "@ant-design/pro-list/src";
import { Tag, Space } from 'antd';

const defaultData = [
  {
    id: '1',
    name: '天天发呆的程序员',
    image: 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
    desc: '感谢您的文章分享！',
    state: ["fans","1"],
    date: "2022-04-16 10:24",
  },
  {
    id: '2',
    name: 'Ant Design',
    image: 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
    desc: '感谢您的文章分享',
    state: ["fans","2"],
    date: "2022-04-16 10:24",
  },
  {
    id: '3',
    name: '蚂蚁金服体验科技',
    image: 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
    desc: '感谢您的文章分享',
    state: ["not_fans","3"],
    date: "2022-04-16 10:24",
  },
  {
    id: '4',
    name: 'TechUI',
    image: 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
    desc: '感谢您的文章分享',
    state: ["fans","4"],
    date: "2022-04-16 10:24",
  },
];
const Comment = () => {

  const [dataSource, setDataSource] = useState(defaultData);
  return(
    <Fragment>
      <ProList rowKey="id" headerTitle="" dataSource={dataSource} showActions="hover" editable={{
        onSave: async (key, record, originRow) => {
          console.log(key, record, originRow);
          return true;
        },
      }} onDataSourceChange={setDataSource} metas={{
        title: {
          dataIndex: 'name',
          editable: false,
        },
        avatar: {
          dataIndex: 'image',
          editable: false,
        },
        description: {
          dataIndex: 'desc',
          editable: false,
        },
        extra:{
          dataIndex: 'date',
          editable: false,
        },
        subTitle: {
          dataIndex:"state",
          editable: false,
          render: (state) => {
            return (<Space size={0}>
              {state[0] === "fans" ? <Tag color="red">粉丝</Tag> :""}
              {state[1] === "1" ? <small>回复了你的评论</small> :""}
              {state[1] === "2" ? <small>评论了你的文章</small> :""}
              {state[1] === "3" ? <small>评论了你的动态</small> :""}
              {state[1] === "4" ? <small>其他评论</small> :""}
            </Space>);
          },
        },
        actions: {
          render: (text, row, index, action) => [
            <a onClick={() => {
              action === null || action === void 0 ? void 0 : action.startEditable(row.id);
            }} key="link">
              删除
            </a>,
          ],
        },
      }}/>
    </Fragment>
  );
}

export default Comment;
