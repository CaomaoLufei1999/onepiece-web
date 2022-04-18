import {Card, Button, Tag, Space, Menu, Dropdown} from 'antd';
import ProList from '@ant-design/pro-list';
import request from 'umi-request';
import EditOutlined from "@ant-design/icons/EditOutlined";
import {SortAscendingOutlined} from "@ant-design/icons";

const SolutionInfo = () => {
  const menu = (
    <Menu>
      <Menu.Item>
        <span>
          默认排序
        </span>
      </Menu.Item>
      <Menu.Item>
        <span>
          最新发布
        </span>
      </Menu.Item>
      <Menu.Item>
        <span>
          最多阅读
        </span>
      </Menu.Item>
    </Menu>
  );

  return (
    <Card
      title={<strong>题解</strong>}
    >
      <ProList toolBarRender={() => {
        return [
          <Dropdown overlay={menu} placement="bottomLeft" arrow={{pointAtCenter: true}}>
            <Button>
              <SortAscendingOutlined/>排序
            </Button>
          </Dropdown>,
          <Button key="3" type="primary">
            <EditOutlined/>写题解
          </Button>,
        ];
      }} search={{}} rowKey="name" headerTitle="题解列表"
               request={async (params = {}) =>
                 request('https://proapi.azurewebsites.net/github/issues', {
                   params,
                 })} pagination={{
        pageSize: 5,
      }} showActions="hover" metas={{
        title: {
          dataIndex: 'user',
          title: '搜索',
        },
        avatar: {
          dataIndex: 'avatar',
          search: false,
        },
        description: {
          dataIndex: 'title',
          search: false,
        },
        subTitle: {
          dataIndex: 'labels',
          render: (_, row) => {
            var _a;
            return (
              <Space size={0}>
                {(_a = row.labels) === null || _a === void 0 ? void 0 : _a.map((label) => (
                  <Tag color="blue" key={label.name}>
                    {/*{label.name}*/}
                    {"动态规划"}
                  </Tag>))}
              </Space>
            );
          },
          search: false,
        },
        actions: {
          render: (text, row) => [
            <a href={row.url} target="_blank" rel="noopener noreferrer" key="warning">
              点赞
            </a>,
            <a href={row.url} target="_blank" rel="noopener noreferrer" key="view">
              查看
            </a>,
          ],
          search: false,
        },
        status: {
          // 自己扩展的字段，主要用于筛选，不在列表中显示
          title: '分类',
          valueType: 'select',
          valueEnum: {
            all: {text: '全部', status: 'Default'},
            open: {
              text: '动态规划',
              status: 'Error',
            },
            closed: {
              text: '回溯',
              status: 'Success',
            },
            processing: {
              text: '二叉树',
              status: 'Processing',
            },
            tu: {
              text: '图',
              status: 'xx',
            },
          },
        },
      }}/>
    </Card>
  );
}

export default SolutionInfo;
