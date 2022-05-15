import React from 'react';

const CalendarIcon = ({...props}) => {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" {...props} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M1 8.875H19M14.5 5.5V1M5.5 5.5V1M1 3.25H19V19H1V3.25Z"
        stroke="#E8E8E8"
        strokeWidth="2"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"/>
    </svg>
  );
};

export default CalendarIcon;