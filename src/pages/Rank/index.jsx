import { List, Row, Col } from 'antd';
import styles from './index.less';
import AuthorList from './components/AuthorList';
import DomainContentList from './components/DomainContentList';
import BlogHotList from './components/BlogHotList';
import PointsList from './components/PointsList';
import SolveList from './components/SolveList';
import React, { useState, useEffect } from 'react';
import { Link } from 'umi';
/**
 * @en-US Add node
 * @zh-CN 添加节点
 * @param fields
 */

const TableList = (props) => {
  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */
  const [loading, setLoading] = useState(false);
  const [rankName, setRankName] = useState([]);
  const [id, setId] = useState(props.route.name);

  const loadRankData = () => {
    if (loading) {
      return;
    }
    setLoading(true);
    fetch('http://localhost:3000/rankName')
      .then((res) => res.json())
      .then((body) => {
        setRankName([...body]);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    loadRankData();
  }, []);
  let map = {
    1: 'total',
    2: 'weekly',
    3: 'blog',
    4: 'content',
    5: 'resolve',
  };

  return (
    <Row gutter={16}>
      <Col span={6} className={styles.col_left}>
        <List
          itemLayout="horizontal"
          dataSource={rankName}
          renderItem={(item, index) => (
            <List.Item className={styles.item}>
              <Row gutter={20} style={{ width: '290px' }}>
                <Col span={11} style={{ marginLeft: '10px' }}>
                  <Link
                    to={`${map[index + 1]}`}
                    style={
                      id != map[index + 1]
                        ? { fontSize: '16px', color: '#222226' }
                        : { color: '#ff7232', fontSize: '16px' }
                    }
                  >
                    {item.title}
                  </Link>
                </Col>
                <Col span={11}>
                  <text style={{ fontSize: '10px', color: '#6f707d' }}>{item.description}</text>
                </Col>
              </Row>
            </List.Item>
          )}
        />
      </Col>
      <Col span={6}></Col>
      {id == 'total' ? (
        <DomainContentList />
      ) : id == 'weekly' ? (
        <AuthorList />
      ) : id == 'blog' ? (
        <BlogHotList />
      ) : id == 'content' ? (
        <PointsList />
      ) : id == 'resolve' ? (
        <SolveList />
      ) : null}
    </Row>
  );
};

export default TableList;
