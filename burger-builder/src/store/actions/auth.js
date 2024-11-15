import * as actionTypes from './actionsTypes';
import axios from "axios";

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (token, userid) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken : token,
        userId : userid
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const auth = (email, password, isSignUp) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email : email,
            password : password,
            returnSecureToken : true
        }
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAU_nezX_epRG_azqgXyMTPdPdEEGvRIcM';
        if(!isSignUp) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAU_nezX_epRG_azqgXyMTPdPdEEGvRIcM';
        }
        axios.post(url, authData)
            .then(response => {
                const expiryDate = new Date(new Date().getTime() + (response.data.expiresIn * 1000));
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('expiryDate', expiryDate);
                localStorage.setItem('userId', response.data.localId);
                dispatch(authSuccess(response.data.idToken,response.data.localId));
                dispatch(checkAuthTimeout(response.data.expiresIn));
            })
            .catch(error => {
                dispatch(authFail(error.response.data.error));
            });
    }
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expiryDate');
    localStorage.removeItem('userId');
    return {
        type : actionTypes.LOGOUT
    }
}

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    }
}

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path : path
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if(!token){
            dispatch(logout());
        } else {
            const expiryDate = new Date(localStorage.getItem('expiryDate'));
            if(expiryDate > new Date()){
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token,userId));
                dispatch(checkAuthTimeout((expiryDate.getTime() - new Date().getTime())/1000));
            } else {
                dispatch(logout());
            }
        }
    }
}