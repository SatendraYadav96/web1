import { createRequest } from './httpUtils'
import { ADD_HSN_API} from './apiConstants'
import { ADD_BOX_WEIGHT_API} from './apiConstants'


// Add Hsn API
export const addHsnRequest=  payload => {
    return createRequest(ADD_HSN_API, payload.certificate, payload.hsn)
}


//Edit Invoice Header API

export const addBoxWeightRequest=  payload => {
    return createRequest(ADD_BOX_WEIGHT_API, payload.certificate, payload.inh)
}
