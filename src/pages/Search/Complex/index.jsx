import { LikeOutlined, LoadingOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import { Button, Card, Col, Form, List, Row, Select, Tag, Radio, Space } from 'antd';
import React, { useState } from 'react';
import ArticleListContent from './components/ArticleListContent';
import StandardFormRow from './components/StandardFormRow';
import TagSelect from './components/TagSelect';
import styles from './style.less';
import InfiniteScroll from 'react-infinite-scroll-component';

const { Option } = Select;
const FormItem = Form.Item;
const pageSize = 5;

const Articles = () => {
  const [open, setOpen] = useState(false);
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
    fetch(`http://localhost:3000/Complex_list?id_gte=${count * 10}&id_lte=${(count + 1) * 10 - 1}`)
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
            title="????????????"
            block
            style={{
              paddingBottom: 11,
            }}
          >
            <FormItem name="category">
              <TagSelect expandable>
                <TagSelect.Option value="cat1">?????????</TagSelect.Option>
                <TagSelect.Option value="cat2">?????????</TagSelect.Option>
                <TagSelect.Option value="cat3">?????????</TagSelect.Option>
                <TagSelect.Option value="cat4">?????????</TagSelect.Option>
                <TagSelect.Option value="cat5">?????????</TagSelect.Option>
                <TagSelect.Option value="cat6">?????????</TagSelect.Option>
                <TagSelect.Option value="cat7">?????????</TagSelect.Option>
                <TagSelect.Option value="cat8">?????????</TagSelect.Option>
                <TagSelect.Option value="cat9">?????????</TagSelect.Option>
                <TagSelect.Option value="cat10">?????????</TagSelect.Option>
              </TagSelect>
            </FormItem>
          </StandardFormRow>
          <StandardFormRow title="owner" grid>
            <FormItem name="owner" noStyle>
              <Select
                key="search_algorithm"
                style={{
                  minWidth: '6rem',
                }}
                mode="multiple"
                showSearch
                placeholder="?????? owner"
                open={open}
                allowClear={true}
                // onChange={onChange} // ?????? option?????? input ??? value ???????????????????????????
                // onSearch={handleTitle} // ???????????????????????????
                // onClear={handleTitle} // ?????????????????????
                optionFilterProp="children"
                filterOption={(input, option) => option.children.indexOf(input) >= 0}
              >
                {owners.map((owner) => (
                  <Option key={owner.id} value={owner.id}>
                    {owner.name}
                  </Option>
                ))}
              </Select>
            </FormItem>
            <a className={styles.selfTrigger} onClick={setOwner}>
              ???????????????
            </a>
          </StandardFormRow>
          <StandardFormRow title="????????????" grid last>
            <Row gutter={16}>
              <Col xl={8} lg={10} md={12} sm={24} xs={24}>
                <FormItem {...formItemLayout} label="??????" name="user">
                  <Select
                    placeholder="????????????"
                    defaultValue="complex_order"
                    style={{
                      maxWidth: 200,
                      width: '100%',
                      color: 'blue',
                    }}
                  >
                    <Option value="complex_order">????????????</Option>
                    <Option value="lisa">????????????</Option>
                    <Option value="lisa">????????????</Option>
                  </Select>
                </FormItem>
              </Col>
              <Col xl={8} lg={10} md={12} sm={24} xs={24}>
                <FormItem {...formItemLayout} label="??????" name="rate">
                  <Select
                    placeholder="????????????"
                    defaultValue="all_date"
                    style={{
                      maxWidth: 200,
                      width: '100%',
                      color: 'blue',
                    }}
                  >
                    <Option value="all_date">????????????</Option>
                    <Option value="1">?????????</Option>
                    <Option value="2">?????????</Option>
                    <Option value="3">?????????</Option>
                    <Option value="4">?????????</Option>
                  </Select>
                </FormItem>
              </Col>
              <Col xl={8} lg={10} md={12} sm={24} xs={24}>
                <FormItem {...formItemLayout} label="??????" name="rate">
                  <Select
                    placeholder="????????????"
                    defaultValue="level_1"
                    style={{
                      maxWidth: 200,
                      width: '100%',
                      color: 'blue',
                    }}
                  >
                    <Option value="level_1">?????????????????????</Option>
                    <Option value="level_2">?????????????????????</Option>
                    <Option value="level_3">?????????????????????</Option>
                    <Option value="level_4">?????????????????????</Option>
                    <Option value="level_5">????????????</Option>
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
        {' '}
        <InfiniteScroll
          dataLength={data.length}
          next={loadMoreData}
          hasMore={data.length < 100}
          loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
          endMessage={<Divider plain>???????????????????????????????????????????</Divider>}
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
                      <Tag>????????????</Tag>
                      <Tag>????????????</Tag>
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
