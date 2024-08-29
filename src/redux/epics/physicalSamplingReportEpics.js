import { ofType } from 'redux-observable'
import { catchError, debounceTime, from, map, of, switchMap } from 'rxjs'
import { getPhysicalSamplingReportRequest} from '../../api/reportRequests'
import {GET_PHYSICAL_SAMPLING_REPORT_START} from "../actions/reports/physicalSamplingReportActionConstants";
import {getPhysicalSamplingReportFailAction, getPhysicalSamplingReportSuccessAction} from "../actions/reports/physicalSamplingReportActions";



//PHYSICAL_SAMPLING_REPORT
export const getPhysicalSamplingReportStartEpic = (action$) =>
    action$.pipe(
        ofType(GET_PHYSICAL_SAMPLING_REPORT_START),
        debounceTime(4000),
        switchMap((action) =>
            getPhysicalSamplingReportRequest(action.payload).pipe(
                map((listResponse) => getPhysicalSamplingReportSuccessAction({physicalSamplingList: listResponse.response})),
                catchError((error) => of(getPhysicalSamplingReportFailAction({error: error}))),
            )
        )
    )
