import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

export const fetchMoveInfo = createAsyncThunk(
    "infoCinema/fetchMove",
    async function(id, {rejectWithValue, dispatch}){
        try{
            const response = await fetch(`http://sky-cinema-kg.herokuapp.com/api/v1/films-info/?url_id=${id}`);
            if (!response.ok){
                throw new Error("Что то пошло не так")
            }
            const data = await response.json();
            if (data.length){
                const obj = {
                    about: data[0].about,
                    age: data[0].age,
                    description: data[0].description,
                    duration: data[0].duration,
                    year_of_pub: data[0].year_of_pub,
                    id: id
                }

                dispatch(addMoveInfo({data: obj}))
            }

        } catch (error){
            return rejectWithValue(error.message)
        }
    })


export const fetchInfoPark = createAsyncThunk(
    "infoCinema/fetchInfoPark",
    async function(_, {rejectWithValue, dispatch}){
        try{
            const response = await fetch(`https://sky-cinema-kg.herokuapp.com/api/v1/info/`);
            if (!response.ok){
                throw new Error("Что то пошло не так")
            }
            const data = await response.json();
            dispatch(addInfoPark({data}))

        } catch (error){
            return rejectWithValue(error.message)
        }
    })


const infoCinemaSlice = createSlice({
    name: "infoCinema",
    initialState: {
        info_cinema: [],
        idCinema: 0,
        infoPark: []
    },
    reducers: {
        addMoveInfo(state, action){
            state.info_cinema.push(action.payload.data);
        },
        nullInfo(state){
            state.info_cinema = []
        },
        addIdCinema(state, action){
            state.idCinema = action.payload.id
        },
        addInfoPark(state, action){
            state.infoPark = action.payload.data
        }

    }
})

export const {addMoveInfo, nullInfo, addIdCinema, addInfoPark} = infoCinemaSlice.actions;

export default infoCinemaSlice.reducer