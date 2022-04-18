import React, { useState, useRef, useLayoutEffect } from 'react';
import { GridContent } from '@ant-design/pro-layout';
import {Badge, Button, Menu} from 'antd';
import SecurityView from "@/pages/User/Account/Setting/components/security";
import BindingView from "@/pages/User/Account/Setting/components/binding";
import NotificationView from "@/pages/User/Account/Setting/components/notification";
import BaseView from "@/pages/User/Account/Setting/components/base";
import styles from './style.less';
import Comment from "@/pages/User/Account/Message/Comment";
import {DeleteOutlined} from "@ant-design/icons";
import Follow from "@/pages/User/Account/Message/Follow";
import LikeAndStar from "@/pages/User/Account/Message/LikeAndStar";
import SystemNotification from "@/pages/User/Account/Message/SystemNotification";
const { Item } = Menu;

const Message = () => {
  const menuMap = {
    comment: '评论',
    follow: '关注',
    likeAndStar: '点赞和收藏',
    chat: '私信',
    systemNotification: '系统通知',
  };
  const [initConfig, setInitConfig] = useState({
    mode: 'inline',
    selectKey: 'comment',
  });
  const dom = useRef();

  const resize = () => {
    requestAnimationFrame(() => {
      if (!dom.current) {
        return;
      }

      let mode = 'inline';
      const { offsetWidth } = dom.current;

      if (dom.current.offsetWidth < 641 && offsetWidth > 400) {
        mode = 'horizontal';
      }

      if (window.innerWidth < 768 && offsetWidth > 400) {
        mode = 'horizontal';
      }

      setInitConfig({ ...initConfig, mode: mode });
    });
  };

  useLayoutEffect(() => {
    if (dom.current) {
      window.addEventListener('resize', resize);
      resize();
    }

    return () => {
      window.removeEventListener('resize', resize);
    };
  }, [dom.current]);

  const getMenu = () => {
    return Object.keys(menuMap).map((item) => <Item key={item}><Badge  offset={[5, 3]} dot>{menuMap[item]}</Badge></Item>);
  };

  const renderChildren = () => {
    const { selectKey } = initConfig;

    switch (selectKey) {
      case 'comment':
        return <Comment />;

      case 'follow':
        return <Follow />;

      case 'systemNotification':
        return <SystemNotification />;

      case 'likeAndStar':
        return <LikeAndStar />;

      default:
        return null;
    }
  };
  return(
    <GridContent>
      <div
        className={styles.main}
        ref={(ref) => {
          if (ref) {
            dom.current = ref;
          }
        }}
      >
        <div className={styles.leftMenu}>
          <Menu
            mode={initConfig.mode}
            selectedKeys={[initConfig.selectKey]}
            onClick={({ key }) => {
              setInitConfig({ ...initConfig, selectKey: key });
            }}
          >
            {getMenu()}
          </Menu>
        </div>
        <div className={styles.right}>
          <div className={styles.title}>
            {menuMap[initConfig.selectKey]}
            <Button type={"default"} style={{float:"right"}}><DeleteOutlined />清空所有消息</Button>
          </div>
          {renderChildren()}
        </div>
      </div>
    </GridContent>
  );
}

export default Message;
