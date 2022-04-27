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

  const [isSlider, setIsSlider] = useState(false);
  const rollReroll = () => {
    setIsSlider(!isSlider)
  }

  const [selectedFotos, setSelectedFotos] = useState([]);


  function hendlerSelect(foto) {
    console.log('click');
    if (selectedFotos.includes(foto)) {
      // selectedFotos.splice(selectedFotos.indexOf(foto), 1)  почему это не работало
      // setSelectedFotos(selectedFotos)
      setSelectedFotos(selectedFotos.filter(item => item.id != foto.id))
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


  //   const [img, setImg] = useState(null);
  //   const [avatar, seAvatar] = useState(null);
  // const sendFile =React.useCallback (async()=>{
  //   try{
  //     console.log(img);
  //     const data = new FormData()
  //     console.log(data);
  //     data.append('img', img)
      
  //     console.log(data);
  //  await axios.post('/',data).then(res=>seAvatar(res.data.path))
  //   }
  //   catch(error){

  //   }
  // },[img])
  


  return (<div className='App'>
 

    {/* <input type="file" onChange={(e) => setImg(e.target.files[0])} />
    <button onClick={sendFile}> Отправить</button>
    <img  src={`${avatar}`}   alt='foto'/> */}
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
