import { createReducer } from './reducerUtils'
import {GET_LOV_FAIL, GET_LOV_SUCCESS} from "../actions/widget/widgetActionConstants";
const initialState = {
  lovs:{},
  loaded: {},
  error: null,
}

const lovSuccessReducer = (state = initialState, payload) => {
  return {
    ...state,
    lovs: {
        ...state.lovs,
        [payload.type]: payload.lovs
    },
    error: null,
  }
}

const lovFailReducer = (state = initialState, payload) => {
  return {
    ...state,
    error: payload.error,
  }
}


export default createReducer(initialState, {
  [GET_LOV_SUCCESS]: lovSuccessReducer,
    [GET_LOV_FAIL]: lovFailReducer
})
