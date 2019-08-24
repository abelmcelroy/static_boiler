import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers'
import thunkMiddleware from 'redux-thunk'; // https://github.com/gaearon/redux-thunk // https://github.com/evgenyrodionov/redux-logger
import { createLogger } from 'redux-logger' // https://github.com/gaearon/redux-thunk
import promiseMiddleware from 'redux-promise'; // https://www.npmjs.com/package/redux-promise
import * as Sentry from '@sentry/browser'

// //added functionality for the chrome dev tools redux store extension
// export default createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), applyMiddleware(thunkMiddleware, loggingMiddleware), )

const breadcrumber = store => next => action => {
  try {
    Sentry.addBreadcrumb({
      category: 'action',
      message: `type: ${action.type}`
    });
    return next(action)
  } catch (err) {
    Sentry.captureException(err, {
      extra: {
        action,
        state: store.getState()
      }
    })
    throw err
  }
}

const middleWare = [promiseMiddleware, thunkMiddleware, breadcrumber]

if (process.env.NODE_ENV !== 'production') {
  const reduxLoggerMiddleware = new createLogger({
    collapsed: true,
  })
  middleWare.push(reduxLoggerMiddleware)
}

export const store = createStore(
  rootReducer,
  applyMiddleware(...middleWare),
)
