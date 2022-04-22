import {configureStore} from "@reduxjs/toolkit";
import carouselReducer from "./carouselSlice";
import infoCinemaReducer from "./infoCinemaSlice";

export default configureStore({
    reducer: {
        carousel: carouselReducer,
        infoCinema: infoCinemaReducer
    }
})