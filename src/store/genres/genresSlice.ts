import { createSlice } from "@reduxjs/toolkit"
import { Genre } from "../../interfaces/genreInferface"

interface initState{
  isLoading:Boolean,
  genres:Genre[],
  success:Boolean,
  error:String|null
}

const initialState:initState={
    isLoading:false,
    genres:[],
    success:false,
    error:null
}

export const genresSlice = createSlice({
    name: 'genres',
    initialState,
    reducers: {
      onLoadGenres: (state, {payload=[]}) => {
        state.isLoading=false;
        payload.forEach((genre:Genre) => {
            const exist = state.genres.some(g=>g.idGender===genre.idGender);

            if(!exist){
              state.genres.push(genre)
            }

        });
        state.success=true;
        state.error=null;
      }

    },
  })
  
  export const { onLoadGenres } = genresSlice.actions