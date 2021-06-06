import { 
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOG_OUT, 
    SET_PIZZA, 
    SET_MODAL, 
    REMOVE_MODAL,
    ADD_COUNT,
    REMOVE_PIZZA,
    ERROR_HANDLER,
    SET_ALL_PIZZA_VALUES
} from './types';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';

export const sumAllPrices = () => async dispatch => {
    try {
        const res = await axios.get('https://afternoon-sierra-62439.herokuapp.com/api/users/sum_prices');
        dispatch({
            type: SET_ALL_PIZZA_VALUES,
            payload: res.data
        });
    } catch (error) {
        dispatch({
            type: ERROR_HANDLER
        });
    }
}

export const loadUser = () => async dispatch => {
    if(localStorage.token){
        setAuthToken(localStorage.token);
    }
    try {
        const res = await axios.get('https://afternoon-sierra-62439.herokuapp.com/api/users/me');
        dispatch({
            type: USER_LOADED,
            payload: res.data
        });
    } catch (error) {
        dispatch({
            type: AUTH_ERROR
        });
    }
}

export const addCount = (id,count) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const res = await axios.put(`https://afternoon-sierra-62439.herokuapp.com/api/users/add/${id}/${count}`,config);
        dispatch({
            type: ADD_COUNT,
            payload: res.data
        });
        dispatch(sumAllPrices());
        dispatch(loadUser());
    } catch (error) {
        dispatch({ 
            type: ERROR_HANDLER
        });
    }
}

export const deleteItemFromPizzas = id => async dispatch => {
    dispatch(loadUser());
    try {
        const res = await axios.delete(`https://afternoon-sierra-62439.herokuapp.com/api/users/${id}`);
        dispatch({
            type: REMOVE_PIZZA,
            payload: res.data
        });
        dispatch(loadUser());
        dispatch(sumAllPrices());
    } catch (error) {
        dispatch({
            type: ERROR_HANDLER
        })
    }
}

export const setModal = () => async dispatch => {
    try {
        dispatch({ type: SET_MODAL });
    } catch (error) {
        dispatch({
            type: ERROR_HANDLER
        });
    }
}

export const removeModal = () => async dispatch => {
    try {
        dispatch({ type: REMOVE_MODAL });
    } catch (error) {
        dispatch({
            type: ERROR_HANDLER
        })
    }
}

export const logOut = () => dispatch => {
    try {
        dispatch({ type: LOG_OUT });
    } catch (error) {
        dispatch({
            type: ERROR_HANDLER
        })
    }
}

export const registerUser = (name,email,password) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const body = JSON.stringify({ name,email,password });
        const res = await axios.post('https://afternoon-sierra-62439.herokuapp.com/api/users',body,config);
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data 
        });
        dispatch(loadUser());
    } catch (error) {
        dispatch({
            type: REGISTER_FAIL
        })
    }
}

export const loginUser = ({ email,password }) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const body = JSON.stringify({ email,password });
        const res = await axios.post('https://afternoon-sierra-62439.herokuapp.com/api/auth',body,config);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });
        dispatch(loadUser());
    } catch (error) {
        dispatch({
            type: LOGIN_FAIL
        });
    }
}

export const setPizza = (name,price,count,id,startingPrice,sku) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json' 
            }
        };
        const body = JSON.stringify({ name,price,count,id,startingPrice,sku });
        const res = await axios.put('https://afternoon-sierra-62439.herokuapp.com/api/users',body,config);
        dispatch({
            type: SET_PIZZA,
            payload: res.data
        });
        dispatch(loadUser());
        dispatch(sumAllPrices());
    } catch (error) {
        dispatch({
            type: ERROR_HANDLER,
            payload: error
        });
    }
}