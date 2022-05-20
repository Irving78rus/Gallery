import React from "react";
import Checked from "./Checked";
const Gallery = ({ photos, handlerSelect, selectedPhotos, modalVisible,deletePhotos }) => {
 

  return (
    <div className={modalVisible ? "gallery   z-1" : "gallery"} >

      {photos.map(item => <div className="blockItem" style={{margin:"3px"}} key={item.id}>
      <div className="previewItemDelete" onClick={( )=>{deletePhotos(item)}}>&times;</div>
        <img src={item.photo_src} onClick={() => { handlerSelect(item) }} alt='car' />
        {selectedPhotos.includes(item) && <Checked />}
      </div>)}
    </div>
  );
};

export default Gallery;
