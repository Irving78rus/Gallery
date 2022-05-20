import React, { useState } from "react";

const Button = ( {type,disabled,onClick,children,isDisable,className}) => {
 
 
  return (
    <button type={type} disabled={isDisable?disabled:null} 
    onClick={onClick} className={className}  > 
  {children}
</button>
 
     
  );
};

export default Button;
