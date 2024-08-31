import { useEffect, useState } from 'react'
import { Button, Grid, IconButton, InputBase, Menu, MenuItem } from '@mui/material'
import { Search } from '@mui/icons-material'
import { GenreMenu } from '../../ui/components/GenreMenu'
import { MovieItem } from '../components/MovieItem'
import { Actors } from '../../interfaces/actorsInterface'
import { useMoviesStore } from '../../hooks/useMoviesStore'
import { Movie } from '../../interfaces/movieInterface'
import { useActorsStore } from '../../hooks/useActorsStore'


export const MoviesPage = () => {

    const {movies, startLoadingMovies} = useMoviesStore();

    const {actors, startLoadingActors} = useActorsStore();


  const [search, setSearch] = useState<String>('');

  const [openMenu, setOpenMenu] = useState<Boolean>(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement|null>(null);

  useEffect(() => {
    startLoadingMovies();
    startLoadingActors();
  }, [])

  const handleMenuClick=(e:React.MouseEvent<HTMLButtonElement>)=>{
    setAnchorEl(e.currentTarget)
    setOpenMenu(true)
  }

  const handleClose=()=>{
    setAnchorEl(null);
  }

  return (

    <Grid item container xs={12} className='mainScreen' justifyContent='space-between' alignItems='center'>
      <h1>Movies</h1>
    
       

      {/* Todo: This could be an encapsulated component for reuse in several pages */}
      <Grid item container xs={12} sm={6} md={6} lg={6} alignItems='center'>
        <Grid item xs={3}>
            <Button
                 id="actors-button"
                 aria-controls={openMenu ? 'actors-menu' : undefined}
                 aria-haspopup="true"
                 aria-expanded={openMenu ? 'true' : undefined}
                 onClick={handleMenuClick}
               
            >
                Actores
            </Button>

            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                MenuListProps={{
                'aria-labelledby': 'basic-button',
                }}
            >
                
                {
                    actors.map((a:Actors)=>{
                        return(
                            <MenuItem key={a.idActor.toString()} onClick={handleClose}>{`${a.name} ${a.lastName}`}</MenuItem>
                        )
                    })
                }
            </Menu>
        </Grid>

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
            endAdornment={
                <>

                    <IconButton style={{padding:'5px'}}>
                        <Search style={{color:'#012e67'}}/>
                    </IconButton>

                
                </>
            }
            />
        </Grid>

      </Grid>

      <Grid item container xs={12}>
        <GenreMenu/>
         
         {
            movies.map((m:Movie)=>{

                return(
                    <MovieItem
                        movie={m}
                        key={`movie_${m.idMovie}`}
                    />
                )
            })
         }
      </Grid>


    </Grid>
  )
}
