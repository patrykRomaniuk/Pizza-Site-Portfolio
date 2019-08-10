import { 
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOG_OUT,
    SET_PIZZA,
    REMOVE_PIZZA,
    ADD_COUNT,
    SUBTRACT_COUNT,
    SET_MODAL,
    REMOVE_MODAL,
    ERROR_HANDLER
} from '../actions/types';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    loading: true,
    user: null,
    users: [],
    errors: {},
    modal: false
};

const auth = (state = initialState,action) => {
    const { type,payload } = action;
    switch(type){
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token',payload.token);
            return {
                ...state,
                ...payload,
                isAuthenticated:true,
                loading: false
            }
        case REGISTER_FAIL:
        case LOGIN_FAIL:
        case AUTH_ERROR:
        case LOG_OUT:
            localStorage.removeItem('token');
            return {
                ...state,
                ...payload,
                isAuthenticated: false,
                loading: true
            }
        case USER_LOADED:
            localStorage.getItem('token');
            return {
                ...state,
                ...payload,
                user: payload,
                isAuthenticated: true,
                loading: false
            }
        case SET_PIZZA:
        case ADD_COUNT:
        case SUBTRACT_COUNT:
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: false,
                user: payload
            }
        case SET_MODAL:
            return {
                ...state,
                modal: true
            }
        case REMOVE_MODAL:
            return {
                ...state,
                modal: false
            }
        case ERROR_HANDLER:
            return {
                ...state,
                ...payload,
                errors: payload
            }
        default:
            return state;
    }
}

export default auth;