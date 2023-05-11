import React, {useState} from "react";
import TitleWidget from "../../widgets/TitleWidget";
import PropTypes from "prop-types";
import {selectAuthInfo} from "../../redux/selectors/authSelectors";
import {selectProfileInfo} from "../../redux/selectors/authSelectors";
import {connect} from "react-redux";
import {Button, Col, Input, Row } from "antd";
import { addHsnStartAction } from '../../redux/actions/hsnInvoice/hsnActions'
import {selectHsn,selectHsnLoading} from "../../redux/selectors/hsnSelector"


const AddHsnComponent = ({authInfo,profileInfo,insertHsn,hsnLoading,handleAddHsn}) => {

    const [hsn, setHsn] = useState()
    const [rate, setRate] = useState()

    const searchData = () => {
    }

    const handleHsnChange = (e) => {
    setHsn(e.target.value)
    }

    const handleRateChange = (e) => {
        setRate(e.target.value)
    }

    const handleInsertHsn = () => {
        console.log(hsn);
        console.log(rate);
        console.log(insertHsn);

        const data  = {"hcmCode":hsn, "rate":rate}

        handleAddHsn({
            certificate: authInfo.token,
            hsn: data
        });
        searchData()
    }

    return(
        <>
            <TitleWidget title="Add HSN" />
            <Row gutter={[8,8]}>
                <Col span={3}>
                    HSN Number
                    <br/><Input  style={{width:'100%'}} value={hsn} onChange={handleHsnChange}  ></Input>
                </Col>
                <Col span={3}>
                    Rate
                    <br/><Input style={{width:'100%'}} value={rate} onChange={handleRateChange} ></Input>
                </Col>
                <Col span={3}>
                    <br/>
                    <Button type={"primary"} onClick={()=>handleInsertHsn()}>Search</Button>
                </Col>
            </Row>
        </>
    )

}



AddHsnComponent.propTypes = {
    authInfo: PropTypes.any,
    profileInfo: PropTypes.any,
    insertHsn:PropTypes.object,
    hsnLoading:PropTypes.any,
    handleAddHsn:PropTypes.func
}

const mapState = (state) => {
    const authInfo = selectAuthInfo(state)
    const insertHsn = selectHsn(state)
    const hsnLoading = selectHsnLoading(state)
    const profileInfo = selectProfileInfo(state)
    return {authInfo,insertHsn,hsnLoading,profileInfo}
}

const actions = {
    handleAddHsn: addHsnStartAction,
}

export default connect(mapState, actions)(AddHsnComponent)
