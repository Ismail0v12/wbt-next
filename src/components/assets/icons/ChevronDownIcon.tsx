import React from 'react';

const ChevronDownIcon = ({...props}) => {
  return (
    <svg width="10" height="6" viewBox="0 0 10 6" {...props} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M9 0.999998L5 5L1 0.999998"
        stroke="#E8E8E8"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"/>
    </svg>
  );
};

export default ChevronDownIcon;