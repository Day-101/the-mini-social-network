import { createStore } from "redux"
import useReducer from "./reducer"

const store = createStore(useReducer);

export default store;
