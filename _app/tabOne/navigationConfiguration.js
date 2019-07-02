'use strict'

import { StackNavigator } from 'react-navigation'

// Screens
import TabOneScreenOne from './views/TabOneScreenOne'
import TabOneScreenTwo from './views/TabOneScreenTwo'

const routeConfiguration = {
  TabOneScreenOne: { screen: TabOneScreenOne, path: 'TabOneScreenOne' },
  TabOneScreenTwo: { screen: TabOneScreenTwo, path: 'TabOneScreenTwo' },
}

// going to disable the header for now
const stackNavigatorConfiguration = {
  headerMode: 'none',
  initialRouteName: 'TabOneScreenOne'
}

export const NavigatorTabOne = StackNavigator(routeConfiguration,stackNavigatorConfiguration)
