import React from "react";
 
const Preview = ({ photos,deleteOnLoad }) => {
  // наработка style={sel.includes(item.id)?{opacity:0.5}:{opacity:1}}

  return ( 
    <div className="previewWrapper">
      preview
      <div className="previewContainer"> 
      {photos.map((item) => (
        <div className="previewItem" key={item.id}>
          <div className="previewItemDelete" onClick={( )=>{deleteOnLoad(item)}}>&times;</div>
          <img src={item.photo_src} alt="car" />
          
        </div>
      ))}
      </div>
    </div>
  );
};

export default Preview;
