'use strict'
import { TabNavigator, DrawerNavigator } from 'react-navigation'

// Tab-Navigators
import TabOneNavigation from '../tabOne/views/TabOneNavigation'
import TabTwoNavigation from '../tabTwo/views/TabTwoNavigation'
import TabThreeNavigation from '../tabThree/views/TabThreeNavigation'


const routeConfiguration = {
  TabOneNavigation: { screen: TabOneNavigation, path: 'TabOneNavigation' },
  TabTwoNavigation: { screen: TabTwoNavigation, path: 'TabTwoNavigation' },
  TabThreeNavigation: { screen: TabThreeNavigation, path: 'TabThreeNavigation'  },
}

const drawerConfiguration = {
  //...other configs
drawerOptions:{
//     // tint color is passed to text and icons (if enabled) on the tab bar
//     activeTintColor: 'white',
//     inactiveTintColor: 'blue',
// // background color is for the tab component
//     activeBackgroundColor: 'blue',
//     inactiveBackgroundColor: 'white',

  drawerWidth: 250,
  drawerPosition: 'left',
  drawerOpenRoute: 'DrawerOpen',
  drawerCloseRoute: 'DrawerClose',
  drawerToggleRoute: 'DrawerToggle',
  initialRouteName: 'TabOneNavigation',
  }
}

export const TabBar = DrawerNavigator(routeConfiguration,drawerConfiguration)

export const tabBarReducer = (state,action) => {
  if (action.type === 'JUMP_TO_TAB') {
    // console.error(state);
    return { ...state, index:2 }
    // return { ...state, index: 0}
  } else {
    return TabBar.router.getStateForAction(action,state)
  }
}
