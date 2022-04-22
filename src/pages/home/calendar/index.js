import React from 'react';
import {Grid} from "@mui/material";

function Calendar(props) {

    return <div className={'calendar__container'}>
        <br/>
        <h2 className={'calendar__title'}>Siguientes Reuniones:</h2>
        <Grid className={'calendar__grid'}
              direction="row"
              justifyContent="center"
              alignItems="center"
              container
              spacing={3}>
        {
            props.nexts.slice(0,6).map(
                (elem, index) => <Grid item xs={12} sm={6} md={4} >
                    <div className={'calendar__grid_item calendar__grid_item_' + ((index % 2 === 0) ? 'par' : 'impar')}>
                        <h2 className={'calendar__grid_item_text'}>{elem.title}</h2>
                    </div>
                </Grid>
            )
        }
        </Grid>
    </div>

}

export default Calendar;