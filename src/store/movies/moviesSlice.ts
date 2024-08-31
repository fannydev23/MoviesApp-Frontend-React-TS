import { createSlice } from "@reduxjs/toolkit"
import { Movie } from "../../interfaces/movieInterface";

interface initState{
  isLoading:Boolean,
  movies:Movie[],
  success:Boolean,
  error:String|null
}

const initialState:initState={
    isLoading:false,
    movies:[],
    success:false,
    error:null
}

export const moviesSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
      onLoadMovies: (state, {payload=[]}) => {
        state.isLoading=false;
        payload.forEach((m:Movie) => {
            const exist = state.movies.some(movieDb=>movieDb.idMovie===m.idMovie);

            if(!exist){
              state.movies.push(m)
            }

        });
        state.success=true;
        state.error=null;
      }

    },
  })
  
  export const { onLoadMovies } = moviesSlice.actions