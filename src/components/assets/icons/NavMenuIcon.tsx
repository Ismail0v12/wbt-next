import React from 'react';

const NavMenuIcon = ({...props}) => {
  return (
    <svg width="36" height="36" {...props} viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="18" cy="18" r="17.5" stroke="#DB9200"/>
      <path
        d="M10 24H26C26.55 24 27 23.55 27 23C27 22.45 26.55 22 26 22H10C9.45 22 9 22.45 9 23C9 23.55 9.45 24 10 24ZM10 19H26C26.55 19 27 18.55 27 18C27 17.45 26.55 17 26 17H10C9.45 17 9 17.45 9 18C9 18.55 9.45 19 10 19ZM9 13C9 13.55 9.45 14 10 14H26C26.55 14 27 13.55 27 13C27 12.45 26.55 12 26 12H10C9.45 12 9 12.45 9 13Z"
        fill="#DB9200"/>
    </svg>
  );
};

export default NavMenuIcon;