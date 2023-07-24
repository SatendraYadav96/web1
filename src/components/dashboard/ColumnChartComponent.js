import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import {Bar, Column} from '@ant-design/plots';

const ColumnChartComponent = () => {
    const data = [
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
        legend: {
            position: 'top-left',
        },
    };
    return <Column {...config} />;
};

export default ColumnChartComponent
