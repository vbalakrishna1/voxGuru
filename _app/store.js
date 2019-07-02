'use strict'

// Redux
import { applyMiddleware, combineReducers, createStore, compose } from 'redux'
import { createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'

// Navigation
import { NavigatorTabOne } from './tabOne/navigationConfiguration'
import { NavigatorTabTwo } from './tabTwo/navigationConfiguration'
import { NavigatorTabThree } from './tabThree/navigationConfiguration'
import { tabBarReducer } from './drawer/navigationConfiguration'
import { modalReducer } from './modal/ModalNavigation'


const loggerMiddleware = createLogger()

const navMiddleWare = createReactNavigationReduxMiddleware(
  "root",
  state => (state.tabBar, state.tabOne, state.tabTwo, state.tabThree),
)
// Middleware
const middleware = () => {
  return applyMiddleware(
    navMiddleWare,
    thunk, // lets us dispatch() functions
    loggerMiddleware, // neat middleware that logs actions
  )
}



export default createStore(
  combineReducers({
    tabBar: tabBarReducer,
    
    modal: modalReducer, 

    tabOne: (state,action) => NavigatorTabOne.router.getStateForAction(action,state),

    tabTwo: (state,action) => NavigatorTabTwo.router.getStateForAction(action,state),

    tabThree: (state,action) => NavigatorTabThree.router.getStateForAction(action,state),
  }),
  middleware()
)
