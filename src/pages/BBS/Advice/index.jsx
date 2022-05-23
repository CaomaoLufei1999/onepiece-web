import TopicInfo from '@/pages/BBS/Topic/components/TopicInfo';
import TextEditor from '@/pages/BBS/Topic/components/TextEditor';
import { Card, Space } from 'antd';
import React from 'react';
import { GridContent } from '@ant-design/pro-layout';

const Advice = () => {
  return (
    <GridContent>
      <Space direction="vertical" size={20}>
        <Card>
          <TextEditor isShow={true} isAvatar={false} isBordered={false} isChoiceActivity={true} />
        </Card>

        <TopicInfo showComment={false} />
      </Space>
    </GridContent>
  );
};

export default Advice;
