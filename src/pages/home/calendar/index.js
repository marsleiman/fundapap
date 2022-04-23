import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';

function Calendar(props) {
  return (
    <div className={'calendar__container'}>
      <div className={'calendar__table-next-meets'}>
      <h2 className={'calendar__title'}>Siguientes Reuniones:</h2>
        {props.nexts.map(e => 
          <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            <ListItem alignItems="flex-start">
              <ListItemText primary={e.title} />
            </ListItem>
            <Divider variant="inset" component="li" />
          </List>
        )}
      </div>
    </div>
)};

export default Calendar;