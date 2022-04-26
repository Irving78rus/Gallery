import React, { useState } from "react";

const Button = ( {type,disabled,onClick,children,isDisable,className}) => {
 
 
  return (
    <button type={type} disabled={isDisable?disabled:null} onClick={onClick} className={className} style={isDisable?null:{backgroundColor: "rgba(45, 45, 164, 0.651)"}}> 
  {children}
</button>
 
     
  );
};

export default Button;
