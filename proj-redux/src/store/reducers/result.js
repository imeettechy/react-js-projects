import * as actionTypes from '../actions/actionTypes';
import { updateObject } from './../utility';

const initialState = {
    results : []
}

const deletResult = (state, action) => {
    const updateArray = state.results.filter(result => result.id !== action.resultId);
    return updateObject(state, {results: updateArray})
}
const result = (state = initialState, action) => {

    switch(action.type) {
        case actionTypes.STORE_RESULT :
            return updateObject(state, {results : state.results.concat({val : action.result, id : new Date().getTime()})});
        case actionTypes.DELETE_RESULT :
            return deletResult(state, action);
    }
    return state;
}

export default result;