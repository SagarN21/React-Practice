import { DATA_REQUEST_ERROR, DATA_REQUEST_PENDING, DATA_REQUEST_SUCCESS } from "./actionType"


const initState = {
    isLoading:false,
    data:[],
    isError:false
}


export const reducer = (state=initState,{type,payload})=>{

    switch(type)
    {
        case DATA_REQUEST_PENDING: return {
            ...state,
            isLoading:true
        }

        case DATA_REQUEST_SUCCESS : return {
            ...state,
            data:payload,
            isLoading:false
        }

        case DATA_REQUEST_ERROR : return {
            ...state,
            isError:true,
            isLoading:false

        }

        default : return state
    }


}