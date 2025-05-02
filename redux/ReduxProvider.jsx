"use client";

import { Provider } from "react-redux";
import { persistor, store } from "./store";
import { PersistGate } from "redux-persist/integration/react";

const ReduxProvider = ({ children }) => (
  <Provider store={store}>
    <PersistGate loading={<div>loading...</div>} persistor={persistor}>
     {children}
    </PersistGate>
  </Provider>
);

export default ReduxProvider;
