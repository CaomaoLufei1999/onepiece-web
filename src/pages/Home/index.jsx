import React, { useState, useRef, useEffect } from 'react';
import { GridContent, PageContainer } from '@ant-design/pro-layout';
import { Avatar, Skeleton, Row, Statistic, Col, Card, Button, Calendar, Badge, List } from 'antd';
import { Link } from 'umi';
import styles from './index.less';
import RecommendUsers from '@/pages/Home/components/RecommendUsers';
import { CalendarOutlined, NotificationOutlined, TeamOutlined } from '@ant-design/icons';
import New from '@/pages/Home/components/New';
import News from '@/pages/Home/components/News';
import Recommend from '@/pages/Home/components/Recommend';
import Hot from '@/pages/Home/components/Hot';
import Follow from '@/pages/Home/components/Follow';
import menu from '@/locales/zh-CN/menu';

function onPanelChange(value, mode) {
  console.log(value, mode);
}

// TODO (热点资讯列表 从获取，https://blog.csdn.net/phoenix/web/v1/home/information?page=1&pageSize=20
// TODO Jsoup解析文章页面详情 https://blog.csdn.net/dyc87112/article/details/122752714
// TODO 数据写入redis，后端接口调用时，将解析的页面结果展现给前端)
// const public_data = [
//   {
//     title: 'OnePiece社区Version0.0.1版本发布',
//   },
//   {
//     title: 'OnePiece社区Version0.0.2版本发布',
//   },
//   {
//     title: 'OnePiece社区Version0.0.3版本发布',
//   },
// ];

const operationTabList = [
  {
    key: 'new',
    tab: (
      <span>
        最新{' '}
        <span
          style={{
            fontSize: 14,
          }}
        ></span>
      </span>
    ),
  },
  {
    key: 'follow',
    tab: (
      <span>
        关注{' '}
        <span
          style={{
            fontSize: 14,
          }}
        ></span>
      </span>
    ),
  },
  {
    key: 'recommend',
    tab: (
      <span>
        推荐{' '}
        <span
          style={{
            fontSize: 14,
          }}
        ></span>
      </span>
    ),
  },
  {
    key: 'hot',
    tab: (
      <span>
        热榜{' '}
        <span
          style={{
            fontSize: 14,
          }}
        ></span>
      </span>
    ),
  },
  {
    key: 'news',
    tab: (
      <span>
        资讯热点{' '}
        <span
          style={{
            fontSize: 14,
          }}
        ></span>
      </span>
    ),
  },
];

const PageHeaderContent = ({ currentUser }) => {
  const loading = currentUser && Object.keys(currentUser).length;

  if (!loading) {
    return (
      <Skeleton
        avatar
        paragraph={{
          rows: 1,
        }}
        active
      />
    );
  }

  return (
    <div className={styles.pageHeaderContent}>
      <div className={styles.avatar}>
        <Avatar size="large" src={currentUser.avatar} />
      </div>
      <div className={styles.content}>
        <div className={styles.contentTitle}>
          早安，
          {currentUser.name}
          ，祝你开心每一天！
        </div>
        <div>
          {currentUser.title} |{currentUser.group}
        </div>
      </div>
    </div>
  );
};

const ExtraContent = ({ currentUser }) => (
  <div className={styles.extraContent}>
    <div className={styles.statItem}>
      <Statistic title="文章总数" value={currentUser.articleNum} />
    </div>
    <div className={styles.statItem}>
      <Statistic title="题解总数" value={currentUser.testAnswerNum} suffix="/ 24" />
    </div>
    <div className={styles.statItem}>
      <Statistic title="综合排名" value={currentUser.rank} />
    </div>
  </div>
);

const Home = () => {
  const [tabKey, setTabKey] = useState('new'); //  获取用户信息
  const [loading, setLoading] = useState(false);
  const [publicData, setPublicData] = useState([]);
  const [userData, setUserData] = useState({});

  let menuName = 'menu.home.' + tabKey;
  const tabName = menu[menuName];
  const renderChildrenByTabKey = (tabValue) => {
    if (tabValue === 'new') {
      return <New />;
    }
    if (tabValue === 'news') {
      return <News />;
    }
    if (tabValue === 'recommend') {
      return <Recommend />;
    }

    if (tabValue === 'hot') {
      return <Hot />;
    }

    if (tabValue === 'follow') {
      return <Follow />;
    }
    return null;
  };

  const loadData = () => {
    if (loading) {
      return;
    }
    setLoading(true);
    fetch('http://localhost:3000/home_public_data')
      .then((res) => res.json())
      .then((body) => {
        setPublicData([...body]);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
    fetch('http://localhost:3000/home_user_data')
      .then((res) => res.json())
      .then((body) => {
        setUserData(body[0]);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <PageContainer
      header={{
        title: '',
        breadcrumb: {},
      }}
      content={
        <PageHeaderContent
          currentUser={{
            avatar: userData && userData.avatar,
            name: userData && userData.name,
            userid: userData && userData.userid,
            email: userData && userData.email,
            signature: userData && userData.signature,
            title: userData && userData.title,
            group: userData && userData.group,
          }}
        />
      }
      extraContent={
        <ExtraContent
          currentUser={{
            articleNum: userData && userData.articleNum,
            testAnswerNum: userData && userData.testAnswerNum,
            testAnswerAllNum: userData && userData.testAnswerAllNum,
            rank: userData && userData.rank,
          }}
        />
      }
      tabList={operationTabList}
      activeTabKey={tabKey}
      onTabChange={(_tabKey) => {
        setTabKey(_tabKey);
      }}
    >
      <GridContent>
        <Row gutter={24}>
          <Col lg={17} md={24}>
            <Card
              className={styles.tabsCard}
              bordered={false}
              title={tabName}
              extra={<Link to={'/rank/list/blog'}>More</Link>}
            >
              {renderChildrenByTabKey(tabKey)}
            </Card>
          </Col>
          <Col lg={7} md={24}>
            <Card
              title={
                <span>
                  <CalendarOutlined
                    style={{
                      marginRight: 10,
                    }}
                  />
                  日期
                </span>
              }
              style={{
                marginBottom: 24,
              }}
              bordered={false}
              bodyStyle={{
                padding: 0,
              }}
            >
              <Calendar
                fullscreen={false}
                // dateCellRender={dateCellRender}
                // monthCellRender={monthCellRender}
                onPanelChange={onPanelChange}
              />
            </Card>
            <Card
              title={
                <span>
                  <NotificationOutlined
                    style={{
                      marginRight: 10,
                    }}
                  />
                  公告
                </span>
              }
              extra={<a href="#">More2</a>}
              style={{
                marginBottom: 24,
              }}
              bordered={false}
              bodyStyle={{
                padding: 10,
              }}
            >
              <List
                itemLayout="horizontal"
                dataSource={publicData}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar src={item.avatar} />}
                      title={<a href={item.titleHref}>{item.title}</a>}
                      description={
                        <span>
                          <p>{item.time}</p>
                          {item.desc}
                        </span>
                      }
                    />
                  </List.Item>
                )}
              />
            </Card>
            <Card
              title={
                <span>
                  <TeamOutlined
                    style={{
                      marginRight: 10,
                    }}
                  />
                  优质作者
                </span>
              }
              extra={<a href="#">More3</a>}
              style={{
                marginBottom: 24,
              }}
              bordered={false}
              bodyStyle={{
                padding: 10,
              }}
            >
              <RecommendUsers />
            </Card>
          </Col>
        </Row>
      </GridContent>
    </PageContainer>
  );
};

export default Home;
