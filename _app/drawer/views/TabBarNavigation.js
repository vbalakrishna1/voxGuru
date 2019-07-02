'use strict'

// React
import React from 'react'

// Navigation
import { addNavigationHelpers } from 'react-navigation'
import { TabBar } from '../navigationConfiguration'

//Redux
import { connect } from 'react-redux'
import { createReduxBoundAddListener } from 'react-navigation-redux-helpers'

const addListener = createReduxBoundAddListener("root");

const mapStateToProps = (state) => {
 return {
  navigationState: state.tabBar,
  }
}

class TabBarNavigation extends React.Component {

  render(){
    const { dispatch, navigationState } = this.props
    return (
      <TabBar
        navigation={
          addNavigationHelpers({
            dispatch: dispatch,
            state: navigationState,
            addListener,
            
          })
        }
      />
    )
  }
}

export default connect(mapStateToProps)(TabBarNavigation)
