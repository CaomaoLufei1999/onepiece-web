import { PageContainer } from '@ant-design/pro-layout';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import ProCard, { StatisticCard } from '@ant-design/pro-card';
import {
  Button,
  DatePicker,
  Divider,
  Drawer,
  Dropdown,
  Menu,
  Space,
  Table,
  Tabs,
  Tag,
  Radio,
  Row,
  Col,
  Avatar,
  Comment,
  Form,
  Input,
  Alert,
} from 'antd';
import React, { useRef, useState } from 'react';
import { Line } from '@ant-design/charts';
import request from 'umi-request';
import './_mock';
import {
  AccountBookOutlined,
  ApartmentOutlined,
  BarChartOutlined,
  DatabaseOutlined,
  DownloadOutlined,
  DownOutlined,
  EllipsisOutlined,
  EyeOutlined,
  FieldNumberOutlined,
  HighlightOutlined,
  HourglassOutlined,
  LikeOutlined,
  LineChartOutlined,
  MessageOutlined,
  PlusOutlined,
  QuestionCircleOutlined,
  RedEnvelopeOutlined,
  StarOutlined,
  TagsOutlined,
  TeamOutlined,
  UsergroupAddOutlined,
} from '@ant-design/icons';
import ProList from '@ant-design/pro-list/src';
import { Link } from 'umi';

const { TextArea } = Input;
const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <>
    <Form.Item>
      <TextArea rows={8} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
        一键群发
      </Button>
    </Form.Item>
  </>
);
const dashangColumns = [
  {
    title: '用户名称',
    dataIndex: 'name',
    key: 'name',
    render: (text) => (
      <a>
        <Avatar
          src={'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png'}
        ></Avatar>{' '}
        {text}
      </a>
    ),
  },
  {
    title: '打赏文章',
    dataIndex: 'article',
    key: 'article',
    render: (text) => <a>{text}</a>,
  },
  {
    title: '打赏金额(元)',
    dataIndex: 'money',
    key: 'money',
  },
  {
    title: '打赏时间',
    dataIndex: 'date',
    key: 'date',
  },
];

const dashangData = [
  {
    key: '1',
    name: '兴趣使然的草帽路飞',
    article: 'CSDN2021年度总结——10万粉丝收获',
    money: 5,
    date: '2022-01-01 15:24:00',
  },
  {
    key: '2',
    name: '兴趣使然的草帽路飞',
    article: 'CSDN2021年度总结——10万粉丝收获',
    money: 5,
    date: '2022-01-01 15:24:00',
  },
  {
    key: '3',
    name: '兴趣使然的草帽路飞',
    article: 'CSDN2021年度总结——10万粉丝收获',
    money: 5,
    date: '2022-01-01 15:24:00',
  },
];
const optionsWithDisabled = [
  { label: '近7天', value: '7' },
  { label: '近30天', value: '30' },
];
let value4 = 7;
const onChange4 = (value) => {
  value4 = value;
};
const { RangePicker } = DatePicker;
const tableColumns = [
  {
    title: '日期',
    dataIndex: 'date',
    filters: [
      {
        text: 'Joe',
        value: 'Joe',
      },
      {
        text: 'Category 1',
        value: 'Category 1',
      },
      {
        text: 'Category 2',
        value: 'Category 2',
      },
    ],
    filterMode: 'tree',
    filterSearch: true,
    onFilter: (value, record) => record.address.startsWith(value),
    width: '30%',
  },
  {
    title: '阅读量',
    dataIndex: 'view',
    sorter: (a, b) => a.view - b.view,
  },
  {
    title: '点赞量',
    dataIndex: 'like',
    sorter: (a, b) => a.like - b.like,
  },
  {
    title: '收藏量',
    dataIndex: 'star',
    sorter: (a, b) => a.star - b.star,
  },
];

const tableData = [
  {
    key: '1',
    date: '2022-05-04',
    view: 132,
    like: 2,
    star: 3,
  },
  {
    key: '2',
    date: '2022-05-05',
    view: 132,
    like: 2,
    star: 3,
  },
  {
    key: '3',
    date: '2022-05-06',
    view: 132,
    like: 2,
    star: 3,
  },
  {
    key: '4',
    date: '2022-05-07',
    view: 132,
    like: 2,
    star: 3,
  },
  {
    key: '5',
    date: '2022-05-08',
    view: 132,
    like: 2,
    star: 3,
  },
  {
    key: '6',
    date: '2022-05-09',
    view: 132,
    like: 32,
    star: 33,
  },
];

