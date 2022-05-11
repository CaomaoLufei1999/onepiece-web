import { LikeOutlined, LoadingOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import {
  Button,
  Card,
  Col,
  Form,
  List,
  Row,
  Select,
  Tag,
  Radio,
  Space,
  Skeleton,
  Divider,
} from 'antd';
import React, { useState, useEffect } from 'react';
import ArticleListContent from './components/ArticleListContent';
import StandardFormRow from './components/StandardFormRow';
import TagSelect from './components/TagSelect';
import styles from './style.less';
import InfiniteScroll from 'react-infinite-scroll-component';

// import { useEffect } from 'react';

const { Option } = Select;
const FormItem = Form.Item;
const pageSize = 5;

const Articles = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [owners, setOwners] = useState([]);
  let count = 0;
  const loadMoreData = () => {
    if (loading) {
      return;
    }
    setLoading(true);
    fetch(`http://localhost:3000/Article_list?id_gte=${count * 10}&id_lte=${(count + 1) * 10 - 1}`)
      .then((res) => res.json())
      .then((body) => {
        setData([...data, ...body]);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
    count++;
  };
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
    loadMoreData();
    loadOwnersData();
  }, []);

  const setOwner = () => {
    form.setFieldsValue({
      owner: ['wzj'],
    });
  };

  // const owners = [
  //   {
  //     id: 'wzj',
  //     name: '我自己',
  //   },
  //   {
  //     id: 'wjh',
  //     name: '吴家豪',
  //   },
  //   {
  //     id: 'zxx',
  //     name: '周星星',
  //   },
  //   {
  //     id: 'zly',
  //     name: '赵丽颖',
  //   },
  //   {
  //     id: 'ym',
  //     name: '姚明',
  //   },
  // ];

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
    <>
      <Card bordered={false}>
        <Form
          layout="inline"
          form={form}
          initialValues={{
            owner: ['wjh', 'zxx'],
          }}
          // onValuesChange={reload}
        >
          <StandardFormRow
            title="所属类目"
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
                    defaultValue="complex_order"
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
        style={{
          marginTop: 24,
        }}
        bordered={false}
        bodyStyle={{
          padding: '8px 32px 32px 32px',
        }}
      >
        <InfiniteScroll
          dataLength={data.length}
          next={loadMoreData}
          hasMore={data.length < 100}
          loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
          endMessage={<Divider plain>榜单只展示前一百名哦！！！🤐</Divider>}
          scrollableTarget="scrollableDiv"
        >
          <List
            size="large"
            // loading={loading}
            rowKey="id"
            itemLayout="vertical"
            // loadMore={loadMoreDom}
            dataSource={data}
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
        </InfiniteScroll>
      </Card>
    </>
  );
};

export default Articles;
