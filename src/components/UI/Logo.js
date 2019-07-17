import React from 'react';

const Logo = ({ props }) => {
  return (
    <svg
      width='50'
      height='50'
      viewBox='0 0 65 60'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M30.2453 25.8743H40.1125V16.6238H57.273V25.8743H62.2494C64.0323 23.193 65.0667 20.1532 65.0667 16.8209C65.0667 7.5325 57.0366 0.00120663 47.131 0.00120663C41.1124 0.00120663 35.7867 2.78053 32.5333 7.04557C29.28 2.78039 23.9543 0 17.9357 0C8.03008 0 0 7.52955 0 16.818C0 20.8558 1.51755 24.5606 4.04686 27.4597L32.5333 59.7931L40.1125 51.1903V41.9622H30.2453V25.8743Z'
        fill='url(#paint0_linear)'
      />
      <defs>
        <linearGradient
          id='paint0_linear'
          x1='32.5333'
          y1='0'
          x2='32.5333'
          y2='59.7931'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='#B5F42A' />
          <stop offset='0.416667' stopColor='#2AB5F4' />
          <stop offset='0.84375' stopColor='#F42AB5' />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default Logo;
