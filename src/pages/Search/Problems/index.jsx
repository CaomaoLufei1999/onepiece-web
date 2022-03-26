import {Card, Space, Table, Tag} from 'antd';
import {CheckCircleTwoTone, CloseCircleOutlined, CloseCircleTwoTone, QuestionCircleTwoTone} from "@ant-design/icons";

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
    render: text => <a>{text}</a>,
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
    render: tags => (
      <>
        {
          tags.map(tag => {
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
          })
        }
      </>
    ),
  },
  {
    title: '状态',
    key: 'resolve_state',
    dataIndex: 'resolve_state',
    render: states => (
      <>
        {
          states.map(state => {
            let stateName;
            if (state === 'pass') {
              stateName = '通过';
              return (
                <div key={state}>
                  <Space size="middle">
                    <CheckCircleTwoTone twoToneColor="#52c41a"/>
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
                    <QuestionCircleTwoTone twoToneColor="#cc5500"/>
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
                    <CloseCircleTwoTone twoToneColor="#fe0202"/>
                    <a>{stateName}</a>
                  </Space>
                </div>
              )
                ;
            }
          })
        }
      </>
    ),
  },
];

const data = [
  {
    key: '1',
    number: 1,
    title: '多重背包问题 I',
    resolve_count: '223',
    level: ['easy'],
    resolve_state: ['pass'],
  },
  {
    key: '2',
    number: 8,
    title: '多重背包问题 II',
    resolve_count: '12',
    level: ['hard'],
    resolve_state: ['pass'],
  },
  {
    key: '3',
    number: 10,
    title: '多重背包问题 III',
    resolve_count: '0',
    level: ['hard'],
    resolve_state: ['un_pass'],
  },
  {
    key: '4',
    number: 101,
    title: '多重背包问题 III',
    resolve_count: '0',
    level: ['mid'],
    resolve_state: ['un_pass'],
  },
  {
    key: '5',
    number: 103,
    title: '多重背包问题 III',
    resolve_count: '99',
    level: ['mid'],
    resolve_state: ['un_resolve'],
  },
  {
    key: '6',
    number: 77,
    title: '多重背包问题 I',
    resolve_count: '223',
    level: ['easy'],
    resolve_state: ['pass'],
  },
  {
    key: '7',
    number: 88,
    title: '多重背包问题 II',
    resolve_count: '12',
    level: ['hard'],
    resolve_state: ['pass'],
  },
  {
    key: '8',
    number: 32,
    title: '多重背包问题 III',
    resolve_count: '0',
    level: ['hard'],
    resolve_state: ['un_pass'],
  },
  {
    key: '9',
    number: 102,
    title: '多重背包问题 III',
    resolve_count: '0',
    level: ['mid'],
    resolve_state: ['un_pass'],
  },
  {
    key: '10',
    number: 113,
    title: '多重背包问题 III',
    resolve_count: '99',
    level: ['mid'],
    resolve_state: ['un_resolve'],
  },
];


const SearchProblems = () => {
  return (
    <Card bordered={false}>
      <Table
        columns={columns} dataSource={data}
      />
    </Card>
  );
};

export default SearchProblems;
