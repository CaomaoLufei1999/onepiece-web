import React, { useEffect, useState } from 'react';
import { Button, Comment, Avatar, Input, Row, Col, Space, Select, Popover } from 'antd';
import {
  ManOutlined,
  SmileOutlined,
  NotificationOutlined,
  CustomerServiceOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import EmojiPicker from '../EmojiPicker';

let tempTextAreaData = '';

const TextEditor = (props) => {
  const { isBordered, isShow, isAvatar, isChoiceActivity } = props;
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(false);
  const loadActivitiesList = () => {
    if (loading) {
      return;
    }
    setLoading(true);
    fetch(`http://localhost:3000/topic_activity`)
      .then((res) => res.json())
      .then((body) => {
        const arr = [...body]; //克隆的时候改变地址
        arr.splice(index, 1);
        setActivities(arr);
        setLoading(false);
        console.log(arr, activities);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  // 保存输入框的内容
  const [chatContent, setChatContent] = useState('');
  // 标识表情包是否显示
  const [showEmojiModal, setShowEmojiModal] = useState(false);

  // 输入框内容更改的回调函数
  const onChatContentChange = (value) => {
    setChatContent(value);
    tempTextAreaData = value;
  };

  const insertAtCursor = (myField, myValue) => {
    if (document.selection) {
      //IE support
      myField.focus();
      const sel = document.selection.createRange();
      sel.text = myValue;
      sel.select();
    } else if (myField.selectionStart || myField.selectionStart == '0') {
      //MOZILLA/NETSCAPE support
      const startPos = myField.selectionStart;
      const endPos = myField.selectionEnd;
      const beforeValue = myField.value.substring(0, startPos);
      const afterValue = myField.value.substring(endPos, myField.value.length);

      tempTextAreaData = beforeValue + myValue + afterValue;
      setChatContent(tempTextAreaData);
      myField.selectionStart = startPos + myValue.length;
      myField.selectionEnd = startPos + myValue.length;
      myField.focus();
    } else {
      tempTextAreaData += myValue;
      setChatContent(tempTextAreaData);
      myField.focus();
    }
  };

  // 选中表情的回调函数
  const searchEmoji = (emoji) => {
    let dom = document.getElementById('textarea');
    insertAtCursor(dom, emoji.native);
    setShowEmojiModal(false);
  };

  // 表情包展示
  const showEmoji = () => {
    setShowEmojiModal(!showEmojiModal);
  };

  return (
    <div style={isShow === true ? null : { visibility: 'hidden' }}>
      <Comment
        avatar={
          isAvatar === true ? (
            <Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />
          ) : null
        }
        content={
          <div>
            {/*<div direction="vertical" size="middle" style={{ display: 'flex' }}>*/}
            {/*{*/}
            {/*  choiceActivity.length > 0 ?*/}
            {/*  <div>*/}
            {/*    <span>发布于</span>*/}
            {/*    <Tag icon={<CustomerServiceOutlined />} color='#1890FF' closable onClose={preventDefault}>*/}
            {/*      {choiceActivity}*/}
            {/*    </Tag>*/}
            {/*  </div> : null*/}
            {/*}*/}

            <Input.TextArea
              id="textarea"
              rows={4}
              value={chatContent}
              onChange={(e) => onChatContentChange(e.target.value)}
              placeholder="有什么新的观点，快来说说看~"
              showCount={true}
              bordered={isBordered}
            />

            <div style={isChoiceActivity === true ? null : { visibility: 'hidden' }}>
              <Select
                dropdownMatchSelectWidth={false}
                // dropdownStyle={{ width: 200 }}
                allowClear
                bordered={false}
                // onChange={handleChange}
                showArrow={false}
                placeholder="未选择活动"
                suffixIcon={<PlusOutlined />}
                onDropdownVisibleChange={loadActivitiesList}
              >
                {/*<Select.Option value='灌水乐园'>*/}
                {/*  <Space>*/}
                {/*    <Col>*/}
                {/*      <img src='https://randomuser.me/api/portraits/thumb/men/85.jpg' alt=""/>*/}
                {/*    </Col>*/}
                {/*    <Col>*/}
                {/*      <Space direction="vertical">*/}
                {/*        <div>灌水乐园</div>*/}
                {/*        <div>666人参与</div>*/}
                {/*      </Space>*/}
                {/*    </Col>*/}
                {/*  </Space>*/}
                {/*</Select.Option>*/}

                {activities.length > 0
                  ? activities.map((item) => (
                      <Select.Option value={item.title}>
                        <Space>
                          <Col>
                            <img src={item.picture.thumbnail} alt="" />
                          </Col>
                          <Col>
                            <Space direction="vertical">
                              <div>{item.title}</div>
                              <div>{item.browseNum}</div>
                            </Space>
                          </Col>
                        </Space>
                      </Select.Option>
                    ))
                  : null}
              </Select>
            </div>

            <div style={{ borderBottom: '1px solid #E8E8ED', marginBottom: 10 }}></div>

            <Row justify="space-between">
              <Col>
                <Popover
                  content={<EmojiPicker onEmojiSelect={(emoji) => searchEmoji(emoji)} />}
                  trigger="click"
                  visible={showEmojiModal}
                  placement="bottomLeft"
                  onVisibleChange={showEmoji}
                >
                  <Button type="text">
                    {' '}
                    <SmileOutlined />
                    表情{' '}
                  </Button>
                </Popover>
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
