import { PlusOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import {
  Button,
  message,
  Input,
  Drawer,
  List,
  Avatar,
  Skeleton,
  Divider,
  Row,
  Col,
  Tooltip,
  Image,
  Tabs,
} from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import styles from '../index.less';
import DividerComponent from './Divider';
import InfiniteScroll from 'react-infinite-scroll-component';
// import List from 'rc-virtual-list';
/**
 * @en-US Add node
 * @zh-CN 添加节点
 * @param fields
 */
const { TabPane } = Tabs;
let index = 1;
let count = [0, 0, 0, 0, 0];
const PointsList = () => {
  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  function callback(key) {
    index = key;
    console.log(key);
    loadMoreData(key);
  }
  let count = [0, 0, 0, 0, 0, 0];
  const loadMoreData = (key = 1) => {
    if (loading) {
      return;
    }
    setLoading(true);
    fetch(`http://localhost:3000/rank_data_point_id_${key}
    `)
      .then((res) => res.json())
      .then((body) => {
        setData([...body]);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
    count++;
  };
  const loadMoreData_type = (key = 1) => {
    if (loading) {
      return;
    }
    setLoading(true);
    // ?id_gte=${count[key] * 10}&id_lte=${
    //   (count[key] + 1) * 10 - 1
    // }
    fetch(`http://localhost:3000/rank_data_point_id_${key}
    `)
      .then((res) => res.json())
      .then((body) => {
        setData([...data, ...body]);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
    count[key]++;
  };
  useEffect(() => {
    loadMoreData();
  }, []);
  return (
    <Col className="gutter-row" span={18} style={{ marginTop: '-20px' }}>
      <DividerComponent />
      <Tabs onChange={callback} type="card">
        <TabPane tab="C/C++" key="1"></TabPane>
        <TabPane tab="云原生" key="2"></TabPane>
        <TabPane tab="人工智能" key="3"></TabPane>
        <TabPane tab="软件工程" key="4"></TabPane>
        <TabPane tab="后端" key="5"></TabPane>
        <TabPane tab="Java" key="6"></TabPane>
        <TabPane tab="JavaScript" key="7"></TabPane>
        <TabPane tab="PHP" key="8"></TabPane>
        <TabPane tab="Python" key="9"></TabPane>
        <TabPane tab="区块链" key="10"></TabPane>
        <TabPane tab="大数据" key="11"></TabPane>
        <TabPane tab="移动开发" key="12"></TabPane>
        <TabPane tab="嵌入式" key="13"></TabPane>
        <TabPane tab="开发工具" key="14"></TabPane>
        <TabPane tab="结构与算法" key="15"></TabPane>
        <TabPane tab="测试" key="16"></TabPane>
        <TabPane tab="游戏" key="17"></TabPane>
        <TabPane tab="网络" key="18"></TabPane>
        <TabPane tab="运维" key="19"></TabPane>
      </Tabs>
      <InfiniteScroll
        dataLength={data.length}
        // next={loadMoreData_type(index)}
        hasMore={data.length < 100}
        loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
        endMessage={<Divider plain>榜单只展示前一百名哦！！！🤐</Divider>}
        scrollableTarget="scrollableDiv"
      >
        <List
          itemLayout="horizontal"
          dataSource={data}
          renderItem={(item, index) => (
            <List.Item className={styles.rankItem}>
              <text
                className={
                  index == 0
                    ? styles.rankFirst
                    : index == 1
                    ? styles.rankSecond
                    : index == 2
                    ? styles.rankThird
                    : styles.rankCommon
                }
              >
                {index + 1}
              </text>
              <List.Item.Meta
                // avatar={
                //   <Image
                //     style={{ borderRadius: '4px' }}
                //     width={80}
                //     height={55}
                //     src={item.picture.large}
                //     fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7////39v///y4Dmn+LgeHANwDrkl1AuO+pmgAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAwqADAAQAAAABAAAAwwAAAAD9b/HnAAAHlklEQVR4Ae3dP3PTWBSGcbGzM6GCKqlIBRV0dHRJFarQ0eUT8LH4BnRU0NHR0UEFVdIlFRV7TzRksomPY8uykTk/zewQfKw/9znv4yvJynLv4uLiV2dBoDiBf4qP3/ARuCRABEFAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghgg0Aj8i0JO4OzsrPv69Wv+hi2qPHr0qNvf39+iI97soRIh4f3z58/u7du3SXX7Xt7Z2enevHmzfQe+oSN2apSAPj09TSrb+XKI/f379+08+A0cNRE2ANkupk+ACNPvkSPcAAEibACyXUyfABGm3yNHuAECRNgAZLuYPgEirKlHu7u7XdyytGwHAd8jjNyng4OD7vnz51dbPT8/7z58+NB9+/bt6jU/TI+AGWHEnrx48eJ/EsSmHzx40L18+fLyzxF3ZVMjEyDCiEDjMYZZS5wiPXnyZFbJaxMhQIQRGzHvWR7XCyOCXsOmiDAi1HmPMMQjDpbpEiDCiL358eNHurW/5SnWdIBbXiDCiA38/Pnzrce2YyZ4//59F3ePLNMl4PbpiL2J0L979+7yDtHDhw8vtzzvdGnEXdvUigSIsCLAWavHp/+qM0BcXMd/q25n1vF57TYBp0a3mUzilePj4+7k5KSLb6gt6ydAhPUzXnoPR0dHl79WGTNCfBnn1uvSCJdegQhLI1vvCk+fPu2ePXt2tZOYEV6/fn31dz+shwAR1sP1cqvLntbEN9MxA9xcYjsxS1jWR4AIa2Ibzx0tc44fYX/16lV6NDFLXH+YL32jwiACRBiEbf5KcXoTIsQSpzXx4N28Ja4BQoK7rgXiydbHjx/P25TaQAJEGAguWy0+2Q8PD6/Ki4R8EVl+bzBOnZY95fq9rj9zAkTI2SxdidBHqG9+skdw43borCXO/ZcJdraPWdv22uIEiLA4q7nvvCug8WTqzQveOH26fodo7g6uFe/a17W3+nFBAkRYENRdb1vkkz1CH9cPsVy/jrhr27PqMYvENYNlHAIesRiBYwRy0V+8iXP8+/fvX11Mr7L7ECueb/r48eMqm7FuI2BGWDEG8cm+7G3NEOfmdcTQw4h9/55lhm7DekRYKQPZF2ArbXTAyu4kDYB2YxUzwg0gi/41ztHnfQG26HbGel/crVrm7tNY+/1btkOEAZ2M05r4FB7r9GbAIdxaZYrHdOsgJ/wCEQY0J74TmOKnbxxT9n3FgGGWWsVdowHtjt9Nnvf7yQM2aZU/TIAIAxrw6dOnAWtZZcoEnBpNuTuObWMEiLAx1HY0ZQJEmHJ3HNvGCBBhY6jtaMoEiJB0Z29vL6ls58vxPcO8/zfrdo5qvKO+d3Fx8Wu8zf1dW4p/cPzLly/dtv9Ts/EbcvGAHhHyfBIhZ6NSiIBTo0LNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiEC/wGgKKC4YMA4TAAAAABJRU5ErkJggg=="
                //   />
                // }
                title={
                  <a href="https://ant.design" style={{ fontSize: '18px' }}>
                    {item.title}
                  </a>
                }
                description={
                  <text>
                    浏览 {item.browse}&nbsp;&nbsp;&nbsp; 评论 {item.comment} &nbsp;&nbsp;&nbsp;收藏
                    {item.collection}
                  </text>
                }
              />
              <Button
                type="link"
                shape="round"
                size="middle"
                style={{
                  marginRight: '30px',
                  borderWidth: '1px',
                  // height: '30px',
                  borderColor: '#555666',
                  color: '#555666',
                }}
              >
                关注blog
              </Button>
            </List.Item>
          )}
        />
      </InfiniteScroll>
    </Col>
  );
};

export default PointsList;
