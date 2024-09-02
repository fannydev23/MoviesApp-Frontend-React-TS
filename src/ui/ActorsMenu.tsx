import React, { useEffect, useState } from 'react'
import { useActorsStore } from '../hooks/useActorsStore';
import { Actors } from '../interfaces/actorsInterface'
import { Button, Menu, MenuItem } from '@mui/material';

type Props={
    onSelectActor:()=>void;
}


export const ActorsMenu = ({onSelectActor}:Props) => {

    const {actors, startLoadingActors, setActiveActor} = useActorsStore();

    useEffect(() => {
        startLoadingActors();
      }, [])

    const [openMenu, setOpenMenu] = useState<Boolean>(false);
    const [anchorEl, setAnchorEl] = useState<HTMLElement|null>(null);

    const handleMenuClick=(e:React.MouseEvent<HTMLButtonElement>)=>{
        setAnchorEl(e.currentTarget)
        setOpenMenu(true)
      }
    
      const handleClose=()=>{
        setAnchorEl(null);
      }

      const handleSelectActor=(actor:Actors)=>{
        onSelectActor();
        setActiveActor(actor)
        setAnchorEl(null);
      }
    
    return (
        <>
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
                            <MenuItem key={a.idActor.toString()} onClick={()=>handleSelectActor(a)}>{`${a.name} ${a.lastName}`}</MenuItem>
                        )
                    })
                }
            </Menu>
        </>
    )
}