import React, {useState, useRef} from 'react';
import {GridContent, PageContainer} from '@ant-design/pro-layout';
import {Avatar, Skeleton, Row, Statistic, Col, Card, Button, Calendar, Badge, List} from 'antd';
import styles from './index.less';
import RecommendUsers from "@/pages/Home/components/RecommendUsers"
import {CalendarOutlined, NotificationOutlined, TeamOutlined} from "@ant-design/icons";
import New from "@/pages/Home/components/New";
import Recommend from "@/pages/Home/components/Recommend";
import Hot from "@/pages/Home/components/Hot";
import Follow from "@/pages/Home/components/Follow";
import menu from "@/locales/zh-CN/menu";

function onPanelChange(value, mode) {
  console.log(value, mode);
}

// TODO (热点资讯列表 从获取，https://blog.csdn.net/phoenix/web/v1/home/information?page=1&pageSize=20
// TODO Jsoup解析文章页面详情 https://blog.csdn.net/dyc87112/article/details/122752714
// TODO 数据写入redis，后端接口调用时，将解析的页面结果展现给前端)
const public_data = [
  {
    title: 'OnePiece社区Version0.0.1版本发布',
  },
  {
    title: 'OnePiece社区Version0.0.2版本发布',
  },
  {
    title: 'OnePiece社区Version0.0.3版本发布',
  },
];

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
        >
        </span>
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
        >
        </span>
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
        >
        </span>
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
        >
        </span>
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
        >
        </span>
      </span>
    ),
  },
];

const PageHeaderContent = ({currentUser}) => {
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
        <Avatar size="large" src={currentUser.avatar}/>
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

const ExtraContent = () => (
  <div className={styles.extraContent}>
    <div className={styles.statItem}>
      <Statistic title="文章总数" value={56}/>
    </div>
    <div className={styles.statItem}>
      <Statistic title="题解总数" value={8} suffix="/ 24"/>
    </div>
    <div className={styles.statItem}>
      <Statistic title="综合排名" value={2223}/>
    </div>
  </div>
);

const Home = () => {
  const [tabKey, setTabKey] = useState('new'); //  获取用户信息
  let menuName = "menu.home." + tabKey;
  const tabName = menu[menuName];
  const renderChildrenByTabKey = (tabValue) => {
    if (tabValue === 'new') {
      return <New/>;
    }
    if (tabValue === 'news') {
      return <New/>;
    }
    if (tabValue === 'recommend') {
      return <Recommend/>;
    }

    if (tabValue === 'hot') {
      return <Hot/>;
    }

    if (tabValue === 'follow') {
      return <Follow/>;
    }
    return null;
  };

  return (
    <PageContainer
      header={{
        title: '',
        breadcrumb: {},
      }}
      content={
        <PageHeaderContent
          currentUser={{
            avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
            name: '吴彦祖',
            userid: '00000001',
            email: 'antdesign@alipay.com',
            signature: '海纳百川，有容乃大',
            title: '交互专家',
            group: '蚂蚁金服－某某某事业群－某某平台部－某某技术部－UED',
          }}
        />
      }
      extraContent={<ExtraContent/>}
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
              extra={<a href="#">More</a>}
            >
              {renderChildrenByTabKey(tabKey)}
            </Card>
          </Col>
          <Col lg={7} md={24}>
            <Card
              title={
                <span>
                <CalendarOutlined style={{
                  marginRight: 10,
                }}/>
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
                <NotificationOutlined style={{
                  marginRight: 10,
                }}/>
                  公告
                </span>
              }
              extra={<a href="#">More</a>}
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
                dataSource={public_data}
                renderItem={item => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar src="https://joeschmoe.io/api/v1/random"/>}
                      title={<a href="https://ant.design">{item.title}</a>}
                      description={
                        <span>
                          <p>2022-02-01</p>
                          {"该版本目前正处于测试阶段，前端页面多数正处于开发过程中，尚未接入后端接口。"}
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
                <TeamOutlined style={{
                  marginRight: 10,
                }}/>
                  优质作者
                </span>
              }
              extra={<a href="#">More</a>}
              style={{
                marginBottom: 24,
              }}
              bordered={false}
              bodyStyle={{
                padding: 10,
              }}
            >
              <RecommendUsers/>
            </Card>
          </Col>
        </Row>
      </GridContent>
    </PageContainer>
  );
};

export default Home;
