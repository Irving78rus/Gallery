 
import React, { useState, useEffect } from "react";
import "./App.css";
import Button from './Button';
import Gallery from "./Gallery";
import Modal from "./Modal";
import Slider from "./Slider";
 

function App({ items }) {
  const [img, setImg] = useState(null);
  const [uploadedPhotos, setUploadedPhotos] = useState([]);
  const [fotos, setFotos] = useState([]);
  useEffect(() => {
    setFotos(
      uploadedPhotos.map(item => item))
  }, [uploadedPhotos]);

  const [modalVisibileted, setmodalVisibileted] = useState(false);
  const showModal = () => {
    setmodalVisibileted(!modalVisibileted)
  }

  const [isSlider, setIsSlider] = useState(true);
  const rollReroll = () => {
    setIsSlider(!isSlider)
  }

  const [selectedFotos, setSelectedFotos] = useState([]);


  function hendlerSelect(foto) {
    console.log('click');
    if (selectedFotos.includes(foto)) {
      // selectedFotos.splice(selectedFotos.indexOf(foto), 1)  почему это не работало
      // setSelectedFotos(selectedFotos)
      setSelectedFotos(selectedFotos.filter(item => item.id !== foto.id))
    } else {
      setSelectedFotos((prev) => [...prev, foto]);
    }
  }

  const selectAll = () => {
    setSelectedFotos(fotos.map((item) => item));

  };
  const resetAll = () => {
    setSelectedFotos([]);

  };

  const swap = (selectedFotos, fotos) => {
    selectedFotos.map(item => {
      if (fotos.includes(item)) {
        fotos.splice(fotos.indexOf(item), 1)
      }
    });
    setFotos([...selectedFotos, ...fotos])
    setSelectedFotos([]);
  }

  const getWord = (number, first, second, thurd) => {
    const lastFigure = number % 10;
    if (lastFigure === 1) return first;
    if (lastFigure > 1 && lastFigure < 5) return second;
    else return thurd;
  };

 
console.log(img);
  const sendFile = () => {
    const photoUrl = URL.createObjectURL(img)
    setUploadedPhotos((prev) => [...prev, {
      id: img.size,
      foto_src: photoUrl
    }]);

  }
  return (<div className='App'>
    <input type="file" onChange={(e) => setImg(e.target.files[0])} />
    <button onClick={sendFile}> Отправитvь</button>
    

    <div className={modalVisibileted ? "modal z-1" : null}  > </div>
    <div >

      <Button disabled isDisable={!selectedFotos.length || selectedFotos.length === fotos.length} onClick={() => { swap(selectedFotos, fotos) }}>Расположить первыми</Button>
      <Button disabled isDisable={selectedFotos.length >= fotos.length} onClick={() => { selectAll() }}>Выбрать всё</Button>
      <Button disabled className='buttonReset' isDisable={!selectedFotos.length} onClick={() => { resetAll() }}  >Сбросить</Button>
    </div>
    {isSlider
      ? <Slider fotos={fotos} hendlerSelect={hendlerSelect} modalVisibileted={modalVisibileted} selectedFotos={selectedFotos} />
      : <Gallery fotos={fotos} hendlerSelect={hendlerSelect} modalVisibileted={modalVisibileted} selectedFotos={selectedFotos} />
    }

    {isSlider
      ? <Button onClick={() => { rollReroll() }}>Развернуть</Button>
      : <Button onClick={() => { rollReroll() }}>Свернуть</Button>
    }

    <div>
      {/* disabled  */}
      <Button disabled isDisable={!selectedFotos.length} onClick={() => { selectedFotos.length && showModal() }}>Показать выбранные</Button>
      {/* {console.log(selectedFotos.length)} */}
      {selectedFotos.length && selectedFotos.length < fotos.length
        ? <p>{getWord(selectedFotos.length, 'Выбрана', 'Выбрано', 'Выбрано')} {selectedFotos.length} {getWord(selectedFotos.length, 'картинка', 'картинки', 'картинок')} из {fotos.length}</p>
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
