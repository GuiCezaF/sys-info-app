import React from "react";

export const Icon: React.FC<{ size?: number; className?: string }> = ({ 
  size = 24, 
  className = "" 
}) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 64 64" 
      fill="currentColor" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect x="10" y="28" width="10" height="26" rx="2"/>
      <rect x="27" y="18" width="10" height="36" rx="2"/>
      <rect x="44" y="10" width="10" height="44" rx="2"/>
    </svg>
  );
};
