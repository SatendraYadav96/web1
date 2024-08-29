import {GET_PHYSICAL_SAMPLING_REPORT_FAIL, GET_PHYSICAL_SAMPLING_REPORT_START, GET_PHYSICAL_SAMPLING_REPORT_SUCCESS} from "./physicalSamplingReportActionConstants";

export const getPhysicalSamplingReportStartAction = (payload) => (dispatch) =>{
    dispatch({
        type: GET_PHYSICAL_SAMPLING_REPORT_START,
        payload: payload,
    })
}

export const getPhysicalSamplingReportSuccessAction = (payload) => (dispatch) => {
    dispatch({
        type: GET_PHYSICAL_SAMPLING_REPORT_SUCCESS,
        payload: payload,
    })
}

export const getPhysicalSamplingReportFailAction = (payload) => (dispatch) =>{
    dispatch({
        type: GET_PHYSICAL_SAMPLING_REPORT_FAIL,
        payload: payload,
    })
}
