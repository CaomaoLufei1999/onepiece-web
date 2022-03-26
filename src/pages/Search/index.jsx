import {PageContainer} from '@ant-design/pro-layout';
import {Input} from 'antd';
import {history} from 'umi';

const tabList = [
  {
    key: 'all',
    tab: '综合',
  },
  {
    key: 'articles',
    tab: '文章',
  },
  {
    key: 'posts',
    tab: '帖子',
  },
  {
    key: 'problems',
    tab: '题目',
  },
  {
    key: 'users',
    tab: '用户',
  },
];

const Search = (props) => {
  const handleTabChange = (key) => {
    const {match} = props;
    const url = match.url === '/' ? '' : match.url;

    switch (key) {
      case 'all':
        history.push(`${url}/all`);
        break;

      case 'articles':
        history.push(`${url}/articles`);
        break;

      case 'posts':
        history.push(`${url}/posts`);
        break;

      case 'problems':
        history.push(`${url}/problems`);
        break;

      case 'users':
        history.push(`${url}/users`);
        break;

      default:
        break;
    }
  };

  const handleFormSubmit = (value) => {
    // eslint-disable-next-line no-console
    console.log(value);
  };

  const getTabKey = () => {
    const {match, location} = props;
    const url = match.path === '/' ? '' : match.path;
    const tabKey = location.pathname.replace(`${url}/`, '');

    if (tabKey && tabKey !== '/') {
      return tabKey;
    }

    return 'articles';
  };

  return (
    <PageContainer
      content={
        <div
          style={{
            textAlign: 'center',
          }}
        >
          <Input.Search
            placeholder="请输入"
            enterButton="搜索"
            size="large"
            onSearch={handleFormSubmit}
            style={{
              maxWidth: 522,
              width: '100%',
            }}
          />
        </div>
      }
      tabList={tabList}
      tabActiveKey={getTabKey()}
      onTabChange={handleTabChange}
    >
      {props.children}
    </PageContainer>
  );
};

export default Search;
