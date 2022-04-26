import React  from "react";

const Gallery = ({fotos,hendlerSelect}) => {
 
 
  return (
    <div className="gallery">
        {fotos.map(item => <img key={item.id} src={item.foto_src} onClick={() => { hendlerSelect(item) }} />)}
      </div>
  );
};

export default Gallery;
