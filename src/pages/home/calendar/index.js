import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';

function Calendar(props) {
  return (
    <div className={'content-fundapap__app calendar__container'}>
      <div className={'calendar__table-next-meets'}>
      <h2 className={'calendar__title'}>Siguientes Reuniones:</h2>
        {props.nexts.map(e => 
            <ul class="MuiList-root MuiList-padding css-1mcnwpj-MuiList-root">
              <li class="MuiListItem-root MuiListItem-gutters MuiListItem-padding MuiListItem-alignItemsFlexStart css-hhvo2v-MuiListItem-root">
                <div class="MuiListItemText-root css-tlelie-MuiListItemText-root">
                  <span class="MuiTypography-root MuiTypography-body1 MuiListItemText-primary css-10hburv-MuiTypography-root">
                  {e.title}
                  </span>
                </div>
              </li>
            </ul>
        )}
      </div>
    </div>
)};

export default Calendar;