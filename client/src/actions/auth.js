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
    ERROR_HANDLER
} from './types';
import axios from 'axios';

export const loadUser = () => async dispatch => {
    try {
        const res = await axios.get('http://localhost:5000/api/users/me');
        dispatch({
            type: USER_LOADED,
            payload: res.data
        });
    } catch (error) {
        dispatch({
            type: AUTH_ERROR,
            payload: error
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
        const res = await axios.put(`http://localhost:5000/api/users/add/${id}/${count}`,config);
        dispatch({
            type: ADD_COUNT,
            payload: res.data
        });
    } catch (error) {
        dispatch({ 
            type: ERROR_HANDLER, 
            payload: error 
        });
    }
}

export const deleteItemFromPizzas = id => async dispatch => {
    try {
        const res = await axios.delete(`http://localhost:5000/api/users/${id}`);
        dispatch({
            type: REMOVE_PIZZA,
            payload: res.data
        });
    } catch (error) {
        dispatch({
            type: ERROR_HANDLER,
            payload: error
        })
    }
}

export const setModal = () => async dispatch => {
    try {
        dispatch({ type: SET_MODAL });
    } catch (error) {
        dispatch({
            type: ERROR_HANDLER,
            payload: error
        });
    }
}

export const removeModal = () => async dispatch => {
    try {
        dispatch({ type: REMOVE_MODAL });
    } catch (error) {
        dispatch({
            type: ERROR_HANDLER,
            payload: error
        })
    }
}

export const logOut = () => dispatch => {
    try {
        dispatch({ type: LOG_OUT });
    } catch (error) {
        dispatch({
            type: ERROR_HANDLER,
            payload: error
        })
    }
}

export const registerUser = ({ name,email,password }) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const body = JSON.stringify({ name,email,password });
        const res = await axios.post('http://localhost:5000/api/users',body,config);
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data 
        });
    } catch (error) {
        dispatch({
            type: REGISTER_FAIL,
            payload: error
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
        const res = await axios.post('http://localhost:5000/api/auth',body,config);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });
    } catch (error) {
        dispatch({
            type: LOGIN_FAIL,
            payload: error
        });
    }
}

export const setPizza = (name,price,count,id,startingPrice) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json' 
            }
        };
        const body = JSON.stringify({ name,price,count,id,startingPrice });
        const res = await axios.put('http://localhost:5000/api/users',body,config);
        dispatch({
            type: SET_PIZZA,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: ERROR_HANDLER,
            payload: error
        });
    }
}