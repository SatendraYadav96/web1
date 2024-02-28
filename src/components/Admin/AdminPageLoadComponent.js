import React, {useEffect, useState} from "react";
import {Col, Input, Row, Button, Space, Table, Tag, Modal, InputNumber, Select, Form, message} from "antd";
import {Option} from "antd/es/mentions";
import {connect} from "react-redux";
import {selectAuthInfo, selectProfileInfo} from "../../redux/selectors/authSelectors";
import PropTypes from "prop-types";
import TitleWidget from "../../widgets/TitleWidget";
import SelectBmForTseComponent from "../widgets/SelectBmForTseComponent";
import {bmForTseStartAction, loginAsBMStartAction} from "../../redux/actions/dropDown/dropDownActions";
import {selectBmForTse, selectBmForTseLoading, selectLoginAsBM, selectLoginAsBMLoading} from "../../redux/selectors/dropDownSelector";



const AdminPageLoadComponent = ({authInfo,profileInfo,handleBmForTse,bmForTse,bmForTseLoading,handleLoginAsBm}) => {

    const [form] = Form.useForm();
    const [bmForTses, setBmForTses] = useState()


    const formStyle = {
     width:'500px',

    };

    const loginAsBmFunc = () => {
       console.log(bmForTse)

        handleLoginAsBm({
            certificate: authInfo.token,
            id:bmForTses
        })
    }






        return ( <>
                <TitleWidget title={"Select Brand Manager"}/>

                <Form style={formStyle}
                    form={form}
                    layout="vertical"

                    autoComplete="off"
                >
                    <Form.Item>
                        <SelectBmForTseComponent value = {bmForTses} onChange={(value) => setBmForTses(value)}/>

                    </Form.Item>
                    <Form.Item >
                        <Space>
                            <Button type="primary" htmlType="submit" onClick={()=>loginAsBmFunc()}>
                                Submit
                            </Button>

                        </Space>
                    </Form.Item>
                </Form>


            </>
        )





}

AdminPageLoadComponent.propTypes = {
    authInfo: PropTypes.any,
    profileInfo: PropTypes.any,
    handleBmForTse:PropTypes.func,
    handleLoginAsBm:PropTypes.func





}

const mapState = (state) => {
    const authInfo = selectAuthInfo(state)
    const profileInfo = selectProfileInfo(state)
    const bmForTse = selectBmForTse(state)
    const bmForTseLoading = selectBmForTseLoading(state)
    const loginAsBM = selectLoginAsBM(state)
    const loginAsBMLoading = selectLoginAsBMLoading(state)

    console.log(bmForTse)

    return {authInfo, profileInfo,bmForTse,bmForTseLoading,loginAsBM,loginAsBMLoading}

}

const actions = {
    handleBmForTse : bmForTseStartAction,
    handleLoginAsBm : loginAsBMStartAction

}

export default connect(mapState, actions) (AdminPageLoadComponent)
