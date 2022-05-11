import { Card, Col, Form, List, Row, Select, Typography, Skeleton, Divider } from 'antd';
import React, { useState, useEffect } from 'react';
import moment from 'moment';
import AvatarList from './components/AvatarList';
import StandardFormRow from './components/StandardFormRow';
import TagSelect from './components/TagSelect';
import styles from './style.less';
import { GridContent, PageContainer } from '@ant-design/pro-layout';
const { Option } = Select;
const FormItem = Form.Item;
const { Paragraph } = Typography;
import InfiniteScroll from 'react-infinite-scroll-component';

const getKey = (id, index) => `${id}-${index}`;

const Read = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  let count = 0;
  const loadMoreData = () => {
    if (loading) {
      return;
    }
    setLoading(true);
    fetch(`http://localhost:3000/Read_list?id_gte=${count * 8}&id_lte=${(count + 1) * 8 - 1}`)
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
  useEffect(() => {
    loadMoreData();
  }, []);

  const cardList = (
    <InfiniteScroll
      dataLength={data.length}
      next={loadMoreData}
      hasMore={data.length < 100}
      loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
      endMessage={<Divider plain>榜单只展示前一百名哦！！！🤐</Divider>}
      scrollableTarget="scrollableDiv"
    >
      <List
        rowKey="id"
        // loading={loading}
        grid={{
          gutter: 16,
          xs: 1,
          sm: 2,
          md: 3,
          lg: 3,
          xl: 4,
          xxl: 4,
        }}
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <Card
              className={styles.card}
              hoverable
              cover={<img alt={item.title} src={item.cover} />}
            >
              <Card.Meta
                title={<a>{item.title}</a>}
                description={
                  <Paragraph
                    className={styles.item}
                    ellipsis={{
                      rows: 2,
                    }}
                  >
                    {item.subDescription}
                  </Paragraph>
                }
              />
              <div className={styles.cardItemContent}>
                <span>{moment(item.updatedAt).fromNow()}</span>
                <div className={styles.avatarList}>
                  <AvatarList size="small">
                    {item.members.map((member, i) => (
                      <AvatarList.Item
                        key={getKey(item.id, i)}
                        src={member.avatar}
                        tips={member.name}
                      />
                    ))}
                  </AvatarList>
                </div>
              </div>
            </Card>
          </List.Item>
        )}
      />
    </InfiniteScroll>
  );
  const formItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 16,
      },
    },
  };
  return (
    <PageContainer>
      {/* TODO 共多少本书 */}
      {/* TODO 不同书籍Tab的阅读次数 */}
      <GridContent>
        <div className={styles.coverCardList}>
          <Card bordered={false}>
            <Form
              layout="inline"
              // onValuesChange={(_, values) => {
              //   // 表单项变化时请求数据
              //   // 模拟查询表单生效
              //   run(values);
              // }}
              onLoadError={console.error} //加载失败时调用
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
                    <TagSelect.Option value="cat11">类目十一</TagSelect.Option>
                    <TagSelect.Option value="cat12">类目十二</TagSelect.Option>
                  </TagSelect>
                </FormItem>
              </StandardFormRow>
              <StandardFormRow title="其它选项" grid last>
                <Row gutter={16}>
                  <Col lg={8} md={10} sm={10} xs={24}>
                    <FormItem {...formItemLayout} label="作者" name="author">
                      <Select
                        placeholder="不限"
                        style={{
                          maxWidth: 200,
                          width: '100%',
                        }}
                      >
                        <Option value="lisa">王昭君</Option>
                      </Select>
                    </FormItem>
                  </Col>
                  <Col lg={8} md={10} sm={10} xs={24}>
                    <FormItem {...formItemLayout} label="好评度" name="rate">
                      <Select
                        placeholder="不限"
                        style={{
                          maxWidth: 200,
                          width: '100%',
                        }}
                      >
                        <Option value="good">优秀</Option>
                        <Option value="normal">普通</Option>
                      </Select>
                    </FormItem>
                  </Col>
                </Row>
              </StandardFormRow>
            </Form>
          </Card>
          <div className={styles.cardList}>{cardList}</div>
        </div>
      </GridContent>
    </PageContainer>
  );
};

export default Read;
