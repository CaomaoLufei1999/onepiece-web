import {List, Avatar, Button, Skeleton, Space} from 'antd';
import React from "react";
import * as ReactDOM from "react-dom";
import Home from "@/pages/Home";

const count = 3;
const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat,picture&noinfo`;

class RecommendUsers extends React.Component {
  state = {
    initLoading: true,
    loading: false,
    data: [],
    // list: [],
    goodAuthorList: []
  };

  componentDidMount() {
    fetch('http://localhost:3000/home_good_author_list')
      .then(res => res.json())
      .then(body => {
        this.setState({
          initLoading: false,
          data: [...body],
          goodAuthorList: [...body],
        });
      });
  }

  onLoadMore = () => {
    this.setState({
      loading: true,
    });
    fetch('http://localhost:3000/home_good_author_list')
      .then(res => res.json())
      .then(body => {
        const data = this.state.data.concat([...body]);
        this.setState(
          {
            data,
            goodAuthorList: data,
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
    const {initLoading, loading, goodAuthorList} = this.state;
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
      <List
        loading={initLoading}
        itemLayout="horizontal"
        loadMore={loadMore}
        dataSource={goodAuthorList}
        renderItem={item => (
          <List.Item>
            <Skeleton avatar title={false} loading={item.loading} active>
              <List.Item.Meta
                avatar={
                  <Avatar src={item.avatar}/>
                }
                title={
                  <Space>
                    <a href={item.href}>{item.name}</a>
                    <Button size={"small"} shape={"round"}>关 注</Button>
                  </Space>
                }
                description={item.desc}
              />
            </Skeleton>
          </List.Item>
        )}
      />
    );
  }
}

export default RecommendUsers;
