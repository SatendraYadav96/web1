import {Select} from "antd";

const SelectRemarkComponent = () => {
    return (
        <Select
            style={{
                width: 120,
            }}
            options={[
                {
                    value: 'EXPIRED',
                    label: 'EXPIRED',
                },
                {
                    value: 'PRUNED',
                    label: 'PRUNED',
                },
                {
                    value: 'SHORT RECEIPT',
                    label: 'SHORT RECEIPT',
                },
                {
                    value: 'DAMAGED',
                    label: 'DAMAGED',
                },
            ]}
        />
    )
}

export default SelectRemarkComponent
