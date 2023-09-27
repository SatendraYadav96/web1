import React, {useEffect, useState} from "react";

import PropTypes from "prop-types";
import {selectAuthInfo} from "../../../redux/selectors/authSelectors";
import {connect} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";


const EditCommonMasterComponents = ({authInfo}) => {

    const navigate = useNavigate();
    const [name, setName] = useState();
    const [code, setCode] = useState();




    return(
        <>

        </>
    )
}

EditCommonMasterComponents.propTypes = {
    authInfo: PropTypes.any,

}

const mapState = (state) => {
    const authInfo = selectAuthInfo(state)

    return {authInfo}
}

const actions = {

}

export default connect(mapState, actions) (EditCommonMasterComponents)
