import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Column, G2 } from '@ant-design/plots';

const PercentageColumnChartComponent = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
       setData([
           { "year": "2018", "type": "A", "value": 92.1 },
           { "year": "2018", "type": "B", "value": 145.1 },
           { "year": "2018", "type": "C", "value": 110.6 },
           { "year": "2018", "type": "D", "value": 39.4 },
           { "year": "2018", "type": "E", "value": 21.0 },
           { "year": "2018", "type": "F", "value": 48.3 },
           { "year": "2019", "type": "A", "value": 91.8 },
           { "year": "2019", "type": "B", "value": 140.9 },
           { "year": "2019", "type": "C", "value": 99.0 },
           { "year": "2019", "type": "D", "value": 33.2 },
           { "year": "2019", "type": "E", "value": 18.5 },
           { "year": "2019", "type": "F", "value": 53.9 },
           { "year": "2020", "type": "A", "value": 87.1 },
           { "year": "2020", "type": "B", "value": 139.4 },
           { "year": "2020", "type": "C", "value": 103.9 },
           { "year": "2020", "type": "D", "value": 30.0 },
           { "year": "2020", "type": "E", "value": 20.2 },
           { "year": "2020", "type": "F", "value": 56.5 },
           { "year": "2021", "type": "A", "value": 80.0 },
           { "year": "2021", "type": "B", "value": 134.8 },
           { "year": "2021", "type": "C", "value": 100.0 },
           { "year": "2021", "type": "D", "value": 45.2 },
           { "year": "2021", "type": "E", "value": 20.8 },
           { "year": "2021", "type": "F", "value": 49.3 },
       ])
    }, []);

    /*const asyncFetch = () => {
        fetch('https://gw.alipayobjects.com/os/antfincdn/jSRiL%26YNql/percent-column.json')
            .then((response) => response.json())
            .then((json) => setData(json))
            .catch((error) => {
                console.log('fetch data failed', error);
            });
    };*/
    G2.registerInteraction('element-link', {
        start: [
            {
                trigger: 'interval:mouseenter',
                action: 'element-link-by-color:link',
            },
        ],
        end: [
            {
                trigger: 'interval:mouseleave',
                action: 'element-link-by-color:unlink',
            },
        ],
    });
    const config = {
        data,
        xField: 'year',
        yField: 'value',
        seriesField: 'type',
        isPercent: true,
        isStack: true,
        meta: {
            value: {
                min: 0,
                max: 1,
            },
        },
        label: {
            position: 'middle',
            content: (item) => {
                return `${(item.value * 100).toFixed(2)}%`;
            },
            style: {
                fill: '#fff',
            },
        },
        tooltip: false,
        interactions: [
            {
                type: 'element-highlight-by-color',
            },
            {
                type: 'element-link',
            },
        ],
    };

    return <Column {...config} />;
};

export default PercentageColumnChartComponent
