import React from 'react';
import './Breadcrum.css';
import arrow_icon from '../../assets/Assets/arrow_icon.svg'
const Breadcrum = (props) => {
  const {event}=props;
  return (
    <div className='breadcrum'>
      Home <img src={arrow_icon} alt='arrow' />
      Book Event <img src={arrow_icon} alt='arrow' />
      {event.category} <img src={arrow_icon} alt='arrow' />
      {event.description}
    </div>
  );
};

export default Breadcrum;
