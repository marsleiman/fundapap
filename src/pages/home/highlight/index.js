import React from 'react';
import { Link } from "react-router-dom";

function Highlight(props) {
  let button;
  if (props.button) {
      button =
          <Link className="button_redirect" to={props.button.href}>{props.button.text}</Link>
  }

  return (
      <div className={'parent_div_highlight'}>
          <div className={'parent_h_highlight'}>
              <h2 className={'child_h3_highlight'}>{props.title}</h2>
              <h3 className={'child_h4_highlight'}>{props.subtitle}</h3>
              <span className={'child_h4_highlight'}>{props.text}</span>
              {button ? button : ''}
          </div>
      </div>
  );
}

export default Highlight;
