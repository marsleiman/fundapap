import React from 'react';
import {blueGrey, indigo} from "@mui/material/colors";
import {CircularProgress} from "@mui/material";

function Loading() {
    return (
        <div className={'parent_div_loading'}>
            <h3 className={'child_h3_loading'}>
                <CircularProgress color="inherit" size="1rem"/> Cargando datos...
            </h3>
        </div>
    );
}

export default Loading;