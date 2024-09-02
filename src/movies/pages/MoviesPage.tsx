import { useEffect, useState } from 'react'
import { Divider, Grid, Grid2, IconButton, InputBase} from '@mui/material'
import { Clear, Search } from '@mui/icons-material'
import { GenreMenu } from '../../ui/components/GenreMenu'
import { MovieItem } from '../components/MovieItem'
import { useMoviesStore } from '../../hooks/useMoviesStore'
import { Movie } from '../../interfaces/movieInterface'
import { useGenresStore } from '../../hooks/useGenreStore'
import { ActorsMenu } from '../../ui/ActorsMenu'


export const MoviesPage = () => {

    const {movies, startLoadingMovies, startLoadingMoviesWithSearch} = useMoviesStore();


    const { genreSelected } = useGenresStore();

  const [search, setSearch] = useState<string>('');


  useEffect(() => {
    startLoadingMovies();
  }, []);

  useEffect(() => {
    if(search.trim()===''){
        startLoadingMovies()
    }
  }, [search])
  

  const handleSearch=()=>{
    if(search!==''){
        startLoadingMoviesWithSearch(search)
    }else{
        startLoadingMovies();
    }
  }

  const handleClear=()=>{
    setSearch('');
    startLoadingMovies();
  }



  return (

    //Todo: Add loading spinner and message 
    //Make filters work together

    <Grid item container xs={12} className='mainScreen' justifyContent='space-between' alignItems='center'>
      <h1>Movies</h1>
    
       

      <Grid item container xs={12} sm={6} md={6} lg={6} alignItems='center'>
        <Grid item xs={3}>
            <ActorsMenu onSelectActor={()=>setSearch('')}/>
        </Grid>

      {/* Todo: This could be an encapsulated component for reuse in several pages */}
        <Grid item xs={8}>
            <InputBase
            type='search'
            fullWidth
            placeholder='Search movie'
            value={search}
            onChange={({target})=>{
                setSearch(target.value)
            }}
            className='searchInput'
            onKeyDown={(e)=>{
                if(e.keyCode && e.keyCode===13) handleSearch();
            }}
            endAdornment={
                <>

                    {
                        search.trim().length>0 &&
                        <IconButton style={{padding:'5px'}} onClick={handleClear}>
                            <Clear style={{color:'#012e67'}}/>
                        </IconButton>
                    }
                    <IconButton style={{padding:'5px'}} onClick={handleSearch}>
                        <Search style={{color:'#012e67'}}/>
                    </IconButton>

                
                </>
            }
            />
        </Grid>

      </Grid>

      <Grid item container xs={12} justifyContent='center'>
        <GenreMenu onChangeGenre={()=>setSearch('')}/>

        <Divider></Divider>

        <Grid item xs={12} className='genreTitle'>{genreSelected && genreSelected.idGender?genreSelected.gender:'All'}</Grid>

        <Grid item container md={12} lg={10} justifyContent='space-between'>
        {
            movies.length>0?
            movies.map((m:Movie)=>{

                return(
                    <MovieItem
                        movie={m}
                        key={`movie_${m.idMovie}`}
                    />
                )
            })
            :
            <h3>{`No movies found`}</h3>
         }
        </Grid> 
        
      </Grid>


    </Grid>
  )
}
