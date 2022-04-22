import React from 'react';
import {Button} from "@material-ui/core";

function Highlight(props) {
    let button;
    if (props.button) {
        button =
            <Button className={'button_highlight'} variant="contained" href={props.button.href}>
                {props.button.text}
            </Button>
    }

    return (
        <div className={'parent_div_highlight'}>
            <div className={'parent_h_highlight'}>
                <h2 className={'child_h3_highlight'}>{props.title}</h2>
                <h3 className={'child_h4_highlight'}>{props.subtitle}</h3>
            </div>
            {button ? button : ''}
        </div>
    );
}

export default Highlight;