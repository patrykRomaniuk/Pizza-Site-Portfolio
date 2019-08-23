import { 
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOG_OUT,
    SET_PIZZA,
    ADD_COUNT,
    SUBTRACT_COUNT,
    SET_MODAL,
    REMOVE_MODAL,
    ERROR_HANDLER,
    SET_ALL_PIZZA_VALUES,
    REMOVE_PIZZA
} from '../actions/types';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    loading: true,
    user: null,
    users: [],
    errors: {},
    modal: false,
    allPizzaPrices: 0
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
        case LOGIN_FAIL:
        case AUTH_ERROR:
        case LOG_OUT:
                localStorage.removeItem('token');
                return {
                    isAuthenticated: false,
                    loading: true,
                    user: null,
                    users: [],
                    errors: {},
                    modal: false,
                    allPizzaPrices: 0
                }
        case REGISTER_FAIL:
                alert('Invalid Credentials');
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
                user: payload,
                isAuthenticated: true,
                loading: false
            }
        case SET_PIZZA:
        case ADD_COUNT:
        case SUBTRACT_COUNT:
        case REMOVE_PIZZA:
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
        case SET_ALL_PIZZA_VALUES:
            return {
                ...state,
                ...payload,
                allPizzaPrices: payload
            }
        default:
            return state;
    }
}

export default auth;