import {Card, Space, Table, Tag} from "antd";
import {color} from "mockjs/src/mock/random/color";

const CommitInfo = () => {
  const columns = [
    {
      title: '提交结果',
      dataIndex: 'name',
      key: 'name',
      render: tags => (
        <>
          {tags.map(tag => {
            let color = 'green';
            if (tag === 'error') {
              color = 'red';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: '执行耗时',
      dataIndex: 'time_consuming',
      key: 'time_consuming',
      render: time_consuming => {
        let color = 'green';
        if (time_consuming === 'N/A') {
          color = 'red';
        }
        return(
          <span style={{color: color}}>{time_consuming}</span>
        );
      }
    },
    {
      title: '语言',
      dataIndex: 'language',
      key: 'language',
      render: language => (
        <>
          <span>{language}</span>
        </>
      ),
    },
    {
      title: '提交时间',
      key: 'commit_time',
      dataIndex: 'commit_time',
      render: time => (
        <>
          <span style={{color: "gray"}}>{time}</span>
        </>
      ),
    },
  ];

  const data = [
    {
      key: '1',
      name: ['success'],
      time_consuming: '32ms',
      language: 'Java',
      commit_time: '2022-04-10 01:42:33',
    },
    {
      key: '2',
      name: ['error'],
      time_consuming: 'N/A',
      language: 'Java',
      commit_time: '2022-04-10 01:42:33',
    },
    {
      key: '3',
      name: ['error'],
      time_consuming: 'N/A',
      language: 'Java',
      commit_time: '2022-04-10 01:42:33',
    },
  ];
  return (
    <Card
      title={
        <strong>提交记录</strong>
      }
    >
      <Table columns={columns} dataSource={data}/>
    </Card>
  );
}

export default CommitInfo;
