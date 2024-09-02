import { useDispatch, useSelector } from 'react-redux';

import {RootState} from '../store/store'
import { onLoadMovies } from '../store/movies/moviesSlice';
import { moviesApi } from '../api';
import { onSelectGenre } from '../store';


// let listMovies: Movie[] = [
//     { 
//         id: 1,
//         title:'Los Juegos del hambre',
//         image:'https://movies-production-assets-wtfmomsn.s3.amazonaws.com/posters/tt1392170.jpg'
//     },
//     { 
//         id: 2,
//         title:'Los Juegos del hambre: En Llamas',
//         image:'https://movies-production-assets-wtfmomsn.s3.amazonaws.com/posters/tt1392170.jpg'
//     },
//     { 
//         id: 3,
//         title:'Los Juegos del hambre: Sinsajo Parte 1',
//         image:'https://movies-production-assets-wtfmomsn.s3.amazonaws.com/posters/tt1392170.jpg'
//     },
//     { 
//         id: 4,
//         title:'Los Juegos del hambre: Sinsajo Parte 2',
//         image:'https://movies-production-assets-wtfmomsn.s3.amazonaws.com/posters/tt1392170.jpg'
//     },
//     { 
//         id: 5,
//         title:'Los Juegos del hambre: La balada de los pajaros cantores y las serpientes',
//         image:'https://movies-production-assets-wtfmomsn.s3.amazonaws.com/posters/tt1392170.jpg'
//     }
// ];

export const useMoviesStore = () => {
  
    const dispatch = useDispatch();
    const { movies } = useSelector( (state:RootState) => state.movies );

    const startLoadingMovies = async() => {
        try {
            const { data } = await moviesApi.get('api/Movies');

            dispatch(onLoadMovies(data));



        } catch (error) {
          console.log('Error loading movies');
          console.log(error)
        }
    }

    const startLoadingMoviesWithSearch = async(search:string) => {
        try {
            const { data } = await moviesApi.get(`api/Movies/Search?query=${search}`);

            dispatch(onLoadMovies(data));
            dispatch(onSelectGenre(null)); //Reset the genre selected



        } catch (error) {
          console.log('Error loading movies');
          console.log(error)
        }
    }


    return {
        movies, 

        startLoadingMovies,
        startLoadingMoviesWithSearch
        
    }
}