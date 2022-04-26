import React, { useState, useEffect } from "react";
import "./App.css";
import Button from './Button';
import Gallery from "./Gallery";
import Modal from "./Modal";
import Slider from "./Slider";

function App({ items }) {

  const [fotos, setFotos] = useState([]);
  useEffect(() => {
    setFotos(items.map(item => item))
  }, []);

  const [modalVisibileted, setmodalVisibileted] = useState(false);
  const showModal = () => {
    setmodalVisibileted(!modalVisibileted)
  }

  const [isSlider, setIsSlider] = useState(true);
  const rollReroll = () => {
    setIsSlider(!isSlider)
  }
  const [sel, setSel] = useState([]);
  const [selectedFotos, setSelectedFotos] = useState([]);
  function hendlerSelect(foto) {
    console.log(sel);
    if (selectedFotos.includes(foto)) {
       

    setSel((prev)=>{
      prev.splice(sel.indexOf(foto.id), 1)
      return prev
    })

      selectedFotos.splice(selectedFotos.indexOf(foto), 1);
    } else {
      
      setSel((prev)=>[...prev, foto.id])
      setSelectedFotos((prev) => [...prev, foto]);
    }
  }

  const selectAll = () => {
    setSelectedFotos(fotos.map((item) => item));
    setSel(fotos.map((item) => item.id))
  };
  const resetAll = () => {
    setSelectedFotos([]);
    setSel([])
  };

  const swap = (selectedFotos, fotos) => {
    selectedFotos.map(item => {
      if (fotos.includes(item)) {
        fotos.splice(fotos.indexOf(item), 1)
      }
    });
    setFotos([...selectedFotos, ...fotos])
  }

  return (<div className='App'>
    <div className={modalVisibileted ? "modal " : null} onClick={() => { showModal() }}> </div>
    <div >
      <Button disabled isDisable={!selectedFotos.length} onClick={() => { swap(selectedFotos, fotos) }}>“Расположить первыми” </Button>
      <Button disabled isDisable={selectedFotos.length} onClick={() => { selectAll() }}>“Выбрать всё” </Button>
      <Button disabled className='buttonReset' isDisable={!selectedFotos.length} onClick={() => { resetAll() }}  >“Сбросить” </Button>
    </div>
    {isSlider
      ? <Slider fotos={fotos} hendlerSelect={hendlerSelect} sel={sel}/>
      : <Gallery fotos={fotos} hendlerSelect={hendlerSelect} sel={sel}/>
    }
     
      {isSlider
        ? <Button onClick={() => { rollReroll() }}>“Развернуть”</Button>
        : <Button onClick={() => { rollReroll() }}>“Свернуть”</Button>
      }
    
    <div>
      <Button onClick={() => { showModal() }}>“Показать выбранные”</Button>

      {selectedFotos.length && selectedFotos.length < fotos.length 
      ? <p>Выбрано {selectedFotos.length} картинок из {fotos.length}</p> 
      : null}

      {selectedFotos.length && selectedFotos.length === fotos.length 
      ? <p>Выбраны все {selectedFotos.length} изображений</p> 
      : null}

    </div>
    <Modal showModal={showModal} modalVisibileted={modalVisibileted} selectedFotos={selectedFotos} />

  </div>
  );
}

export default App;
