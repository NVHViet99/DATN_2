import { configureStore } from "@reduxjs/toolkit";

import loadingReducer from "./Loading";
import authReducer from "./auth";

const store = configureStore({
  reducer: { loading: loadingReducer, auth: authReducer },
});

export default store;
