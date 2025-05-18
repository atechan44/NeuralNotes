import React from 'react';

const CustomMenuIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    width="22" // Adjusted size to match the previous Menu icon
    height="22" // Adjusted size to match the previous Menu icon
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props} // Pass through any other props like className
  >
    <rect
      x="3"
      y="3"
      width="18"
      height="18"
      rx="2"
      stroke="currentColor" // Changed from white to currentColor
      strokeWidth="2"
    />
    <line
      x1="10"
      y1="3"
      x2="10"
      y2="21"
      stroke="currentColor" // Changed from white to currentColor
      strokeWidth="2"
    />
    <circle cx="15" cy="8" r="1" fill="currentColor" /> {/* Changed from white to currentColor */}
    <circle cx="15" cy="11" r="1" fill="currentColor" /> {/* Changed from white to currentColor */}
  </svg>
);

export default CustomMenuIcon; 