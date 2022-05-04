import React, { useState, useEffect } from "react";
import Button from "./Button";
import "./App.css";
import Checked from "./Checked";
const PAGE_WIDTH = 900;
// const maxOffset = -900
const Slider = ({ fotos, hendlerSelect, selectedFotos, modalVisibileted }) => {
  const [offset, setOffset] = useState(0);
  const [maxOffset, setMaxOffset] = useState(0);
  useEffect(() => {
    setMaxOffset(-(PAGE_WIDTH * (Math.trunc(fotos.length / 3) - 1)));
  }, [fotos]);
   
  const riht = () => {
    setOffset((prev) => {
      const newOffset = prev - PAGE_WIDTH;
      return Math.min(newOffset, maxOffset);
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
      <div className={modalVisibileted ? "slider   z-1" : "slider"}>
        {fotos.length > 3 && (
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
              {fotos.map((item) => (
                <div className="blockItem" key={item.id}>
                  <img
                    src={item.foto_src}
                    onClick={() => {
                      hendlerSelect(item);
                    }}
                    alt="foto"
                  />
                  {selectedFotos.includes(item) && <Checked />}
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* {console.log(fotos.length, offset, maxOffset)} */}
        {fotos.length > 3 && (
          <Button
            disabled
            isDisable={offset < maxOffset}
            onClick={() => {
              riht();
            }}
          >{`>`}</Button>
        )}
      </div>
    </>
  );
};

export default Slider;
