import React  from "react";

const Gallery = ({fotos,hendlerSelect,sel}) => {
 // menyat zna item.sel
 console.log(sel);
  return (
    <div className="gallery">
        {fotos.map(item => <img key={item.id} src={item.foto_src} onClick={() => { hendlerSelect(item) }} style={sel.includes(item.id)?{opacity:0.5}:{opacity:1}} alt='foto'/>)}
      </div>
  );
};

export default Gallery;
 