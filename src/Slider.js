import React, { useState, useEffect } from "react";
import Button from "./Button";
import "./App.css";
import Checked from "./Checked";
const PAGE_WIDTH = 900;
// const maxOffset = -900
const Slider = ({ photos, handlerSelect, selectedPhotos, modalVisible }) => {
  const [offset, setOffset] = useState(0);
  const [maxOffset, setMaxOffset] = useState(0);
  useEffect(() => {
    setMaxOffset(-(PAGE_WIDTH * (Math.ceil(photos.length / 3) - 1)));
  }, [photos]);
   
  const right = () => {
    setOffset((prev) => {
      
      const newOffset = prev - PAGE_WIDTH;
      return Math.max(newOffset, maxOffset);
    });
  };
  const left = () => {
    setOffset((prev) => {
      const newOffset = prev + PAGE_WIDTH;
      const minOffset = 0;
      return Math.min(newOffset, minOffset);
    });
  };
  return (
    <>
      <div className={modalVisible ? "slider   z-1" : "slider"}>
        {photos.length > 3 && (
          <Button
            disabled
            isDisable={!offset}
            onClick={() => {
              left();
            }}
          >{`<`}</Button>
        )}

        <div className="main-container">
          <div className="window">
            <div
              className="all-pages-container"
              style={{ transform: `translateX(${offset}px)` }}
            >
              {photos.map((item) => (
                <div className="blockItem" key={item.id}>
                  <img
                    src={item.photo_src}
                    onClick={() => {
                      handlerSelect(item);
                    }}
                    alt="car"
                  />
                  {selectedPhotos.includes(item) && <Checked />}
                </div>
              ))}
            </div>
          </div>
        </div>
      {console.log(  offset, maxOffset)} 
        {photos.length > 3 && (
          <Button
            disabled
            isDisable={offset <= maxOffset}
            onClick={() => {
              right();
            }}
          >{`>`}</Button>
        )}
      </div>
    </>
  );
};

export default Slider;
