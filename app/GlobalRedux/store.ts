//@ts-nocheck
"use client";

import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

import { setupListeners } from "@reduxjs/toolkit/query";

//* FEATURES REDUCERS (step1)
import authenticatedReducer from "./Features/authenticatedSlice/authenticatedSlice";
//* RTK QUERY IMPORTS (step I)
import { authenticationApi } from "./API/authenticationApi";
import { libraryApi } from "./API/libraryApi";
import { contactUsApi } from "./API/contactUsApi";
import { newsLetterSubscriptionApi } from "./API/newsLetterSubscriptionApi";
import { classApi } from "./API/classApi";
import { sectionApi } from "./API/sectionApi";
import { subjectApi } from "./API/subjectApi";
import { schoolUserAuthApi } from "./API/schoolUserAuthApi";
import { schoolApi } from "./API/schoolApi";
import { hostelRoomTypeApi } from "./API/hostelRoomTypeApi";
import { hostelApi } from "./API/hostelApi";
import { hostelRoomApi } from "./API/hostelRoomApi";
import { streamApi } from "./API/streamApi";
import { incomeHeadApi } from "./API/incomeHeadApi";
import { incomeApi } from "./API/incomeApi";
import { expenseHeadApi } from "./API/expenseHeadApi";
import { expenseApi } from "./API/expenseApi";
import { examTermApi } from "./API/examTermApi";
import { examHallApi } from "./API/examHallApi";
import { productSupplierApi } from "./API/productSupplierApi";
import { productCategoryApi } from "./API/productCategoryApi";
import { productStoreApi } from "./API/productStoreApi";
import { productApi } from "./API/productApi";
import { galleryApi } from "./API/galleryApi";
import { batchApi } from "./API/batchApi";
import { employeeDepartmentApi } from "./API/employeeDepartmentApi";
import { employeeDesignationApi } from "./API/employeeDesignationApi";
import { canteenItemApi } from "./API/canteenItemApi";
import { canteenItemOrderApi } from "./API/canteenItemOrderApi";
import { vehicleApi } from "./API/vehicleApi";
import { vehicleRouteApi } from "./API/vehicleRouteApi";
import { studentOneTimeAttendanceApi } from "./API/studentOneTimeAttendanceApi";
import { idCardDesignApi } from "./API/idCardDesignApi";
import { eventCalendarApi } from "./API/eventCalendarApi";
import { postApi } from "./API/postApi";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["authenticated"], // place to select which state you want to persist
};

const rootReducer: any = combineReducers({
  ////* (step2)
  // todo (reducer simple state): FEATURES REDUCERS (keep adding below)
  authenticated: authenticatedReducer,

  // * (step II)
  // todo (api query): RTK QUERY REDUCERS (keep adding below)
  [authenticationApi.reducerPath]: authenticationApi.reducer,
  [libraryApi.reducerPath]: libraryApi.reducer,
  [newsLetterSubscriptionApi.reducerPath]: newsLetterSubscriptionApi.reducer,
  [contactUsApi.reducerPath]: contactUsApi.reducer,
  [classApi.reducerPath]: classApi.reducer,
  [sectionApi.reducerPath]: sectionApi.reducer,
  [schoolUserAuthApi.reducerPath]: schoolUserAuthApi.reducer,
  [subjectApi.reducerPath]: subjectApi.reducer,
  [hostelRoomTypeApi.reducerPath]: hostelRoomTypeApi.reducer,
  [hostelApi.reducerPath]: hostelApi.reducer,
  [hostelRoomApi.reducerPath]: hostelRoomApi.reducer,
  [streamApi.reducerPath]: streamApi.reducer,
  [incomeHeadApi.reducerPath]: incomeHeadApi.reducer,
  [incomeApi.reducerPath]: incomeApi.reducer,
  [expenseHeadApi.reducerPath]: expenseHeadApi.reducer,
  [expenseApi.reducerPath]: expenseApi.reducer,
  [examTermApi.reducerPath]: examTermApi.reducer,
  [productSupplierApi.reducerPath]: productSupplierApi.reducer,
  [productCategoryApi.reducerPath]: productCategoryApi.reducer,
  [productStoreApi.reducerPath]: productStoreApi.reducer,
  [productApi.reducerPath]: productApi.reducer,
  [galleryApi.reducerPath]: galleryApi.reducer,
  [batchApi.reducerPath]: batchApi.reducer,
  [schoolApi.reducerPath]: schoolApi.reducer,
  [employeeDepartmentApi.reducerPath]: employeeDepartmentApi.reducer,
  [employeeDesignationApi.reducerPath]: employeeDesignationApi.reducer,
  [examHallApi.reducerPath]: examHallApi.reducer,
  [canteenItemApi.reducerPath]: canteenItemApi.reducer,
  [canteenItemOrderApi.reducerPath]: canteenItemOrderApi.reducer,
  [vehicleApi.reducerPath]: vehicleApi.reducer,
  [vehicleRouteApi.reducerPath]: vehicleRouteApi.reducer,
  [studentOneTimeAttendanceApi.reducerPath]: studentOneTimeAttendanceApi.reducer,
  [idCardDesignApi.reducerPath]: idCardDesignApi.reducer,
  [eventCalendarApi.reducerPath]: eventCalendarApi.reducer,
  [postApi.reducerPath]: postApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,

  // * (step III)
  // todo (api query): RTK QUERY REDUCERS (keep adding below)
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authenticationApi.middleware,
      libraryApi.middleware,
      newsLetterSubscriptionApi.middleware,
      contactUsApi.middleware,
      classApi.middleware,
      sectionApi.middleware,
      schoolUserAuthApi.middleware,
      subjectApi.middleware,
      hostelRoomTypeApi.middleware,
      hostelApi.middleware,
      hostelRoomApi.middleware,
      streamApi.middleware,
      incomeHeadApi.middleware,
      incomeApi.middleware,
      expenseHeadApi.middleware,
      expenseApi.middleware,
      examTermApi.middleware,
      productSupplierApi.middleware,
      productCategoryApi.middleware,
      productStoreApi.middleware,
      productApi.middleware,
      galleryApi.middleware,
      batchApi.middleware,
      schoolApi.middleware,
      employeeDepartmentApi.middleware,
      employeeDesignationApi.middleware,
      examHallApi.middleware,
      canteenItemApi.middleware,
      canteenItemOrderApi.middleware,
      vehicleApi.middleware,
      vehicleRouteApi.middleware,
      studentOneTimeAttendanceApi.middleware,
      idCardDesignApi.middleware,
      eventCalendarApi.middleware,
      postApi.middleware
    ),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
