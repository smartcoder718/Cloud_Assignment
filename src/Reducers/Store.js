import { createStore } from "redux";
import rootReducer from "./RootReduce";

const store = createStore(rootReducer)
export default store;