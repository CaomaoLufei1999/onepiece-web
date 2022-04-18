import React, {Fragment, useState} from 'react';
import { Button, Badge, Tooltip } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { LightFilter, ProFormDatePicker } from '@ant-design/pro-form';
import ProTable from '@ant-design/pro-table';

const valueEnum = {
  0: 'close',
  1: 'running',
  2: 'online',
  3: 'error',
};
const tableListDataSource = [];
for (let i = 0; i < 5; i += 1) {
  tableListDataSource.push({
    key: i,
    name: 'Java编程思想学习笔记',
    containers: Math.floor(Math.random() * 20),
    status: valueEnum[Math.floor(Math.random() * 10) % 4],
    createdAt: Date.now() - Math.floor(Math.random() * 2000),
  });
}
const columns = [
  {
    title: '博客名称',
    dataIndex: 'name',
    render: (_) => <a>{_}</a>,
  },
  {
    title: '状态',
    dataIndex: 'status',
    initialValue: 'all',
    filters: true,
    onFilter: true,
    valueEnum: {
      all: { text: '全部', status: 'Default' },
      close: { text: '待发布', status: 'Default' },
      running: { text: '发布中', status: 'Processing' },
      online: { text: '发布成功', status: 'Success' },
      error: { text: '发布失败', status: 'Error' },
    },
  },
  {
    title: (<>
      时间
      <Tooltip placement="top" title="这是一段描述">
        <QuestionCircleOutlined style={{ marginLeft: 4 }}/>
      </Tooltip>
    </>),
    width: 140,
    key: 'since',
    dataIndex: 'createdAt',
    valueType: 'date',
    sorter: (a, b) => a.createdAt - b.createdAt,
  },
];
const renderBadge = (count, active = false) => {
  return (<Badge count={count} style={{
    marginTop: -2,
    marginLeft: 4,
    color: active ? '#1890FF' : '#999',
    backgroundColor: active ? '#E6F7FF' : '#eee',
  }}/>);
};
const SystemNotification = () => {
  const [activeKey, setActiveKey] = useState('tab1');
  return(
    <Fragment>
      <ProTable columns={columns} request={(params, sorter, filter) => {
        // 表单搜索项会从 params 传入，传递给后端接口。
        console.log(params, sorter, filter);
        return Promise.resolve({
          data: tableListDataSource,
          success: true,
        });
      }} toolbar={{
        filter: (<LightFilter>
          <ProFormDatePicker name="startdate" label="日期"/>
        </LightFilter>),
        menu: {
          type: 'tab',
          activeKey: activeKey,
          items: [
            {
              key: 'tab1',
              label: <span>博客通知{renderBadge(99, activeKey === 'tab1')}</span>,
            },
            {
              key: 'tab2',
              label: <span>系统通知{renderBadge(30, activeKey === 'tab2')}</span>,
            },
          ],
          onChange: (key) => {
            setActiveKey(key);
          },
        },
      }} rowKey="key" pagination={{
        showQuickJumper: true,
      }} search={false} dateFormatter="string" options={{
        setting: {
          draggable: true,
          checkable: true,
          checkedReset: false,
          extra: [<a key="confirm">确认</a>],
        },
      }}/>
    </Fragment>
  );
}

export default SystemNotification;
