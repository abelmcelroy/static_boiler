import * as types from '../../utils/actionTypes'
import * as Sentry from '@sentry/browser'

const authState = {
  fetching: false,
  error: null,
  email: '',
  isLoggedIn: false
}

function trackUser(email) {
  mixpanel.register({
    email: email
  })
  Sentry.withScope((scope) => {
    scope.setUser({ "email": email });
  })
}

export default function auth(state = authState, action) {
  switch (action.type) {
    case types.LOGGING_IN:
      return {
        ...state,
        fetching: true
      }
    case types.LOGGED_IN:
      trackUser(action.email)
      return {
        ...state,
        email: action.email,
        isLoggedIn: true,
        fetching: false
      }
    case types.LOGIN_ERROR:
      return {
        ...state,
        error: action.error,
        fetching: false
      }
    case types.SIGNING_UP:
      return {
        ...state,
        fetching: true
      }
    case types.SIGNED_UP:
      trackUser(action.email)
      return {
        ...state,
        email: action.email,
        isLoggedIn: true,
        fetching: false
      }
    case types.SIGNUP_ERROR:
      return {
        ...state,
        error: action.error,
        fetching: false
      }
    default:
      return state
  }
}