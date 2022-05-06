import { GridContent, PageContainer } from '@ant-design/pro-layout';
import { CheckCard } from '@ant-design/pro-card';
import { Avatar, Button, Card, Col, Form, List, Row, Select, Tag } from 'antd';
import StandardFormRow from '@/pages/Search/Articles/components/StandardFormRow';
import TagSelect from '@/pages/Search/Articles/components/TagSelect';
import styles from '@/pages/Search/Articles/style.less';
import React from 'react';
import { useRequest } from 'umi';
import { queryFakeList3 } from '@/pages/Search/Articles/service';
import ArticleListContent from '@/pages/Search/Articles/components/ArticleListContent';
import { LikeOutlined, LoadingOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';

const { Option } = Select;
const FormItem = Form.Item;
const pageSize = 15;

const Community = () => {
  const [form] = Form.useForm();
  const setOwner = () => {
    form.setFieldsValue({
      owner: ['wzj'],
    });
  };

  const owners = [
    {
      id: 'wzj',
      name: '我自己',
    },
    {
      id: 'wjh',
      name: '吴家豪',
    },
    {
      id: 'zxx',
      name: '周星星',
    },
    {
      id: 'zly',
      name: '赵丽颖',
    },
    {
      id: 'ym',
      name: '姚明',
    },
  ];

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

  const { data, reload, loading, loadMore, loadingMore } = useRequest(
    () => {
      return queryFakeList3({
        count: pageSize,
      });
    },
    {
      loadMore: true,
    },
  );
  const list = data?.list || [];

  const loadMoreDom = list.length > 0 && (
    <div
      style={{
        textAlign: 'center',
        marginTop: 16,
      }}
    >
      <Button
        onClick={loadMore}
        style={{
          paddingLeft: 48,
          paddingRight: 48,
        }}
      >
        {loadingMore ? (
          <span>
            <LoadingOutlined /> 加载中...
          </span>
        ) : (
          '加载更多'
        )}
      </Button>
    </div>
  );

  const IconText = ({ type, text }) => {
    switch (type) {
      case 'star-o':
        return (
          <span>
            <StarOutlined
              style={{
                marginRight: 8,
              }}
            />
            {text}
          </span>
        );

      case 'like-o':
        return (
          <span>
            <LikeOutlined
              style={{
                marginRight: 8,
              }}
            />
            {text}
          </span>
        );

      case 'message':
        return (
          <span>
            <MessageOutlined
              style={{
                marginRight: 8,
              }}
            />
            {text}
          </span>
        );

      default:
        return null;
    }
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
                onValuesChange={reload}
              >
                <StandardFormRow>
                  <Form.Item>
                    <CheckCard.Group>
                      <CheckCard
                        title="后端开发"
                        avatar={
                          <Avatar
                            src="https://gw.alipayobjects.com/zos/bmw-prod/2dd637c7-5f50-4d89-a819-33b3d6da73b6.svg"
                            size="small"
                          />
                        }
                        size={'small'}
                        value="SpringBoot"
                      />
                      <CheckCard
                        title="数据库"
                        avatar={
                          <Avatar
                            src="https://gw.alipayobjects.com/zos/bmw-prod/6935b98e-96f6-464f-9d4f-215b917c6548.svg"
                            size="small"
                          />
                        }
                        value="SOFABoot"
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
                        value="NodeJS"
                      />
                      <CheckCard
                        title="算法"
                        avatar={
                          <Avatar
                            src="https://gw.alipayobjects.com/zos/bmw-prod/2dd637c7-5f50-4d89-a819-33b3d6da73b6.svg"
                            size="small"
                          />
                        }
                        size={'small'}
                        value="SpringBoot"
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
                        value="SpringBoot"
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
                        value="SpringBoot"
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
                        value="SpringBoot"
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
                      <TagSelect.Option value="cat10">类目十</TagSelect.Option>
                      <TagSelect.Option value="cat10">类目十</TagSelect.Option>
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
              <List
                size="large"
                loading={loading}
                rowKey="id"
                itemLayout="vertical"
                loadMore={loadMoreDom}
                dataSource={list}
                renderItem={(item) => (
                  <List.Item
                    key={item.id}
                    actions={[
                      <IconText key="star" type="star-o" text={item.star} />,
                      <IconText key="like" type="like-o" text={item.like} />,
                      <IconText key="message" type="message" text={item.message} />,
                    ]}
                    extra={<div className={styles.listItemExtra} />}
                  >
                    <List.Item.Meta
                      title={
                        <a className={styles.listItemMetaTitle} href={item.href}>
                          {item.title}
                        </a>
                      }
                      description={
                        <span>
                          <Tag>Ant Design</Tag>
                          <Tag>设计语言</Tag>
                          <Tag>蚂蚁金服</Tag>
                        </span>
                      }
                    />
                    <ArticleListContent data={item} />
                  </List.Item>
                )}
              />
            </Card>
          </Col>
        </Row>
      </GridContent>
    </PageContainer>
  );
};

export default Community;
