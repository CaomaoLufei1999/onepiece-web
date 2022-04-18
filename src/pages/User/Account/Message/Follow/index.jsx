import React, {Fragment, useState} from 'react';
import ProList from "@ant-design/pro-list/src";
import {Tag, Space, Button,Radio } from 'antd';

const defaultData = [
  {
    id: '1',
    name: '天天发呆的程序员',
    image: 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
    desc: '10分钟前通过博文 "《XXXXX》" 关注了你',
    state: ["fans", "1"],
    date: "2022-04-16 10:24",
  },
  {
    id: '2',
    name: 'Ant Design',
    image: 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
    desc: '10分钟前通过博文 "《XXXXX》" 关注了你',
    state: ["fans", "2"],
    date: "2022-04-16 10:24",
  },
  {
    id: '3',
    name: '蚂蚁金服体验科技',
    image: 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
    desc: '10分钟前通过博文 "《XXXXX》" 关注了你',
    state: ["not_fans", "3"],
    date: "2022-04-16 10:24",
  },
  {
    id: '4',
    name: 'TechUI',
    image: 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
    desc: '10分钟前通过博文 "《XXXXX》" 关注了你',
    state: ["fans", "4"],
    date: "2022-04-16 10:24",
  },
];
const Follow = () => {
  const [dataSource, setDataSource] = useState(defaultData);
  return (
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
        extra: {
          editable: false,
          render: (state) => {
            return (<Space size={0}>
              <Button  type={"default"} shape={"round"}>关 注</Button>
            </Space>);
          },
        },
        // actions: {
        //   render: (text, row, index, action) => [
        //     <a onClick={() => {
        //       action === null || action === void 0 ? void 0 : action.startEditable(row.id);
        //     }} key="link">
        //       删除
        //     </a>,
        //   ],
        // },
      }}/>
    </Fragment>
  );
}

export default Follow;
