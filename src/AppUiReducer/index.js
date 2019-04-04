export const appUiReducer = (state,action) => {
    switch(action.type) {
        case 'INTIAL_UI':
        return { ...state, ...action.params, isLoading: false}
        case 'IS_LOADING':
        return {...state, isLoading: true}
        break;
        default:
            return {...state};
    }
  }