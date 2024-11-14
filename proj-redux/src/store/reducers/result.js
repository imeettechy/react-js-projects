import * as actionTypes from './../actions';

const initialState = {
    results : []
}

const result = (state = initialState, action) => {

    switch(action.type) {
        case actionTypes.STORE_RESULT :
            return {
                ...state,
                results : state.results.concat({val : action.result, id : new Date().getTime()})
            }
        case actionTypes.DELETE_RESULT :
            return {
                ...state,
                results: state.results.filter(result => result.id !== action.resultId)
            };
    }
    return state;
}

export default result;