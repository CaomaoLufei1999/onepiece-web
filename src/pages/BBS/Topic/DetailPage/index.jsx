import React, { useState } from 'react';
import { Row, Col, BackTop } from 'antd';
import { ToTopOutlined } from '@ant-design/icons';
import UserInfo from '../components/UserInfo';
import TopicInfo from '../components/TopicInfo';

const DetailPage = () => {
  // 回到顶部
  const style = {
    height: 40,
    width: 40,
    lineHeight: '40px',
    borderRadius: 4,
    backgroundColor: '#1088e9',
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 14,
  };

  return (
    <div>
      <Row>
        <Col span={17}>
          <TopicInfo showComment={true} />
        </Col>

        <Col span={1} offset={1}>
          <UserInfo />
        </Col>
      </Row>

      <BackTop>
        <div style={style}>
          <ToTopOutlined />
        </div>
      </BackTop>
    </div>
  );
};

export default DetailPage;
