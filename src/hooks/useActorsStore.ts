import { useDispatch, useSelector } from 'react-redux';
import {RootState} from '../store/store'
import { onLoadActors } from '../store';
// import { Actors } from '../interfaces/actorsInterface';
import { moviesApi } from '../api';


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
            console.log(actors);


        } catch (error) {
          console.log('Error loading actors');
          console.log(error)
        }
    }


    return {
        actors, 

        startLoadingActors,
        
    }
}