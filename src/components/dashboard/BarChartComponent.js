import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Bar } from '@ant-design/plots';

const BarChartComponent = () => {
    const data = [
        {
            type: 'Medical',
            value: 38,
        },
        {
            type: 'Non-Medical',
            value: 52,
        },
        {
            type: 'Sample',
            value: 61,
        }
    ];
    const config = {
        data,
        xField: 'value',
        yField: 'type',
        seriesField: 'type',
        legend: {
            position: 'top-left',
        },
    };
    return <Bar {...config} />;
};

export default BarChartComponent
