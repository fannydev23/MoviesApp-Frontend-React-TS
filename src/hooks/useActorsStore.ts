import { useDispatch, useSelector } from 'react-redux';
import {RootState} from '../store/store'
import { onLoadActors, onLoadMovies, onSelectActor, onSelectGenre } from '../store';
import { moviesApi } from '../api';
import { Actors } from '../interfaces/actorsInterface';


// const actorsList:Actors[]=[
//     {
//         idActor:1,
//         name:'Jennifer',
//         lastName:'Lawrence'
//     },

//     {
//         idActor:2,
//         name:'Josh',
//         lastName:'Hutcherson'
//     }
// ]


export const useActorsStore = () => {
  
    const dispatch = useDispatch();
    const { actors } = useSelector( (state:RootState) => state.actors );

    const startLoadingActors = async() => {
        try {
            const { data } = await moviesApi.get('/api/Actors');

            dispatch(onLoadActors(data));


        } catch (error) {
          console.log('Error loading actors');
          console.log(error)
        }
    }

    const setActiveActor=async(actor:Actors)=>{
        try {

            const url = actor.idActor!==0?`api/Movies/ByActor/${actor.idActor}`:'api/Movies'

            dispatch(onSelectActor(actor))
            const {data} = await moviesApi.get(url);
            dispatch(onLoadMovies(data));
            dispatch(onSelectGenre(null)); //Reset the genre selected

        } catch (error) {
          console.log('Error loading generes');
          console.log(error)
        }
        

        
    }


    return {
        actors, 

        startLoadingActors,
        setActiveActor
    }
}