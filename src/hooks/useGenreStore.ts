import { useDispatch, useSelector } from 'react-redux';

import {RootState} from '../store/store'
// import { Genre } from '../interfaces/genreInferface';
import { onLoadGenres, onSelectGenre } from '../store/genres/genresSlice';
import { moviesApi } from '../api';
import { Genre } from '../interfaces/genreInferface';
import { onLoadMovies } from '../store';


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
    const { genres, genreSelected } = useSelector( (state:RootState) => state.genres );

    const startLoadingGenres = async() => {
        try {
            
            const {data} = await moviesApi.get('api/Gender');
            dispatch(onLoadGenres(data));


        } catch (error) {
          console.log('Error loading generes');
          console.log(error)
        }
    }

    const setActiveGenre=async(genre:Genre)=>{
        try {

            const url = genre.idGender!==0?`api/Movies/ByGenre/${genre.idGender}`:'api/Movies'

            dispatch(onSelectGenre(genre))
            const {data} = await moviesApi.get(url);
            dispatch(onLoadMovies(data));


        } catch (error) {
          console.log('Error loading generes');
          console.log(error)
        }
        

        
    }


    return {
        genres, 
        genreSelected,


        startLoadingGenres,
        setActiveGenre
    }
}