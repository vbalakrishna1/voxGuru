import { NavigationActions } from 'react-navigation';

// import { GoogleAnalyticsTracker } from 'react-native-google-analytics-bridge';

// const tracker = new GoogleAnalyticsTracker(GA_TRACKING_ID);

export const screenTracking = store => ({dispatch}) => action => {
  if(action.routeName) {
    console.log(action.routeName);
  }
  dispatch(action)
};

 