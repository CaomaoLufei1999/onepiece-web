import {GridContent} from "@ant-design/pro-layout";
import React, { useState } from 'react'
import { Chat, ContactList } from '../WebChat/JwChat/components'
import { contact, contactList, messageList, my } from './mock'
import {Col, Row} from "antd";

const WebChat = () => {
  const [msgList, setMsgList] = useState(messageList);
  return(
    <GridContent>
      <Row>
        <Col lg={16} offset={3}>
          <div style={{ display: 'flex' }}>
            <div>
              <ContactList
                data={contactList}
                style={{
                  marginRight: 10,
                  height: 500,
                  borderRadius: 5,
                  overflow: 'hidden',
                  width: 240,
                }}
              />
            </div>
            <div>
              <Chat
                contact={contact}
                me={my}
                chatList={msgList}
                onSend={(msg) => setMsgList([...msgList, msg])}
                onEarlier={() => console.log('EarlierEarlier')}
                style={{
                  width: 600,
                  height: 500,
                  borderRadius: 5,
                }}
              />
            </div>
          </div>
        </Col>
      </Row>
    </GridContent>
  );
}

export default WebChat;
