import React, { useState, useEffect } from 'react';
import { Card, Avatar } from 'antd';

const UserInfo = () => {
  return (
    <div>
      <Card
        style={{ width: 300 }}
        actions={[
          <div>
            <h1>6666</h1>
            <div>BLink</div>
          </div>,
          <div>
            <h1>6666</h1>
            <div>关注</div>
          </div>,
          <div>
            <h1>6666</h1>
            <div>粉丝</div>
          </div>,
        ]}
      >
        <Card.Meta
          avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
          title="Card title"
          description="This is the description"
        />
      </Card>
    </div>
  );
};

export default UserInfo;
