import { Card, List, Form, Table, Tag, Space, Select, Radio, Row, Col } from 'antd';
import {
  CheckCircleTwoTone,
  CloseCircleTwoTone,
  QuestionCircleTwoTone,
  CloseOutlined,
} from '@ant-design/icons';
import React, { useEffect, useState } from 'react';

const AlgorithmList = () => {
  const [level, setLevel] = useState('');
  const [status, setStatus] = useState('');
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState([]);
  const [filterArr, setFilterArr] = useState([]);
  const [exam, setExam] = useState([]);

  const levelArr = [
    { class: 'easy', value: '简单', color: '#00AF9B' },
    { class: 'mid', value: '中等', color: '#FFBE00' },
    { class: 'hard', value: '困难', color: '#FF2D55' },
  ];
  const statusArr = [
    { class: 'unBegin', value: '未开始', color: '#262626' },
    { class: 'pass', value: '已通过', color: '#00AF9B' },
    { class: 'try', value: '尝试过', color: '#FFBE00' },
  ];
  const tagsArr = [
    { class: '', value: '动态规划' },
    { class: '', value: '回溯' },
    { class: '', value: '二叉树' },
    { class: '', value: '数组' },
    { class: '', value: '链表' },
    { class: '', value: '哈希表' },
    { class: '', value: '堆' },
    { class: '', value: '栈' },
    { class: '', value: '队列' },
    { class: '', value: '队列图' },
  ];

  const columns = [
    {
      title: '题号',
      dataIndex: 'number',
      key: 'number',
      sorter: (a, b) => a.number - b.number,
    },
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
      render: (text) => <a>{text}</a>,
    },
    {
      title: '标签',
      dataIndex: 'tags',
      key: 'tags',
      render: (tags) => (
        <>
          {tags &&
            tags.map((tag) => {
              return <Tag key={tag}>{tag}</Tag>;
            })}
        </>
      ),
    },
    {
      title: '题解数量',
      dataIndex: 'resolveCount',
      key: 'resolveCount',
      sorter: (a, b) => a.resolveCount - b.resolveCount,
    },
    {
      title: '通过率',
      dataIndex: 'passingRate',
      key: 'passingRate',
      sorter: (a, b) => a.passingRate - b.passingRate,
    },
    {
      title: '难度',
      key: 'level',
      dataIndex: 'level',
      render: (levels) => (
        <>
          {levels &&
            levels.map((level) => {
              let color = '';
              let tagClass = '';
              if (level === levelArr[2].value) {
                color = levelArr[2].color;
                tagClass = levelArr[2].class;
              }
              if (level === levelArr[1].value) {
                color = levelArr[1].color;
                tagClass = levelArr[1].class;
              }
              if (level === levelArr[0].value) {
                color = levelArr[0].color;
                tagClass = levelArr[0].class;
              }
              return (
                <Tag color={color} key={tagClass}>
                  {level}
                </Tag>
              );
            })}
        </>
      ),
      sorter: (a, b) => a.level - b.level,
    },
    {
      title: '状态',
      key: 'status',
      dataIndex: 'status',
      render: (status) => (
        <>
          {status &&
            status.map((item) => {
              if (item === statusArr[1].value) {
                return (
                  <div key={item}>
                    <Space size="middle">
                      <CheckCircleTwoTone twoToneColor="#52c41a" />
                      <a>{item}</a>
                    </Space>
                  </div>
                );
              }

              if (item === statusArr[0].value) {
                return (
                  <div key={item}>
                    <Space size="middle">
                      <QuestionCircleTwoTone twoToneColor="#cc5500" />
                      <a>{item}</a>
                    </Space>
                  </div>
                );
              }

              if (item === statusArr[2].value) {
                return (
                  <div key={item}>
                    <Space size="middle">
                      <CloseCircleTwoTone twoToneColor="#fe0202" />
                      <a>{item}</a>
                    </Space>
                  </div>
                );
              }
            })}
        </>
      ),
    },
  ];
  const data = [
    {
      key: '2',
      number: 8,
      title: '多重背包问题 II',
      tags: ['动态规划', '字符串'],
      resolveCount: '12',
      passingRate: '666',
      level: ['困难'],
      status: ['已通过'],
    },
    {
      key: '3',
      number: 10,
      title: '多重背包问题 III',
      tags: ['链表', '数组'],
      resolveCount: '0',
      passingRate: '666',
      level: ['简单'],
      status: ['未开始'],
    },
    {
      key: '4',
      number: 101,
      title: '多重背包问题 III',
      tags: ['链表', '栈'],
      resolveCount: '0',
      passingRate: '666',
      level: ['中等'],
      status: ['未开始'],
    },
    {
      key: '5',
      number: 103,
      title: '多重背包问题 III',
      tags: ['图', '数组'],
      resolveCount: '99',
      passingRate: '666',
      level: ['中等'],
      status: ['尝试过'],
    },
    {
      key: '6',
      number: 77,
      title: '多重背包问题 I',
      tags: ['数', '图'],
      resolveCount: '223',
      passingRate: '666',
      level: ['简单'],
      status: ['已通过'],
    },
    {
      key: '7',
      number: 88,
      title: '多重背包问题 II',
      tags: ['链表', '堆'],
      resolveCount: '12',
      passingRate: '666',
      level: ['困难'],
      status: ['已通过'],
    },
    {
      key: '8',
      number: 32,
      title: '多重背包问题 III',
      tags: ['堆', '栈'],
      resolveCount: '0',
      passingRate: '666',
      level: ['困难'],
      status: ['未开始'],
    },
    {
      key: '9',
      number: 102,
      title: '多重背包问题 III',
      label: ['二叉树', '回溯'],
      resolveCount: '0',
      passingRate: '666',
      level: ['中等'],
      status: ['未开始'],
    },
    {
      key: '10',
      number: 113,
      title: '多重背包问题 III',
      tags: ['回溯', '链表'],
      resolveCount: '99',
      passingRate: '666',
      level: ['中等'],
      status: ['尝试过'],
    },
  ];

  useEffect(() => {
    setExam(data);
  });

  // 筛选难度
  const handleLevel = (value) => {
    if (value) {
      setLevel(value);
    } else {
      setLevel('');
    }
    search();
  };
  // 筛选题目完成状态
  const handleStatus = (value) => {
    if (value) {
      setStatus(value);
    } else {
      setStatus('');
    }
    search();
  };
  // 筛选题目标签（待做）
  const handleTags = async (arr) => {
    if (arr) {
      await setTags(arr);
    }
    search();
  };
  // 筛选题目标题
  const handleTitle = (value) => {
    if (value) {
      setTitle(value);
    } else {
      setTitle('');
    }
    search();
  };
  // 根据要求合并筛选
  const search = () => {
    let flag = true;
    if (tags.length > 0) {
      for (let tag of tags) {
        for (let tql of item['tags']) {
          if (tql !== tag) {
            flag = false;
            return;
          }
        }
      }
    }
    const copyExam = exam.slice();
    const arr = copyExam.filter(
      (item) =>
        item['level'][0].indexOf(level) !== -1 &&
        item['status'][0].indexOf(status) !== -1 &&
        item['title'].indexOf(title) !== -1 &&
        flag,
    );
    console.log('arr前', arr);
    console.log('exam前', exam);
    setExam(arr);
    console.log('arr后', arr);
    console.log('exam后', exam);
  };

  // 不太正确的筛选处理，暂时留着，看看有没有用
  const choice = async (value) => {
    const type = ['简单', '中等', '困难'].includes(value)
      ? 'level'
      : ['未开始', '已通过', '尝试过'].includes(value)
        ? 'status'
        : 'tags';
    const obj = { value: [value], type };
    const newFilterArr = filterArr.slice();
    let testName = '',
      testLevel = '',
      testStatus = '',
      testTags = '';

    if (newFilterArr.length === 0) {
      newFilterArr.push(obj);
    } else {
      for (let i = 0; i < newFilterArr.length; i++) {
        const obj = newFilterArr[i];
        if (type !== 'tags' && obj.type === type) {
          newFilterArr[i].value[0] = value;
        } else if (type === 'tags' && obj.type === type) {
          for (let j = 0; j < obj.value.length; j++) {
            if (obj.value[j] === value) {
              newFilterArr[i].value.slice(j, 1);
            } else if (j === obj.value.length - 1) {
              newFilterArr[i].value.push(obj);
            }
          }
        } else if (i === newFilterArr.length - 1) {
          newFilterArr.push(obj);
        }
      }
    }

    newFilterArr.map((item) => {
      switch (item.type) {
        case 'level':
          testLevel = item.value[0];
          return;
        case 'status':
          testStatus = item.value[0];
          return;
        case 'title':
          testName = item.value[0];
          return;
        case 'tags':
          testTags = item.value;
          return;
      }
    });

    const newExam = data.filter((item) => {
      const flag = item['level'][0].indexOf(testLevel) !== -1;
      const flag2 = item['status'][0].indexOf(testStatus) !== -1;
      const flag3 = item['title'].indexOf(testName) !== -1;
      let flag4 = true;
      for (let tag of testTags) {
        for (let t of item['tags']) {
          if (t !== tag) {
            flag4 = false;
            return;
          }
        }
      }
      if (flag && flag2 && flag3 && flag4) {
        return item;
      }
    });

    setExam(newExam);
    setFilterArr(newFilterArr);
  };

  return (
    <Card bordered={false}>
      <Row>
        <Space>
          {/*难度*/}
          <Col>
            <Select style={{ width: 120 }} defaultValue="难度" onChange={handleLevel}>
              {levelArr.map((item) => (
                <Select.Option key={item.class} value={item.value}>
                  <span style={{ color: item.color }}>{item.value}</span>
                </Select.Option>
              ))}
            </Select>
          </Col>

          {/*状态*/}
          <Col>
            <Select style={{ width: 120 }} defaultValue="状态" onChange={handleStatus}>
              {statusArr.map((item) => (
                <Select.Option key={item.class} value={item.value}>
                  <span style={{ color: item.color }}>{item.value}</span>
                </Select.Option>
              ))}
            </Select>
          </Col>

          {/*标签*/}
          <Col>
            <Select
              style={{ width: 120 }}
              defaultValue="标签"
              onChange={handleTags}
              allowClear={true}
            >
              {tagsArr.map((item) => (
                <Select.Option key={item.class} value={item.value}>
                  <span>{item.value}</span>
                </Select.Option>
              ))}
            </Select>
          </Col>

          {/*输入框搜索*/}
          <Col>
            <Select
              showSearch
              key="search_algorithm"
              open={false}
              style={{ width: 200 }}
              placeholder="搜索题号、标题或内容"
              onSearch={handleTitle}
              allowClear={true}
              onClear={handleTitle}
            ></Select>
          </Col>
        </Space>
      </Row>

      {/*显示筛选的条件*/}
      <Row>
        <Space>
          <Col>
            <Tag>
              <span>{level}</span>
              {level ? <CloseOutlined onClick={handleLevel} /> : null}
            </Tag>
          </Col>
          <Col offset={1}>
            <Tag>
              <span>{status}</span>
              {status ? <CloseOutlined onClick={handleStatus} /> : null}
            </Tag>
          </Col>
          <Col offset={1}>
            <div>
              {tags &&
                tags.map((item) => (
                  <Tag>
                    <span>{item}</span>
                    <CloseOutlined onClick={handleTags} />
                  </Tag>
                ))}
            </div>
          </Col>
          {/*{*/}
          {/*  filterArr.length > 0 ?*/}
          {/*    filterArr.map(item => (*/}
          {/*      <Col offset={1}>*/}
          {/*        <Tag>*/}
          {/*          <span >{item.value}<CloseOutlined /></span>*/}
          {/*        </Tag>*/}
          {/*      </Col>*/}
          {/*    )) : null*/}
          {/*}*/}
        </Space>
      </Row>

      <Table columns={columns} dataSource={exam} />
    </Card>
  );
};

export default AlgorithmList;
