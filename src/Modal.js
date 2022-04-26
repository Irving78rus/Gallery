import React  from "react";
import Button from './Button';
import "./App.css";
const Modal = ({ showModal, modalVisibileted, selectedFotos }) => {

    return (
        <div className={modalVisibileted ? "modalActiv " : "conceal"}> <div>

            <Button onClick={() => {showModal()}} > x</Button>
        </div>
            <div className='modalWrap'>
                {selectedFotos.map(item => <img key={item.id} src={item.foto_src} />)}
            </div>
            <div className='modalbtn'>
                <Button onClick={() => {showModal()}} > “Закрыть”</Button>
            </div>
        </div>
    );
};

export default Modal;
