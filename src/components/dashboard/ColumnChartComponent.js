import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import {Bar, Column} from '@ant-design/plots';
import {selectAuthInfo} from "../../redux/selectors/authSelectors";
import {selectBatchReconciliationListData, selectOverSamplingMailData} from "../../redux/selectors/batchReconciliationReportSelector";
import {getBatchReconciliationStartAction, overSamplingMailStartAction} from "../../redux/actions/reports/batchReconciliationReportActions";
import {dispatchesMonthWiseStartAction} from "../../redux/actions/dashboard/dashboardActions";
import {selectDispatchesMonthWiseList} from "../../redux/selectors/dashboardSelector";
import PropTypes from "prop-types";

const ColumnChartComponent = ({dispatchesMonthWiseData} ) => {
    console.log(dispatchesMonthWiseData);


    const data = [
        {
            month: "JAN",
            type: "Monthly",
            sale: 14500
        },
        {
            month: "JAN",
            type: "Monthly",
            sale: 14500
        },
        {
            month: "JAN",
            type: "Special",
            sale: 8500
        },
        {
            month: "JAN",
            type: "Virtual",
            sale: 10000
        },
        {
            month: "FEB",
            type: "Monthly",
            sale: 7000
        },
        {
            month: "FEB",
            type: "Special",
            sale: 9000
        },
        {
            month: "FEB",
            type: "Virtual",
            sale: 8500
        },
        {
            month: "MAR",
            type: "Monthly",
            sale: 10000
        },
        {
            month: "MAR",
            type: "Special",
            sale: 7000
        },
        {
            month: "MAR",
            type: "Virtual",
            sale: 4500
        },
        {
            month: "APR",
            type: "Monthly",
            sale: 13520
        },
        {
            month: "APR",
            type: "Special",
            sale: 9312
        },
        {
            month: "APR",
            type: "Virtual",
            sale: 6555
        },
        {
            month: "MAY",
            type: "Monthly",
            sale: 7520
        },
        {
            month: "MAY",
            type: "Special",
            sale: 7312
        },
        {
            month: "MAY",
            type: "Virtual",
            sale: 9555
        },
    ];
    const config = {
        data,
        xField: 'month',
        yField: 'sale',
        seriesField: 'type',
        isGroup: true,
        columnStyle: {
            radius: [20, 20, 0, 0],
        },
    };

    // useEffect(() => {
    //    // console.log(dispatchesMonthWiseList)
    //     handleDispatchesMonthWiseList({
    //         certificate: authInfo.token,
    //     })
    // },[dispatchesMonthWiseList])


    return <Column {...config} />;
};

// ColumnChartComponent.propTypes = {
//     authInfo: PropTypes.any,
//     dispatchesMonthWiseList:PropTypes.array,
//     handleDispatchesMonthWiseList:PropTypes.func
// }
//
// const mapState = (state) => {
//     const authInfo = selectAuthInfo(state)
//     const dispatchesMonthWiseList = selectDispatchesMonthWiseList(state)
//
//     return {authInfo,dispatchesMonthWiseList}
// }
//
// const actions = {
//     handleDispatchesMonthWiseList :dispatchesMonthWiseStartAction
// }

export default ColumnChartComponent
