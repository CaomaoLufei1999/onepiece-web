import {
  DownloadOutlined,
  EditOutlined,
  EllipsisOutlined, LikeOutlined, MessageOutlined,
  ShareAltOutlined, SortAscendingOutlined, StarOutlined,
} from '@ant-design/icons';
import { useRequest } from 'umi';
import {Avatar, Button, Card, Dropdown, List, Menu, Tag, Tooltip} from 'antd';
import React from 'react';
import numeral from 'numeral';
import { queryFakeList } from '../../service';
import stylesApplications from './index.less';
import ProList from "@ant-design/pro-list/src";

const RecentPublish = () => {
  const IconText = ({icon, text}) => (<span>
    {React.createElement(icon, {style: {marginRight: 8}})}
    {text}
  </span>);
  const dataSource = [
    {
      title: '语雀的天空',
    },
    {
      title: 'Ant Design',
    },
    {
      title: '蚂蚁金服体验科技',
    },
    {
      title: 'TechUI',
    },
  ];
  // // 获取tab列表数据
  // const { data: listData } = useRequest(() => {
  //   return queryFakeList({
  //     count: 30,
  //   });
  // });
  return (<ProList toolBarRender={() => {
    return [
      <Button key="3" type="primary">
        <SortAscendingOutlined/> 按发布时间排序
      </Button>,
      <Button key="3" type="primary">
        <SortAscendingOutlined/> 按访问量排序
      </Button>,
    ];
  }} itemLayout="vertical" rowKey="id" headerTitle={
    "创作历程"
  } dataSource={dataSource} metas={{
    title: {},
    description: {
      render: () => (<>
        <Tag>语雀专栏</Tag>
        <Tag>设计语言</Tag>
        <Tag>蚂蚁金服</Tag>
      </>),
    },
    actions: {
      render: () => [
        <IconText icon={StarOutlined} text="156" key="list-vertical-star-o"/>,
        <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o"/>,
        <IconText icon={MessageOutlined} text="2" key="list-vertical-message"/>,
      ],
    },
    // extra: {
    //   render: () => (<img width={272} alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"/>),
    // },
    content: {
      render: () => {
        return (<div>
          段落示意：蚂蚁金服设计平台
          design.alipay.com，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台
          design.alipay.com，用最小的工作量，无缝接入蚂蚁金服生态提供跨越设计与开发的体验解决方案。
        </div>);
      },
    },
  }}/>);
};

export default RecentPublish;
