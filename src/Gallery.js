import React from "react";
import Checked from "./Checked";
const Gallery = ({ photos, handlerSelect, selectedPhotos, modalVisible }) => {
  // наработка style={sel.includes(item.id)?{opacity:0.5}:{opacity:1}}

  return (
    <div className={modalVisible ? "gallery   z-1" : "gallery"} >

      {photos.map(item => <div className="blockItem" key={item.id}>
        <img src={item.photo_src} onClick={() => { handlerSelect(item) }} alt='car' />
        {selectedPhotos.includes(item) && <Checked />}
      </div>)}
    </div>
  );
};

export default Gallery;
