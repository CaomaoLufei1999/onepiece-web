import React, { useState } from 'react';
import { Button, Comment, Avatar, Input, Row, Col, Space, Select } from 'antd';
import { ManOutlined, SmileOutlined, NotificationOutlined } from '@ant-design/icons';
import EmojiPicker from '../EmojiPicker';

let tempTextAreaData = '';

const TextEditor = (props) => {
  // 保存输入框的内容
  const [chatContent, setChatContent] = useState('');
  // 标识表情包是否显示
  const [showEmojiModal, setShowEmojiModal] = useState(false);
  const inputRef = React.createRef();

  // 输入框内容更改的回调函数
  const onChatContentChange = (value) => {
    setChatContent(value);
    tempTextAreaData = value;
    console.log('输入框内容：', chatContent, '，输入框内容长度：', chatContent.length);
    console.log('输入框内容：', tempTextAreaData, '，输入框内容长度：', tempTextAreaData.length);
  };

  // 选中表情的回调函数
  const searchEmoji = (emoji, event) => {
    console.log('新增加的表情：', emoji);
    console.log('临时文本框数据：：', tempTextAreaData);
    console.log('表情内容长度：', chatContent.length, '，表情内容：', chatContent);
    // const newChatContent = chatContent.length > 0 ? chatContent + emoji.native : emoji.native;
    const newChatContent =
      tempTextAreaData.length > 0 ? tempTextAreaData + emoji.native : emoji.native;
    console.log('新增表情后的内容长度：', newChatContent.length, '，表情内容：', newChatContent);
    tempTextAreaData = newChatContent;
    setChatContent(newChatContent);
  };

  // 表情包展示
  const showEmoji = () => {
    setShowEmojiModal(!showEmojiModal);
  };

  // 表情包的气泡卡片内容
  const content = (
    <div style={showEmojiModal === true ? null : { display: 'none' }}>
      <EmojiPicker onEmojiSelect={console.log} showPreview={false} />
    </div>
  );
  // 活动的气泡卡片内容
  const activitiesContent = <Select></Select>;

  return (
    <div style={props.isShow === true ? null : { display: 'none' }}>
      <Comment
        avatar={
          props.isAvatar === true ? (
            <Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />
          ) : null
        }
        content={
          <div>
            <Input.TextArea
              ref={inputRef}
              rows={4}
              value={chatContent}
              onChange={(e) => onChatContentChange(e.target.value)}
            />

            <Row justify="space-between">
              <Col>
                <Space>
                  {/*<Popover content={content}>*/}
                  <div onClick={showEmoji}>
                    <SmileOutlined />
                    表情
                    <div style={showEmojiModal === true ? null : { display: 'none' }}>
                      <EmojiPicker
                        onEmojiSelect={(emoji, event) => searchEmoji(emoji, event)}
                        // onEmojiSelect={console.log}
                        disableSearchBar={true}
                      />
                    </div>
                  </div>
                  {/*</Popover>*/}

                  {/*<Popover content={activitiesContent}>*/}
                  <div>
                    <NotificationOutlined />
                    活动
                  </div>
                  {/*</Popover>*/}
                </Space>
              </Col>

              <Col>
                <Button
                  htmlType="submit"
                  // onClick={send}
                  type="primary"
                >
                  <ManOutlined />
                  发布
                </Button>
              </Col>
            </Row>
          </div>
        }
      />
    </div>
  );
};

export default TextEditor;