function onTableChange(pagination, filters, sorter, extra) {
  console.log('params', pagination, filters, sorter, extra);
}

// 折线图数据
const data = [
  { date: '2022-04-01', type: '阅读量', value: 30 },
  { date: '2022-04-02', type: '阅读量', value: 40 },
  { date: '2022-04-03', type: '阅读量', value: 35 },
  { date: '2022-04-04', type: '阅读量', value: 50 },
  { date: '2022-04-05', type: '阅读量', value: 99 },
  { date: '2022-04-06', type: '阅读量', value: 60 },
  { date: '2022-04-07', type: '阅读量', value: 70 },

  { date: '2022-04-01', type: '评论数', value: 1 },
  { date: '2022-04-02', type: '评论数', value: 4 },
  { date: '2022-04-03', type: '评论数', value: 2 },
  { date: '2022-04-04', type: '评论数', value: 5 },
  { date: '2022-04-05', type: '评论数', value: 4 },
  { date: '2022-04-06', type: '评论数', value: 6 },
  { date: '2022-04-07', type: '评论数', value: 7 },

  { date: '2022-04-01', type: '点赞数', value: 11 },
  { date: '2022-04-02', type: '点赞数', value: 14 },
  { date: '2022-04-03', type: '点赞数', value: 12 },
  { date: '2022-04-04', type: '点赞数', value: 5 },
  { date: '2022-04-05', type: '点赞数', value: 14 },
  { date: '2022-04-06', type: '点赞数', value: 6 },
  { date: '2022-04-07', type: '点赞数', value: 17 },

  { date: '2022-04-01', type: '收藏数', value: 1 },
  { date: '2022-04-02', type: '收藏数', value: 2 },
  { date: '2022-04-03', type: '收藏数', value: 3 },
  { date: '2022-04-04', type: '收藏数', value: 5 },
  { date: '2022-04-05', type: '收藏数', value: 15 },
  { date: '2022-04-06', type: '收藏数', value: 6 },
  { date: '2022-04-07', type: '收藏数', value: 24 },
];
const config = {
  data,
  autoFit: true,
  // forceFit:true,
  xField: 'date',
  yField: 'value',
  smooth: true,
  label: {
    // layout: [
    //   {
    //     type: 'hide-overlap',
    //   },
    // ],
    // // 隐藏重叠label
    // style: {
    //   textAlign: 'right',
    // },
    // formatter: (item) => item.value,
  },
  seriesField: 'type',
  xAxis: {
    type: 'time',
    label: {
      // rotate: Math.PI / 6,
      // offset: 10,
      // style: {
      //   fill: '#aaa',
      //   fontSize: 12,
      // },
      // formatter: (name) => name,
    },
  },
  yAxis: {
    label: {
      // rotate: Math.PI / 6,
      // offset: 10,
      // style: {
      //   fill: '#aaa',
      //   fontSize: 12,
      // },
      formatter: (v) => `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`),
    },
  },
  // meta: {
  //   value: {
  //     alias: '新增访问量',
  //   },
  // },
  // tooltip: {
  //   fields: ['x', 'y'],
  // },
  point: {
    size: 5,
    shape: 'diamond',
  },
};

