import {
    createReactNavigationReduxMiddleware,
    createReduxBoundAddListener,
  } from 'react-navigation-redux-helpers';
  
  const navMiddleWare = createReactNavigationReduxMiddleware(
    "root",
    state => state.nav,
  );
  const addListener = createReduxBoundAddListener("root");
  
  export {
    navMiddleWare,
    addListener,
  };