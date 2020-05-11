import isomorphicCookie from 'isomorphic-cookie';
import React from 'react';

const Confirm = import(
  /* webpackChunkName: 'confirm' */ '../components/confirm'
);
const routes = [
  {
    action({ next }) {
      return next();
    },
    children: [
      {
        load: () =>
          import(/* webpackChunkName: 'login' */ '../components/login'),
        path: '/login',
      },
    ],
    path: '',
  },
  {
    load: () => import(/* webpackChunkName: 'signup' */ '../components/signup'),
    path: '/signup',
  },
  {
    load: () =>
      import(/* webpackChunkName: 'confirm' */ '../components/confirm'),
    path: '/auth/confirm',
    // action : (props) => <Confirm {...props} />
  },
  {
    async action({ next, token }) {
      // Execute each child route until one of them return the result
      const route = await next();
      // Off auth
      if (!isomorphicCookie.load('token') && !token) route.redirect = '/login';
      // Provide default values for title, description etc.
      route.title = `${route.title || 'Untitled Page'}`;
      route.description = route.description || '';

      return route;
    },
    // Keep in mind, routes are evaluated in order
    children: [
      // Wildcard routes, e.g. { path: '(.*)', ... } (must go last)
      {
        load: () =>
          import(/* webpackChunkName: 'profile' */ '../components/profile'),
        path: '/',
      },
      {
        load: () =>
          import(/* webpackChunkName: 'about' */ '../components/about'),
        path: '/about',
      },
      {
        load: () =>
          import(/* webpackChunkName: 'chats' */ '../components/Chats'),
        path: '/chats',
      },
      {
        load: () =>
          import(/* webpackChunkName: 'not-found' */ '../components/not-found'),
        path: '(.+)',
      },
    ],
    path: '',
    protected: true,
  },
];

// The error page is available by permanent url for development mode
// if (__DEV__) {
//   routes[2].children.unshift({
//     action: require('../components/error').default,
//     path: '/error',
//   });
// }

export default routes;

// /* eslint-disable global-require */
// import isomorphicCookie from 'isomorphic-cookie';
// import React from 'react'
// const Confirm = React.lazy(()=> import(/* webpackChunkName: 'confirm' */ '../components/confirm'))
//
//
// const routes = [
//   {
//     action({ next }) {
//       return next();
//     },
//     children: [
//       {
//         load: () =>
//           import(/* webpackChunkName: 'login' */ '../components/login'),
//         path: '/login',
//       },
//     ],
//     path: '',
//   },
//   {
//     load: () => import(/* webpackChunkName: 'signup' */ '../components/signup'),
//     path: '/signup',
//   },
//   {
//     action: (props) => <Confirm {...props} />,
//     path: '/auth/confirm'
//   },
//   {
//     async action({ next, token }) {
//       // Execute each child route until one of them return the result
//       const route = await next();
//       // Off auth
//       if (!isomorphicCookie.load('token') && !token) route.redirect = '/login';
//       // Provide default values for title, description etc.
//       route.title = `${route.title || 'Untitled Page'}`;
//       route.description = route.description || '';
//
//       return route;
//     },
//     // Keep in mind, routes are evaluated in order
//     children: [
//       // Wildcard routes, e.g. { path: '(.*)', ... } (must go last)
//       {
//         load: () =>
//           import(/* webpackChunkName: 'profile' */ '../components/profile'),
//         path: '/',
//       },
//       {
//         load: () =>
//           import(/* webpackChunkName: 'about' */ '../components/about'),
//         path: '/about',
//       },
//       {
//         load: () =>
//           import(/* webpackChunkName: 'about' */ '../components/Chats'),
//         path: '/chats',
//       },
//       {
//         load: () =>
//           import(/* webpackChunkName: 'not-found' */ '../components/not-found'),
//         path: '(.+)',
//       },
//     ],
//     path: '',
//     protected: true,
//   },
// ];
//
// // The error page is available by permanent url for development mode
// // if (__DEV__) {
// //   routes[2].children.unshift({
// //     action: require('../components/error').default,
// //     path: '/error',
// //   });
// // }
//
// export default routes;
