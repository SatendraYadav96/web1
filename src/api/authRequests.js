import { createRequest } from './httpUtils'
import { LOGIN_API, USER_PROFILE_API } from './apiConstants'

export const authRequest = (payload) => createRequest(LOGIN_API, null, payload.data)

export const userProfileRequest = (payload) => {
  return createRequest(USER_PROFILE_API, payload.certificate, null)
}
