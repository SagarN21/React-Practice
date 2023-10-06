import {
  DATA_REQUEST_ERROR,
  DATA_REQUEST_PENDING,
  DATA_REQUEST_SUCCESS,
} from "./actionType";
import axios from "axios";

const getDataRequest = ()=>{
    return {type:DATA_REQUEST_PENDING}
}

const getDataSuccess = (payload)=>{
    return {type:DATA_REQUEST_SUCCESS,payload}
}

const getDataError = ()=>{
    return{type:DATA_REQUEST_ERROR}
}



export const getData = (obj) => (dispatch) => {
  dispatch(getDataRequest());
  axios
    .get("https://jsonplaceholder.typicode.com/photos?_limit=1000")
    .then((res) => dispatch(getDataSuccess(res.data)))
    .catch((err) => dispatch(getDataError()));
};

export const updateData = (obj)=> (dispatch) => {
  dispatch(getDataSuccess(obj))
}