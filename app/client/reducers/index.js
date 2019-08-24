import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import localForage from 'localforage'
import userReducer from './User'

const rootReducer = combineReducers({
  userReducer
})

const persistConfig = {
  key: 'root',
  storage: localForage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export default process.env.NODE_ENV === 'development' ? rootReducer : persistedReducer
