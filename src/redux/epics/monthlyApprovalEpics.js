import { ofType } from 'redux-observable'
import { catchError, debounceTime, from, map, of, switchMap } from 'rxjs'
import {GET_MONTHLY_APPROVAL_START} from "../actions/approval/monthlyApprovalActionConstants";
import {monthlyApprovalRequest} from "../../api/approvalRequests";
import {getMonthlyApprovalFailAction, getMonthlyApprovalSuccessAction} from "../actions/approval/monthlyApprovalActions";

//MONTHLY APPROVAL
export const getMonthlyApprovalStartEpic = (action$) =>
    action$.pipe(
        ofType(GET_MONTHLY_APPROVAL_START),
        debounceTime(4000),
        switchMap((action) =>
            monthlyApprovalRequest(action.payload).pipe(
                map((listResponse) => getMonthlyApprovalSuccessAction({monthlyApprovalList: listResponse.response})),
                catchError((error) => of(getMonthlyApprovalFailAction({error: error}))),
            )
        )
    )
