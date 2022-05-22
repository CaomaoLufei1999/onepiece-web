/**
 * 参考配置：https://pro.ant.design/zh-CN/docs/new-page
 * name:string 配置菜单的 name，如果配置了国际化，name 为国际化的 key。
 * icon:string 配置菜单的图标，默认使用 antd 的 icon 名，默认不适用二级菜单的 icon。
 * access:string 权限配置，需要预先配置权限
 * hideChildrenInMenu:true 用于隐藏不需要在菜单中展示的子路由。
 * hideInMenu:true 可以在菜单中不展示这个路由，包括子路由。
 * hideInBreadcrumb:true 可以在面包屑中不展示这个路由，包括子路由。
 * headerRender:false 当前路由不展示顶栏
 * footerRender:false 当前路由不展示页脚
 * menuRender: false 当前路由不展示菜单
 * menuHeaderRender: false 当前路由不展示菜单顶栏
 * flatMenu 子项往上提，只是不展示父菜单
 */
export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './User/Login',
          },
        ],
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/account',
    // layout: false,
    routes: [
      {
        path: '/account',
        routes: [
          {
            path: '/account',
            redirect: '/account/center',
          },
          {
            // name: 'center',
            path: '/account/center',
            component: './User/Account/Center',
          },
          {
            // name: 'setting',
            path: '/account/setting',
            component: './User/Account/Setting',
          },
          {
            path: '/account/write-blog',
            component: './Article/Editor',
          },
          {
            // name: 'message',
            path: '/account/message',
            component: './User/Account/Message',
          },
          {
            // name: 'message',
            path: '/account/control-blog',
            component: './User/Account/Manage',
          },
          {
            path: '/account/history',
            component: './User/Account/Center',
          },
          {
            // name: 'chat',
            path: '/account/chat',
            component: './User/Account/Message/WebChat',
          },
        ],
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/home',
    name: 'home',
    icon: 'home',
    component: './Home',
  },
  {
    path: '/search',
    name: 'search',
    hideChildrenInMenu: true,
    hideInBreadcrumb: false,
    hideInMenu: true, // 隐藏菜单中的路由
    menuRender: false,
    icon: 'search',
    component: './Search',
    routes: [
      {
        path: '/search/all',
        name: 'all',
        component: './Search/Complex',
      },
      {
        path: '/search/articles',
        name: 'articles',
        component: './Search/Articles',
      },
      {
        path: '/search/users',
        name: 'users',
        component: './Search/Users',
      },
      {
        path: '/search/posts',
        name: 'posts',
        component: './Search/Posts',
      },
      {
        path: '/search/problems',
        name: 'problems',
        component: './Search/Problems',
      },
      {
        path: '/search',
        redirect: '/search/all',
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/rank/list',
    name: 'rank.list',
    icon: 'trophy',
    // component: './Admin',
    routes: [
      {
        path: '/rank/list/total',
        name: 'total',
        component: './Rank',
      },
      {
        path: '/rank/list/weekly',
        name: 'weekly',
        component: './Rank',
      },
      {
        path: '/rank/list/blog',
        name: 'blog',
        component: './Rank',
      },
      {
        path: '/rank/list/content',
        name: 'content',
        component: './Rank',
      },
      {
        path: '/rank/list/resolve',
        name: 'resolve',
        component: './Rank',
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/talk',
    name: 'talk',
    icon: 'message',
    // component: './Talk',
    routes: [
      {
        path: '/talk/topic',
        name: 'topic',
        component: './Talk/Topic',
      },
      {
        path: '/talk/topic/activities',
        component: './Talk/Topic/ActivitiesPage',
      },
      {
        path: '/talk/topic/detail',
        component: './Talk/Topic/DetailPage',
      },
      {
        path: '/talk/advice',
        name: 'advice',
        component: './Talk/Advice',
      },
      {
        component: './404',
      },
    ],
  },
  {
    name: 'blog',
    icon: 'edit',
    path: '/community',
    // component: './Community',
    // path: '/community/back-end',
    component: './Community',
    exact: false,
    routes: [
      {
        path: '/community/back-end',
        component: './Community',
        exact: false,
      },
      {
        path: '/community/database',
        component: './Community',
        exact: false,
      },
      {
        path: '/community/front-end',
        component: './Community',
        exact: false,
      },
      {
        path: '/community/algorithm',
        component: './Community',
        exact: false,
      },
      {
        path: '/community/procedural-life',
        component: './Community',
        exact: false,
      },
      {
        path: '/community/study-notes',
        component: './Community',
        exact: false,
      },
      {
        path: '/community/other',
        component: './Community',
        exact: false,
      },
    ],
  },
  {
    path: '/article',
    routes: [
      {
        path: '/article/detail',
        component: './Article/Viewer',
        exact: false,
      },
      {
        path: '/article/edit',
        component: './Article/Editor',
        headerRender: false, // 当前路由不展示顶栏
        footerRender: false, // 当前路由不展示页脚
      },
    ],
  },
  {
    path: '/schedule-study',
    name: 'schedule-study',
    icon: 'schedule',
    // component: './Admin',
    routes: [
      {
        path: '/schedule-study/algorithm',
        name: 'algorithm',
        component: './ScheduleStudy/AlgorithmList',
      },
      {
        path: '/schedule-study/algorithm/detail',
        hideChildrenInMenu:true,
        component: './ScheduleStudy/Algorithm',
      },
      {
        path: '/schedule-study/sql',
        name: 'sql',
        component: './ScheduleStudy/Sql',
      },
      {
        path: '/schedule-study/program',
        name: 'program',
        component: './ScheduleStudy/Program',
        disabled: true,
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/knowledge-tree',
    name: 'knowledge-tree',
    icon: 'cluster',
    component: './Admin',
    routes: [
      {
        path: '/knowledge-tree/java',
        name: 'java',
        component: './Home',
        disabled: true,
      },
      {
        path: '/knowledge-tree/python',
        name: 'python',
        component: './Home',
        disabled: true,
      },
      {
        path: '/knowledge-tree/web',
        name: 'web',
        component: './Home',
        disabled: true,
      },
      {
        path: '/knowledge-tree/precious',
        name: 'precious',
        component: './Home',
        disabled: true,
      },
      {
        path: '/knowledge-tree/other',
        name: 'other',
        component: './Home',
        disabled: true,
      },
      {
        component: './404',
      },
    ],
  },
  {
    name: 'read-book',
    icon: 'read',
    path: '/read-book',
    component: './Read',
  },
  {
    path: '/read-book/detail',
    component: './Read/BookDetail',
    hideInMenu: true, // 隐藏菜单中的路由
  },
  {
    name: 'about-me',
    icon: 'user',
    path: 'https://blog.csdn.net/weixin_43591980?type=blog',
    // path: '/about-me',
    // component: './TableList',
  },
  {
    path: '/tools',
    name: 'tools',
    icon: 'tool',
    // component: './Admin',
    routes: [
      {
        path: '/tools',
        redirect: '/tools/editor-flow',
      },
      {
        path: '/tools/editor-flow',
        name: 'editor-flow',
        component: './Tools/Flow',
      },
      {
        path: '/tools/editor-koni',
        name: 'editor-koni',
        component: './Tools/Koni',
      },
      {
        path: '/tools/editor-mind',
        name: 'editor-mind',
        component: './Tools/Mind',
      },
      {
        path: '/tools/code-paste',
        name: 'code-paste',
        component: './Tools/CodePaste',
      },
      {
        path: '/tools/resume-make',
        name: 'resume-make',
        component: './Tools/ResumeMaking',
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/',
    redirect: '/home',
  },
  {
    component: './404',
  },
];
