export const userReducer = (state = {userLogin : false, loading: false, user: {LessonStatus:null, info: null, TransactionHistory: null}},action) => {
    switch(action.type) {
        case 'USER_NOT_LOGGED':
        return { ...state, userLogin : false, loading: false, user: {LessonStatus:{}, info: {}, TransactionHistory: {}}}
        break;
        case 'USER_LOGGED':
        return { ...state, userLogin : true, loading: false, user: action.params}
        break;
        case 'USER_LOGING_IN':
        return { ...state, userLogin : true, loading: true}
        break;
        case 'USER_INDIA_SIM':
        return { ...state, userIN: true}
        break;
        case 'USER_UPDATE':
        return { ...state, user: {...state.user, ...action.params}}
        break;
        case 'USER_FIRESTORE_CREATE':
        return { ...state, user: {...state.user, ...action.params}}
        break;
        case 'USER_LESSONSTATUS_UPDATE':
        return { ...state, user: {...state.user, LessonStatus:{...state.user.LessonStatus, ...action.params}}}
        break;
        case 'USER_PRACTICE_END':
        return { ...state, user: {...state.user, LessonStatus:{...state.user.LessonStatus, ...action.params}}}
        break;
        default:
            return state;
    }
  }