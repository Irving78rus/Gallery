import React from "react";
import Checked from "./Checked";
const Gallery = ({ fotos, hendlerSelect, selectedFotos, modalVisibileted }) => {
  // наработка style={sel.includes(item.id)?{opacity:0.5}:{opacity:1}}

  return (
    <div className={modalVisibileted ? "gallery   z-1" : "gallery"} >

      {fotos.map(item => <div className="blockItem" key={item.id}>
        <img src={item.foto_src} onClick={() => { hendlerSelect(item) }} alt='foto' />
        {selectedFotos.includes(item) && <Checked />}
      </div>)}
    </div>
  );
};

export default Gallery;
