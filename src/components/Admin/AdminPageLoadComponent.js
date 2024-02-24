import React, {useEffect, useState} from "react";
import {Col, Input, Row, Button, Space, Table, Tag, Modal, InputNumber, Select} from "antd";
import {Option} from "antd/es/mentions";
import {connect} from "react-redux";
import {selectAuthInfo, selectProfileInfo} from "../../redux/selectors/authSelectors";
import PropTypes from "prop-types";



const AdminPageLoadComponent = ({authInfo,profileInfo}) => {



    const handleCancel = () => {
console.log("you cancelled !")
    }


    useEffect((profileInfo) => {
        if (profileInfo.userDesignation.id === "20B61A71-6102-4E3D-9871-711D205DD0E7"){
            adminPageContent()
        }
    },[profileInfo])

    const adminPageContent = ( ) => {
        return ( <>

                <Row gutter={[16,16]}>


                    <Modal visible={reverse} title="Select Brand Manager" footer={null} onCancel={handleCancel}>


                        <Row>
                            <Col>
                                Brand Manager <br/>
                                <Select
                                    style={{
                                        width: 120,
                                    }}

                                    placeholder={"Select User"}
                                    options={[
                                        {
                                            value: 'Pankaj Singh Kandari',
                                            label: 'Pankaj Singh Kandari',
                                        },

                                    ]}

                                />
                            </Col>
                        </Row>
                        <br/>
                        <Row>
                            <Col><Button type={"primary"}>Ok</Button></Col>
                        </Row>
                    </Modal>




                </Row>

            </>
        )
    }




}

AdminPageLoadComponent.propTypes = {
    authInfo: PropTypes.any,
    profileInfo: PropTypes.any,


}

const mapState = (state) => {
    const authInfo = selectAuthInfo(state)
    const profileInfo = selectProfileInfo(state)

    return {authInfo, profileInfo}

}

const actions = {


}

export default connect(mapState, actions) (AdminPageLoadComponent)
