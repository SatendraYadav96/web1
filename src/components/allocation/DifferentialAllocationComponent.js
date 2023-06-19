import PropTypes from "prop-types";
import {selectAuthInfo} from "../../redux/selectors/authSelectors";

 import {recipientsToAllocateListStartAction} from "../../redux/actions/allocation/allocationActions";
import {connect} from "react-redux";
import {useEffect, useState} from "react";
import {Col, InputNumber, Row, Spin, Transfer} from "antd";
import {selectRecipientList} from "../../redux/selectors/recipientSelectors";

const DifferentialAllocationComponent = ({teamId, handleLoadRecipients, authInfo, recipients, }) => {
    const [targetKeys, setTargetKeys] = useState([]);
    const [selectedKeys, setSelectedKeys] = useState([]);
    useEffect(()=> {
        handleLoadRecipients({
            teamId: teamId,
            certificate: authInfo.token
        })
    },[teamId])
    const filterOption = (inputValue, option) => option.ciName.indexOf(inputValue.toLowerCase()) > -1
    const onChange = (nextTargetKeys, direction, moveKeys) => {
        setTargetKeys(nextTargetKeys);
    };
    const onSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
        setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
    };

    return (
        <Spin spinning={recipients.length === 0}>
            <Transfer
                style={{marginBottom: 15}}
                rowKey={record => record.id}
                listStyle={{
                    width: 450,
                    height: 300,
                }}
                dataSource={recipients}
                showSearch
                filterOption={filterOption}
                targetKeys={targetKeys}
                onChange={onChange}
                onSearch={onSelectChange}
                render={(item) => `${item.designationName} - ${item.name}`}
            />
            <Row >
              <Col offset={18} span={4}>
                  QTY TO ALLOCATE:
              </Col>
              <Col span={2}>
                  <InputNumber />
              </Col>
            </Row>
        </Spin>
    )
}

DifferentialAllocationComponent.propTypes = {
    authInfo: PropTypes.any,
    handleLoadRecipients: PropTypes.func,
    teamId: PropTypes.string,
    recipients: PropTypes.array
}

const mapState = (state) => {
    const authInfo = selectAuthInfo(state)
    const recipients = selectRecipientList(state)
    console.log(recipients)
    return { authInfo, recipients }
}

const actions = {
    handleLoadRecipients: recipientsToAllocateListStartAction
}

export default connect(mapState, actions)(DifferentialAllocationComponent)