const ContentManage = () => {
  const actionRef = useRef();
  const [responsive, setResponsive] = useState(false);
  const { TabPane } = Tabs;
  const [visible, setVisible] = useState(false);
  const [size, setSize] = useState();

  const columns = [
    {
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: '文章标题',
      dataIndex: 'title',
      copyable: true,
      ellipsis: true,
      tip: '标题过长会自动收缩',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此项为必填项',
          },
        ],
      },
    },
    {
      disable: true,
      title: '状态（草稿、已发布、待发布）',
      dataIndex: 'state',
      filters: true,
      onFilter: true,
      valueType: 'select',
      valueEnum: {
        all: { text: '全部', status: 'Default' },
        open: {
          text: '草稿箱',
          status: 'Error',
        },
        closed: {
          text: '已发布',
          status: 'Success',
          disabled: true,
        },
        processing: {
          text: '待发布',
          status: 'Processing',
        },
      },
    },
    {
      disable: true,
      title: '标签(原创、非原创)',
      dataIndex: 'labels',
      search: false,
      renderFormItem: (_, { defaultRender }) => {
        return defaultRender(_);
      },
      render: (_, record) => (
        <Space>
          {record.labels.map(({ name, color }) => (
            <Tag color={color} key={name}>
              {name}
            </Tag>
          ))}
        </Space>
      ),
    },
    {
      title: '创建时间',
      key: 'showTime',
      dataIndex: 'created_at',
      valueType: 'dateTime',
      sorter: true,
      hideInSearch: true,
    },
    {
      title: '创建时间',
      dataIndex: 'created_at',
      valueType: 'dateRange',
      hideInTable: true,
      search: {
        transform: (value) => {
          return {
            startTime: value[0],
            endTime: value[1],
          };
        },
      },
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      render: (text, record, _, action) => [
        <a
          key="editable"
          onClick={() => {
            var _a;
            (_a = action === null || action === void 0 ? void 0 : action.startEditable) === null ||
            _a === void 0
              ? void 0
              : _a.call(action, record.id);
          }}
        >
          编辑
        </a>,
        <a href={record.url} target="_blank" rel="noopener noreferrer" key="view">
          预览
        </a>,
        <Dropdown overlay={menu}>
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              ...
              <DownOutlined />
            </Space>
          </a>
        </Dropdown>,
      ],
    },
  ];
  const showLargeDrawer = () => {
    setSize('large');
    setVisible(true);
  };

  const menu = (
    <Menu>
      <Menu.Item key="1" onClick={showLargeDrawer}>
        查看数据
      </Menu.Item>
      <Menu.Item key="2">置顶/取消置顶</Menu.Item>
      <Menu.Item key="3">删除</Menu.Item>
    </Menu>
  );

  const onClose = () => {
    setVisible(false);
  };

  function callback(key) {
    console.log(key);
  }

  return (
    <PageContainer
      header={{
        title: '内容管理',
        ghost: true,
      }}
    >
      <ProCard hoverable bordered>
        <Tabs defaultActiveKey="1" onChange={callback} tabPosition={'left'} style={{ height: 800 }}>
          <TabPane
            tab={
              <span>
                <DatabaseOutlined />
                文章管理
              </span>
            }
            key="1"
          >
            <ProTable
              columns={columns}
              actionRef={actionRef}
              cardBordered
              request={async (params = {}, sort, filter) => {
                console.log(sort, filter);
                return request('https://proapi.azurewebsites.net/github/issues', {
                  params,
                });
              }}
              editable={{
                type: 'multiple',
              }}
              columnsState={{
                persistenceKey: 'pro-table-singe-demos',
                persistenceType: 'localStorage',
                onChange(value) {
                  console.log('value: ', value);
                },
              }}
              rowKey="id"
              search={{
                labelWidth: 'auto',
              }}
              form={{
                // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
                syncToUrl: (values, type) => {
                  if (type === 'get') {
                    return Object.assign(Object.assign({}, values), {
                      created_at: [values.startTime, values.endTime],
                    });
                  }
                  return values;
                },
              }}
              pagination={{
                pageSize: 10,
                onChange: (page) => console.log(page),
              }}
              dateFormatter="string"
              headerTitle="文章列表"
              toolBarRender={() => [
                <Link to="/account/write-blog">
                  <Button key="button" icon={<PlusOutlined />} type="primary">
                    发布新文章
                  </Button>
                </Link>,
              ]}
            />
          </TabPane>
          <TabPane
            tab={
              <span>
                <BarChartOutlined />
                作品数据
              </span>
            }
            key="4"
          >
            博客数据统计
            <Row style={{ marginTop: 15 }}>
              <Col span={24} lg={24} md={24}>
                <StatisticCard.Group title="" direction={responsive ? 'column' : 'row'}>
                  <StatisticCard
                    bordered={true}
                    statistic={{
                      title: (
                        <span>
                          <EyeOutlined /> 总阅读量
                        </span>
                      ),
                      tip: '访问总数',
                      value: 799,
                      // precision: 2,
                    }}
                  />
                  <Divider type={responsive ? 'horizontal' : 'vertical'} />
                  <StatisticCard
                    bordered={true}
                    statistic={{
                      title: (
                        <span>
                          <MessageOutlined /> 总评论量
                        </span>
                      ),
                      tip: '评论总数',
                      value: 15,
                      // precision: 2,
                    }}
                  />
                  <Divider type={responsive ? 'horizontal' : 'vertical'} />
                  <StatisticCard
                    bordered={true}
                    statistic={{
                      title: (
                        <span>
                          <LikeOutlined /> 总点赞量
                        </span>
                      ),
                      tip: '点赞总数',
                      value: 19,
                      // precision: 2,
                    }}
                  />
                  <Divider type={responsive ? 'horizontal' : 'vertical'} />
                  <StatisticCard
                    bordered={true}
                    statistic={{
                      title: (
                        <span>
                          <StarOutlined /> 总收藏量
                        </span>
                      ),
                      tip: '收藏总数',
                      value: 29,
                      // precision: 2,
                    }}
                  />
                </StatisticCard.Group>
              </Col>
            </Row>
            <Row style={{ marginTop: 15 }}>
              <Col span={24} lg={24} md={24}>
                <StatisticCard.Group title="" direction={responsive ? 'column' : 'row'}>
                  <StatisticCard
                    bordered={true}
                    statistic={{
                      title: (
                        <span>
                          <HourglassOutlined /> 解题数量
                        </span>
                      ),
                      tip: '解题数量',
                      value: 799,
                      // precision: 2,
                    }}
                  />
                  <Divider type={responsive ? 'horizontal' : 'vertical'} />
                  <StatisticCard
                    bordered={true}
                    statistic={{
                      title: (
                        <span>
                          <FieldNumberOutlined /> 积分排名
                        </span>
                      ),
                      tip: '积分排名',
                      value: 15,
                      // precision: 2,
                    }}
                  />
                  <Divider type={responsive ? 'horizontal' : 'vertical'} />
                  <StatisticCard
                    bordered={true}
                    statistic={{
                      title: (
                        <span>
                          <UsergroupAddOutlined /> 粉丝数量
                        </span>
                      ),
                      tip: '粉丝数量',
                      value: 19,
                      // precision: 2,
                    }}
                  />
                  <Divider type={responsive ? 'horizontal' : 'vertical'} />
                  <StatisticCard
                    bordered={true}
                    statistic={{
                      title: (
                        <span>
                          <HighlightOutlined /> 文章总数
                        </span>
                      ),
                      tip: '文章总数',
                      value: 29,
                      // precision: 2,
                    }}
                  />
                </StatisticCard.Group>
              </Col>
            </Row>
            <Row style={{ marginTop: 15 }}>
              <Col span={24} lg={24} md={24}>
                趋势图：
                <Radio.Group
                  options={optionsWithDisabled}
                  onChange={onChange4}
                  value={value4}
                  optionType="button"
                  buttonStyle="solid"
                  style={{ marginRight: 15 }}
                />
                <RangePicker picker="day" style={{ marginRight: 15 }} />
                <a>
                  <DownloadOutlined /> 数据明细下载
                </a>
              </Col>
            </Row>
            <Row style={{ marginTop: 15, height: 450 }}>
              <Col span={24} lg={24} md={24}>
                <Line {...config} />
              </Col>
            </Row>
          </TabPane>
          <TabPane
            tab={
              <span>
                <RedEnvelopeOutlined />
                博文打赏
              </span>
            }
            key="5"
          >
            博文打赏信息
            <Table
              columns={dashangColumns}
              dataSource={dashangData}
              style={{ marginTop: 15 }}
            ></Table>
          </TabPane>
          <TabPane
            tab={
              <span>
                <LineChartOutlined />
                粉丝数据
              </span>
            }
            key="6"
          >
            <ProList
              toolBarRender={() => {
                return [
                  <Button key="3" type="primary">
                    粉丝画像查看Model
                  </Button>,
                ];
              }}
              search={{}}
              rowKey="name"
              headerTitle="粉丝列表"
              request={async (params = {}) =>
                request('https://proapi.azurewebsites.net/github/issues', {
                  params,
                })
              }
              pagination={{
                pageSize: 10,
              }}
              showActions="hover"
              metas={{
                title: {
                  dataIndex: 'user',
                  title: '用户',
                },
                avatar: {
                  dataIndex: 'avatar',
                  search: false,
                },

                subTitle: {
                  dataIndex: 'labels',
                  render: (_, row) => {
                    var _a;
                    return (
                      <Space size={0}>
                        {(_a = row.labels) === null || _a === void 0
                          ? void 0
                          : _a.map((label) => (
                              <Tag color="blue" key={label.name}>
                                {label.name}
                              </Tag>
                            ))}
                      </Space>
                    );
                  },
                  search: false,
                },
                actions: {
                  render: (text, row) => [
                    <a href={row.url} target="_blank" rel="noopener noreferrer" key="link">
                      链路
                    </a>,
                    <a href={row.url} target="_blank" rel="noopener noreferrer" key="warning">
                      报警
                    </a>,
                    <a href={row.url} target="_blank" rel="noopener noreferrer" key="view">
                      查看
                    </a>,
                  ],
                  search: false,
                },
                status: {
                  // 自己扩展的字段，主要用于筛选，不在列表中显示
                  title: '状态',
                  valueType: 'select',
                  valueEnum: {
                    all: { text: '全部', status: 'Default' },
                    open: {
                      text: '未解决',
                      status: 'Error',
                    },
                    closed: {
                      text: '已解决',
                      status: 'Success',
                    },
                    processing: {
                      text: '解决中',
                      status: 'Processing',
                    },
                  },
                },
              }}
            />
          </TabPane>
          <TabPane
            tab={
              <span>
                <ApartmentOutlined />
                粉丝服务
              </span>
            }
            key="7"
          >
            粉丝服务
            <Comment
              avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />}
              content={
                <Editor
                // onChange={this.handleChange}
                // onSubmit={this.handleSubmit}
                // submitting={submitting}
                // value={value}
                />
              }
            />
            <Alert
              message={
                <span>
                  <QuestionCircleOutlined /> 群发功能提示
                </span>
              }
              description="为防止社区恶意消息群发，每人每周只能群发一次消息，且有字数限制，请珍惜群发次数！"
              type="warning"
              style={{ marginTop: 15 }}
            />
          </TabPane>
          <TabPane
            tab={
              <span>
                <TagsOutlined />
                兴趣标签管理
              </span>
            }
            key="2"
          >
            兴趣标签管理 TODO
          </TabPane>
          <TabPane
            tab={
              <span>
                <TeamOutlined />
                友情链接管理
              </span>
            }
            key="3"
          >
            友情链接管理 TODO
          </TabPane>
        </Tabs>
      </ProCard>

      <Drawer
        title={`CSDN年度总结——再见2021`}
        placement="right"
        size={size}
        onClose={onClose}
        visible={visible}
        extra={
          <Space>
            <small>2022-01-01 12:54:14</small>
            <Tag color={'red'}>原创</Tag>
          </Space>
        }
      >
        <p>发布至今总数据</p>
        <StatisticCard.Group title="" direction={responsive ? 'column' : 'row'}>
          <StatisticCard
            bordered={true}
            statistic={{
              title: (
                <span>
                  <EyeOutlined /> 阅读量
                </span>
              ),
              tip: '访问总数',
              value: 799,
              // precision: 2,
            }}
          />
          <Divider type={responsive ? 'horizontal' : 'vertical'} />
          <StatisticCard
            bordered={true}
            statistic={{
              title: (
                <span>
                  <MessageOutlined /> 评论量
                </span>
              ),
              tip: '评论总数',
              value: 15,
              // precision: 2,
            }}
          />
          <Divider type={responsive ? 'horizontal' : 'vertical'} />
          <StatisticCard
            bordered={true}
            statistic={{
              title: (
                <span>
                  <LikeOutlined /> 点赞量
                </span>
              ),
              tip: '点赞总数',
              value: 19,
              // precision: 2,
            }}
          />
          <Divider type={responsive ? 'horizontal' : 'vertical'} />
          <StatisticCard
            bordered={true}
            statistic={{
              title: (
                <span>
                  <StarOutlined /> 收藏量
                </span>
              ),
              tip: '收藏总数',
              value: 29,
              // precision: 2,
            }}
          />
        </StatisticCard.Group>
        <p style={{ marginTop: 25 }}>基础分析</p>
        <Line {...config} />

        <p style={{ marginTop: 25 }}>数据列表</p>
        <Radio.Group
          options={optionsWithDisabled}
          onChange={onChange4}
          value={value4}
          optionType="button"
          buttonStyle="solid"
          style={{ marginRight: 15 }}
        />
        <RangePicker picker="day" style={{ marginRight: 15 }} />
        <a>
          <DownloadOutlined /> 数据明细下载
        </a>

        <Table
          columns={tableColumns}
          dataSource={tableData}
          onChange={onTableChange}
          style={{ marginTop: 15 }}
          pagination={{
            current: 1,
            pageSize: 5,
          }}
        />
      </Drawer>
    </PageContainer>
  );
};

export default ContentManage;
