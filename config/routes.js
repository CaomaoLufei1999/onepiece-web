export default [
  {
    path: '/User',
    layout: false,
    routes: [
      {
        path: '/User',
        routes: [
          {
            name: 'login',
            path: '/User/login',
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
    hideInMenu: true,// 隐藏菜单中的路由
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
    component: './Admin',
    routes: [
      {
        path: '/rank/list/total',
        name: 'total',
        component: './Home',
      },
      {
        path: '/rank/list/weekly',
        name: 'weekly',
        component: './Home',
      },
      {
        path: '/rank/list/blog',
        name: 'blog',
        component: './Home',
      },
      {
        path: '/rank/list/content',
        name: 'content',
        component: './Home',
      },
      {
        path: '/rank/list/resolve',
        name: 'resolve',
        component: './Home',
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
    component: './Admin',
    routes: [
      {
        path: '/talk/blink',
        name: 'blink',
        component: './Home',
      },
      {
        path: '/talk/topic',
        name: 'topic',
        component: './Home',
      },
      {
        path: '/talk/advice',
        name: 'advice',
        component: './Home',
      },
      {
        component: './404',
      },
    ],
  },
  {
    name: 'blog',
    icon: 'edit',
    path: '/blog',
    component: './TableList',
  },
  {
    path: '/schedule-study',
    name: 'schedule-study',
    icon: 'schedule',
    component: './Admin',
    routes: [
      {
        path: '/schedule-study/algorithm',
        name: 'algorithm',
        component: './Home',
      },
      {
        path: '/schedule-study/sql',
        name: 'sql',
        component: './Home',
      },
      {
        path: '/schedule-study/program',
        name: 'program',
        component: './Home',
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
      },
      {
        path: '/knowledge-tree/python',
        name: 'python',
        component: './Home',
      },
      {
        path: '/knowledge-tree/web',
        name: 'web',
        component: './Home',
      },
      {
        path: '/knowledge-tree/precious',
        name: 'precious',
        component: './Home',
      },
      {
        path: '/knowledge-tree/other',
        name: 'other',
        component: './Home',
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
    component: './TableList',
  },
  {
    name: 'about-me',
    icon: 'user',
    path: '/about-me',
    component: './TableList',
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
        path: '/tools/editor-code',
        name: 'editor-code',
        component: './Home',
      },
      {
        path: '/tools/editor-map',
        name: 'editor-map',
        component: './Home',
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
