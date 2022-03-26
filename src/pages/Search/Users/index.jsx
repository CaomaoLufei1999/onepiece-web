import {List, Avatar, Button, Skeleton, Space, Card} from 'antd';
import React from "react";
import * as ReactDOM from "react-dom";
import Home from "@/pages/Home";

const count = 15;
const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat,picture&noinfo`;

class SearchUsers extends React.Component {
  state = {
    initLoading: true,
    loading: false,
    data: [],
    list: [],
  };

  componentDidMount() {
    fetch(fakeDataUrl)
      .then(res => res.json())
      .then(res => {
        this.setState({
          initLoading: false,
          data: res.results,
          list: res.results,
        });
      });
  }

  onLoadMore = () => {
    this.setState({
      loading: true,
      list: this.state.data.concat(
        [...new Array(count)].map(() => ({loading: true, name: {}, picture: {}})),
      ),
    });
    fetch(fakeDataUrl)
      .then(res => res.json())
      .then(res => {
        const data = this.state.data.concat(res.results);
        this.setState(
          {
            data,
            list: data,
            loading: false,
          },
          () => {
            // Resetting window's offsetTop so as to display react-virtualized demo underfloor.
            // In real scene, you can using public method of react-virtualized:
            // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized
            window.dispatchEvent(new Event('resize'));
          },
        );
      });
  };

  render() {
    const {initLoading, loading, list} = this.state;
    const loadMore =
      !initLoading && !loading ? (
        <div
          style={{
            textAlign: 'center',
            marginTop: 12,
            height: 32,
            lineHeight: '32px',
          }}
        >
          <Button onClick={this.onLoadMore}>加载更多</Button>
        </div>
      ) : null;

    return (
      <Card bordered={false}>
        <List
          loading={initLoading}
          itemLayout="horizontal"
          loadMore={loadMore}
          dataSource={list}
          renderItem={item => (
            <List.Item
              actions={[
                <a key="follow">
                  <Button size={"small"} shape={"round"} style={{float: "right"}}>关 注</Button>
                </a>
              ]}
            >
              <Skeleton avatar title={false} loading={item.loading} active>
                <List.Item.Meta
                  avatar={
                    <Avatar src={item.picture.large}/>
                  }
                  title={
                    <Space>
                      <a style={{color: "black"}}>
                        <span style={{fontSize: "large"}}>
                          <b>
                            <span style={{color:"red"}}>Java</span>{item.name.last}
                          </b>
                        </span>
                      </a>
                      <span style={{float: "right", fontSize: "smaller"}}>
                        原创 <span>100</span><b style={{color: "gray"}}>｜</b>
                        关注 <span>99999</span><b style={{color: "gray"}}>｜</b>
                        点赞 <span>6666</span>
                      </span>
                    </Space>
                  }
                  description="2022年CSDN博客之星TOP8，CSDN博客专家，Java领域优质创作者，阿里巴巴全栈开发工程师。"
                />
              </Skeleton>
            </List.Item>
          )}
        />
      </Card>
    );
  }
}

export default SearchUsers;
