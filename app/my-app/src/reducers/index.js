import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import menuReducer from './menuReducer'
import userReducer from './userReducer'

export default combineReducers({
    menuReducer,
    form: formReducer,
    userReducer
})