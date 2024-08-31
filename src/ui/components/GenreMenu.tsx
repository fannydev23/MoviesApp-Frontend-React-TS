import { Chip, Grid } from '@mui/material'
import { useGenresStore } from '../../hooks/useGenreStore'
import { useEffect } from 'react';
import { Genre } from '../../interfaces/genreInferface';


export const GenreMenu = () => {

    const {genres, startLoadingGenres, setActiveGenre} = useGenresStore();

    useEffect(() => {
        startLoadingGenres();
    }, []);

    const handleSelectGenre=(genre:Genre)=>{
        console.log(genre)
        setActiveGenre(genre);
    }
    

    return (
        <Grid item container xs={12}>
            {
                genres.map((g:Genre)=>{
                    return(
                        <Chip
                            key={`gender_${g.idGender}_${g.gender}`}
                            label={g.gender}
                            className='genderChip'
                            onClick={()=>handleSelectGenre(g)}
                        />
                    )
                })
            }
        </Grid>
    )
}
