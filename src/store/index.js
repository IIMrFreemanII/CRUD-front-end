import {createStore, applyMiddleware} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import reducer from '../reducers';
import createSagaMiddleware from "redux-saga";
import {rootSaga} from "../actions/usersActions";

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(reducer, composeWithDevTools(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(rootSaga);