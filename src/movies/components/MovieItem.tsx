import { Grid } from "@mui/material";
import { Movie } from "../../interfaces/movieInterface";


type Props = {
    movie: Movie,
    key: String
}

export const MovieItem = ({movie}: Props) => {
   
    const {imageUrl, title} = movie;

    return (
        <Grid item container xs={3} className="movieItem" justifyContent='center'>
            <img
                src={imageUrl}
                alt={title}
                className='moviePoster'
            />

            <p className='movieTitle'>
                {title}
            </p>
        </Grid>
    )
}