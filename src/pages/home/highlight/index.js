import React from 'react';
import { Link } from "react-router-dom";

function Highlight(props) {
  let button;
  if (props.button) {
      button =
          <Link to={props.button.href}>{props.button.text}</Link>
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
