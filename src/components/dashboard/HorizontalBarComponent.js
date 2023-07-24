import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import {Bar, Column} from '@ant-design/plots';

const HorizontalBarComponent = () => {
    const data = [
        {
            month: "JAN",
            cost: 14500,
        },
        {
            month: "FEB",
            cost: 8500,
        },
        {
            month: "MAR",
            cost: 10000,
        },
        {
            month: "APR",
            cost: 7000,
        },
        {
            month: "MAY",
            cost: 9000,
        },
        {
            month: "JUN",
            cost: 8500,
        },
        {
            month: "JUL",
            cost: 10000,
        },
        {
            month: "AUG",
            cost: 7000,
        },
        {
            month: "SEP",
            cost: 4500,
        },
        {
            month: "OCT",
            cost: 13520,
        },
        {
            month: "NOV",
            cost: 9312,
        },
        {
            month: "DEC",
            cost: 6555,
        },
    ];
    const config = {
        data,
        xField: 'cost',
        yField: 'month',
        seriesField: 'month',
    };
    return <Bar {...config} />;
};

export default HorizontalBarComponent
