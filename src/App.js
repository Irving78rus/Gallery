import axios from "axios";
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
    if (selectedFotos.includes(foto)) {                 // setSel(sel.splice(sel.indexOf(foto.id), 1))
      selectedFotos.splice(selectedFotos.indexOf(foto), 1);
    } else {                                                  // setSel((prev)=>[...prev, foto.id])
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
  const [img, setImg] = useState(null);
  const [avatar, seAvatar] = useState(null);
const sendFile =React.useCallback (async()=>{
  try{
    const data = new FormData()
    data.append( 'img',img)
    data.append('data', data)
    console.log(img);
    console.log(data);
// await axios.post('/',data).then(res=>seAvatar(res.data.path))
  }
  catch(error){

  }
},[img])



  return (<div className='App'>
    <input type="file" onChange={(e) => setImg(e.target.files)} />
    <button onClick={sendFile}> jnghgdbnm</button>
    <img  src={`${avatar}`}   alt='foto'/>
    <div className={modalVisibileted ? "modal " : null} onClick={() => { showModal() }}> </div>
    <div >
      <Button isDisable={!selectedFotos.length} onClick={() => { swap(selectedFotos, fotos) }}>“Расположить первыми” </Button>
      <Button isDisable={selectedFotos.length} onClick={() => { selectAll() }}>“Выбрать всё” </Button>
      <Button className='buttonReset' isDisable={!selectedFotos.length} onClick={() => { resetAll() }}  >“Сбросить” </Button>
    </div>
    {isSlider
      ? <Slider fotos={fotos} hendlerSelect={hendlerSelect} sel={sel} />
      : <Gallery fotos={fotos} hendlerSelect={hendlerSelect} sel={sel} />
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
