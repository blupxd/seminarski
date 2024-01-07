import { createStore } from "redux";
import korpaReducer from "../reducers/reducers";

const store = createStore(korpaReducer)

export default store;