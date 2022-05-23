import { GridContent, PageContainer } from '@ant-design/pro-layout';
import { CheckCard } from '@ant-design/pro-card';
import { Avatar, Button, Card, Col, Form, List, Row, Select, Tag, Skeleton, Divider } from 'antd';
import { history } from 'umi';
import Data from './data';
import StandardFormRow from '@/pages/Search/Articles/components/StandardFormRow';
import TagSelect from '@/pages/Search/Articles/components/TagSelect';
import styles from '@/pages/Search/Articles/style.less';
import React, { useState, useEffect } from 'react';
import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import BackEnd from './components/BackEnd';
import DataBase from './components/DataBase';
import FrontEnd from './components/FrontEnd';
import Algorithm from './components/algorithm';
import ProceduralLife from './components/ProceduralLife';
import StudyNotes from './components/StudyNotes';
import Other from './components/Other';

const { Option } = Select;
const FormItem = Form.Item;
const map = {
  'back-end': 0,
  database: 1,
  'front-end': 2,
  algorithm: 3,
  'procedural-life': 4,
  'study-notes': 5,
  other: 6,
};

const Community = (props) => {
  const [temp, setTemp] = useState(
    props.route.children[Data.index].path.split('/')[
      props.route.children[Data.index].path.split('/').length - 1
    ],
  );

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [owners, setOwners] = useState([]);

  const loadOwnersData = () => {
    if (loading) {
      return;
    }
    setLoading(true);
    fetch('http://localhost:3000/owners')
      .then((res) => res.json())
      .then((body) => {
        setOwners([...body]);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    loadOwnersData();
    console.log('运行了没');
  }, []);

  const setOwner = () => {
    form.setFieldsValue({
      owner: ['wzj'],
    });
  };

  const formItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 24,
      },
      md: {
        span: 12,
      },
    },
  };

  return (
    <PageContainer>
      <GridContent>
        <Row>
          <Col>
            <Card bordered={false} hoverable={true}>
              <Form
                layout="inline"
                form={form}
                initialValues={{
                  owner: ['wjh', 'zxx'],
                }}
                // onValuesChange={reload}
              >
                <StandardFormRow>
                  <Form.Item>
                    <CheckCard.Group
                      onChange={(value, index) => {
                        history.push(`/community/${value}`);
                        Data.index = map[value];
                        setTemp(value);
                      }}
                      defaultValue="back-end"
                    >
                      <CheckCard
                        title="后端开发"
                        avatar={
                          <Avatar
                            src="https://gw.alipayobjects.com/zos/bmw-prod/2dd637c7-5f50-4d89-a819-33b3d6da73b6.svg"
                            size="small"
                          />
                        }
                        defaultChecked
                        size={'small'}
                        value="back-end"
                      />
                      <CheckCard
                        title="数据库"
                        avatar={
                          <Avatar
                            src="https://gw.alipayobjects.com/zos/bmw-prod/6935b98e-96f6-464f-9d4f-215b917c6548.svg"
                            size="small"
                          />
                        }
                        value="database"
                        size={'small'}
                      />
                      <CheckCard
                        title="前端开发"
                        avatar={
                          <Avatar
                            src="https://gw.alipayobjects.com/zos/bmw-prod/d12c3392-61fa-489e-a82c-71de0f888a8e.svg"
                            size="small"
                          />
                        }
                        size={'small'}
                        value="front-end"
                      />
                      <CheckCard
                        title="算法"
                        avatar={
                          <Avatar
                            src="https://gw.alipayobjects.com/zos/bmw-prod/d12c3392-61fa-489e-a82c-71de0f888a8e.svg"
                            size="small"
                          />
                        }
                        size={'small'}
                        value="algorithm"
                      />
                      <CheckCard
                        title="程序人生"
                        avatar={
                          <Avatar
                            src="https://gw.alipayobjects.com/zos/bmw-prod/2dd637c7-5f50-4d89-a819-33b3d6da73b6.svg"
                            size="small"
                          />
                        }
                        size={'small'}
                        value="procedural-life"
                      />
                      <CheckCard
                        title="学习笔记"
                        avatar={
                          <Avatar
                            src="https://gw.alipayobjects.com/zos/bmw-prod/2dd637c7-5f50-4d89-a819-33b3d6da73b6.svg"
                            size="small"
                          />
                        }
                        size={'small'}
                        value="study-notes"
                      />
                      <CheckCard
                        title="其他"
                        avatar={
                          <Avatar
                            src="https://gw.alipayobjects.com/zos/bmw-prod/2dd637c7-5f50-4d89-a819-33b3d6da73b6.svg"
                            size="small"
                          />
                        }
                        size={'small'}
                        value="other"
                      />
                    </CheckCard.Group>
                  </Form.Item>
                </StandardFormRow>
                <StandardFormRow
                  title="文章标签"
                  block
                  style={{
                    paddingBottom: 11,
                  }}
                >
                  <FormItem name="category">
                    <TagSelect expandable>
                      <TagSelect.Option value="cat1">类目一</TagSelect.Option>
                      <TagSelect.Option value="cat2">类目二</TagSelect.Option>
                      <TagSelect.Option value="cat3">类目三</TagSelect.Option>
                      <TagSelect.Option value="cat4">类目四</TagSelect.Option>
                      <TagSelect.Option value="cat5">类目五</TagSelect.Option>
                      <TagSelect.Option value="cat6">类目六</TagSelect.Option>
                      <TagSelect.Option value="cat7">类目七</TagSelect.Option>
                      <TagSelect.Option value="cat8">类目八</TagSelect.Option>
                      <TagSelect.Option value="cat9">类目九</TagSelect.Option>
                      <TagSelect.Option value="cat10">类目十</TagSelect.Option>
                      <TagSelect.Option value="cat11">类目十</TagSelect.Option>
                      <TagSelect.Option value="cat12">类目十</TagSelect.Option>
                    </TagSelect>
                  </FormItem>
                </StandardFormRow>
                <StandardFormRow title="owner" grid>
                  <FormItem name="owner" noStyle>
                    <Select
                      mode="multiple"
                      placeholder="选择 owner"
                      style={{
                        minWidth: '6rem',
                      }}
                    >
                      {owners.map((owner) => (
                        <Option key={owner.id} value={owner.id}>
                          {owner.name}
                        </Option>
                      ))}
                    </Select>
                  </FormItem>
                  <a className={styles.selfTrigger} onClick={setOwner}>
                    只看自己的
                  </a>
                </StandardFormRow>
                <StandardFormRow title="其他选项" grid last>
                  <Row gutter={16}>
                    <Col xl={8} lg={10} md={12} sm={24} xs={24}>
                      <FormItem {...formItemLayout} label="排序" name="user">
                        <Select
                          placeholder="综合排序"
                          style={{
                            maxWidth: 200,
                            width: '100%',
                            color: 'blue',
                          }}
                        >
                          <Option value="complex_order">综合排序</Option>
                          <Option value="lisa">最新优先</Option>
                          <Option value="lisa">热度优先</Option>
                        </Select>
                      </FormItem>
                    </Col>
                    <Col xl={8} lg={10} md={12} sm={24} xs={24}>
                      <FormItem {...formItemLayout} label="时间" name="rate">
                        <Select
                          placeholder="时间不限"
                          defaultValue="all_date"
                          style={{
                            maxWidth: 200,
                            width: '100%',
                            color: 'blue',
                          }}
                        >
                          <Option value="all_date">时间不限</Option>
                          <Option value="1">一周内</Option>
                          <Option value="2">一月内</Option>
                          <Option value="3">三月内</Option>
                          <Option value="4">一年内</Option>
                        </Select>
                      </FormItem>
                    </Col>
                    <Col xl={8} lg={10} md={12} sm={24} xs={24}>
                      <FormItem {...formItemLayout} label="时间" name="rate">
                        <Select
                          placeholder="博主等级"
                          defaultValue="level_1"
                          style={{
                            maxWidth: 200,
                            width: '100%',
                            color: 'blue',
                          }}
                        >
                          <Option value="level_1">一级及以上博主</Option>
                          <Option value="level_2">二级及以上博主</Option>
                          <Option value="level_3">三级及以上博主</Option>
                          <Option value="level_4">四级及以上博主</Option>
                          <Option value="level_5">五级博主</Option>
                        </Select>
                      </FormItem>
                    </Col>
                  </Row>
                </StandardFormRow>
              </Form>
            </Card>
            <Card
              hoverable={true}
              style={{
                marginTop: 24,
              }}
              bordered={false}
              bodyStyle={{
                padding: '8px 32px 32px 32px',
              }}
            >
              {temp == 'back-end' ? (
                <BackEnd />
              ) : temp == 'database' ? (
                <DataBase />
              ) : temp == 'front-end' ? (
                <FrontEnd />
              ) : temp == 'algorithm' ? (
                <Algorithm />
              ) : temp == 'procedural-life' ? (
                <ProceduralLife />
              ) : temp == 'study-notes' ? (
                <StudyNotes />
              ) : temp == 'other' ? (
                <Other />
              ) : null}
            </Card>
          </Col>
        </Row>
      </GridContent>
    </PageContainer>
  );
};

export default Community;
