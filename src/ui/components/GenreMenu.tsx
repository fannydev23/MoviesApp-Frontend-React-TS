import { Chip, Grid } from '@mui/material'
import { useGenresStore } from '../../hooks/useGenreStore'
import { useEffect } from 'react';
import { Genre } from '../../interfaces/genreInferface';

type Props={
    onChangeGenre:()=>void;
}


export const GenreMenu = ({onChangeGenre} : Props) => {

    const {genres, startLoadingGenres, setActiveGenre} = useGenresStore();

    useEffect(() => {
        startLoadingGenres();
    }, []);

    const handleSelectGenre=(genre:Genre)=>{
        setActiveGenre(genre);
        onChangeGenre();
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
