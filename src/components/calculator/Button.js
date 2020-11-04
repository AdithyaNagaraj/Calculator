import React from 'react';
import { operators } from '../../utils/constants';

export default ({ onButtonClick, buttonKey}) => {
  let handleClick = () => { onButtonClick(buttonKey) }
  let classNames = [
    'btn',
    operators.includes(buttonKey) ? 'btn--blue' : '',
    buttonKey === '=' ? 'btn--zero': ''
  ];

  return (
    
    <button
      className={ classNames.join(' ').trim()}
      onClick={handleClick}>
      { buttonKey }
    </button>
  );
}