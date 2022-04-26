import React, { useState } from "react";
import Button from './Button';
import "./App.css";
const PAGE_WIDTH = 900
const Slider = ({ fotos, hendlerSelect }) => {
    const [offset, setOffset] = useState(0)
    const [maxOffset, setMaxOffset] = useState((PAGE_WIDTH * (Math.ceil(fotos.length / 3) - 2)))
    console.log(Math.ceil(fotos.length / 3));
    const riht = () => {
        setOffset((prev) => {
            const newOffset = prev - PAGE_WIDTH
            return Math.max(newOffset, maxOffset)
        })
        }
    const left = () => {
        setOffset((prev) => {
            const newOffset = prev + PAGE_WIDTH
            const minOffset = 0
            return Math.min(newOffset, minOffset)
        })
        }
    return (
        <div className='slider' >
            {fotos.length > 3 && <Button disabled isDisable={!offset} onClick={() => { left() }}>{`<`}</Button>}

            <div className="main-container">
                <div className="window">
                    <div className="all-pages-container" style={{transform: `translateX(${offset}px)`}}>
                        {fotos.map(item => <img key={item.id} src={item.foto_src} onClick={() => {hendlerSelect(item)}} />)}
                    </div>
                </div>
            </div>
            {fotos.length > 3 && <Button disabled isDisable={offset === maxOffset} onClick={() => { riht() }}>{`>`}</Button>}

        </div>

    );
};

export default Slider;
