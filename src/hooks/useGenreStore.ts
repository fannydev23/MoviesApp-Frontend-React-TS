import { useDispatch, useSelector } from 'react-redux';

import {RootState} from '../store/store'
// import { Genre } from '../interfaces/genreInferface';
import { onLoadGenres } from '../store/genres/genresSlice';
import { moviesApi } from '../api';


// const generes:Genre[] = [
//     {
//         idGender:1,
//         gender:'Love'
//     },
//     {
//         idGender:2,
//         gender:'Action'
//     },
//     {
//         idGender:3,
//         gender:'Science fiction'
//     }    

// ]

export const useGenresStore = () => {
  
    const dispatch = useDispatch();
    const { genres } = useSelector( (state:RootState) => state.genres );

    const startLoadingGenres = async() => {
        try {
            
            const {data} = await moviesApi.get('api/Gender');
            dispatch(onLoadGenres(data));


        } catch (error) {
          console.log('Error loading generes');
          console.log(error)
        }
    }


    return {
        genres, 

        startLoadingGenres,
        
    }
}