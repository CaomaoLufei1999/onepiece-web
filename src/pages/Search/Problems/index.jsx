import { Card, Space, Table, Tag } from 'antd';
import {
  CheckCircleTwoTone,
  CloseCircleOutlined,
  CloseCircleTwoTone,
  QuestionCircleTwoTone,
} from '@ant-design/icons';
import React, { useState, useEffect } from 'react';
const columns = [
  {
    title: '题号',
    dataIndex: 'number',
    key: 'number',
  },
  {
    title: '标题',
    dataIndex: 'title',
    key: 'title',
    render: (text) => <a>{text}</a>,
  },
  {
    title: '题解数量',
    dataIndex: 'resolve_count',
    key: 'resolve_count',
  },
  {
    title: '难度',
    key: 'level',
    dataIndex: 'level',
    render: (tags) => (
      <>
        {tags.map((tag) => {
          let color = 'green';
          let tagName = '简单';
          if (tag === 'hard') {
            color = 'red';
            tagName = '困难';
          }
          if (tag === 'mid') {
            color = 'yellow';
            tagName = '中等';
          }
          if (tag === 'easy') {
            color = 'green';
            tagName = '简单';
          }
          return (
            <Tag color={color} key={tag}>
              {tagName}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: '状态',
    key: 'resolve_state',
    dataIndex: 'resolve_state',
    render: (states) => (
      <>
        {states.map((state) => {
          let stateName;
          if (state === 'pass') {
            stateName = '通过';
            return (
              <div key={state}>
                <Space size="middle">
                  <CheckCircleTwoTone twoToneColor="#52c41a" />
                  <a>{stateName}</a>
                </Space>
              </div>
            );
          }

          if (state === 'un_resolve') {
            stateName = '未完成';
            return (
              <div key={state}>
                <Space size="middle">
                  <QuestionCircleTwoTone twoToneColor="#cc5500" />
                  <a>{stateName}</a>
                </Space>
              </div>
            );
          }

          if (state === 'un_pass') {
            stateName = '未通过';
            return (
              <div key={state}>
                <Space size="middle">
                  <CloseCircleTwoTone twoToneColor="#fe0202" />
                  <a>{stateName}</a>
                </Space>
              </div>
            );
          }
        })}
      </>
    ),
  },
];

const SearchProblems = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const loadData = () => {
    if (loading) {
      return;
    }
    setLoading(true);
    fetch(`http://localhost:3000/problem_list`)
      .then((res) => res.json())
      .then((body) => {
        setData([...body]);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    loadData();
  }, []);
  return (
    <Card bordered={false}>
      <Table columns={columns} dataSource={data} />
    </Card>
  );
};

export default SearchProblems;
