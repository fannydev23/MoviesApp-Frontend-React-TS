import { createSlice } from "@reduxjs/toolkit"
import { Actors } from "../../interfaces/actorsInterface";


interface initState{
  isLoading:Boolean,
  actors:Actors[],
  actorSelected:Actors|null,
  success:Boolean,
  error:String|null
}

const initialState:initState={
    isLoading:false,
    actors:[],
    actorSelected:null,
    success:false,
    error:null
}


export const actorsSlice = createSlice({
    name: 'actors',
    initialState,
    reducers: {
      onLoadActors: (state, {payload=[]}) => {
          state.isLoading=false;
          payload.forEach((actor:Actors) => {
              const exist = state.actors.some((a:Actors)=>a.idActor===actor.idActor);

              if(!exist){
                state.actors.push(actor)
              }

          });
          state.success=true;
          state.error=null;
      },

      onSelectActor:(state, {payload})=>{
        state.actorSelected = payload;
      }

    },
  })
  
  export const { onLoadActors, onSelectActor } = actorsSlice.actions