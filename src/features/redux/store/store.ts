import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";

import userReducer from "../slice/user.slice";
import loginReducer from "../slice/login.slice";
import signUpReducer from "../slice/sign-up.slice";
import tradeJournalReducer from "../slice/trade-journal.slice";
import blogReducer from "../slice/blog.slice";
import appUsersReducer from "../slice/app-users.slice";


const reducer = {
  signUp: signUpReducer,
  login: loginReducer,
  user: userReducer,
  tradeJournal: tradeJournalReducer,
  blog: blogReducer,
  usersInfo: appUsersReducer
};

export const store = configureStore({
	reducer,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  }).concat(logger),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
