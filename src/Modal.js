import React  from "react";
import Button from './Button';
import "./App.css";
const Modal = ({ showModal, modalVisible, selectedPhotos }) => {

    return (
        <div className={modalVisible ? "modalActiv " : "conceal"}> <div>

            <Button onClick={() => {showModal()}} > x</Button>
        </div>
            <div className='modalWrap  '>
                {selectedPhotos.map(item => <img key={item.id} src={item.photo_src}  />)}
            </div>
            <div className='modalbtn'>
                <Button onClick={() => {showModal()}} > “Закрыть”</Button>
            </div>
        </div>
    );
};

export default Modal;
