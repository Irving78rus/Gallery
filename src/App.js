import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import Button from "./Button";
import Gallery from "./Gallery";
import Preview from "./Preview";
import Modal from "./Modal";
import Slider from "./Slider";
import uniqid from "uniqid";
function App() {
  const input = useRef(null);
  const [files, setFiles] = useState(null);
  const [preview, setPreview] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const showModal = () => {
    setModalVisible(!modalVisible);
  };

  const [isSlider, setIsSlider] = useState(true);
  const rollReroll = () => {
    setIsSlider(!isSlider);
  };

  const [selectedPhotos, setSelectedPhotos] = useState([]);

  function handlerSelect(photo) {
    console.log("click");
    if (selectedPhotos.includes(photo)) {
      setSelectedPhotos(selectedPhotos.filter((item) => item.id !== photo.id));
    } else {
      setSelectedPhotos((prev) => [...prev, photo]);
    }
  }

  const selectAll = () => {
    setSelectedPhotos(photos.map((item) => item));
  };
  const resetAll = () => {
    setSelectedPhotos([]);
  };

  const swap = (selectedPhotos, photos) => {
    selectedPhotos.map((item) => {
      if (photos.includes(item)) {
        photos.splice(photos.indexOf(item), 1);
      }
    });
    setPhotos([...selectedPhotos, ...photos]);
    setSelectedPhotos([]);
  };

  const getWord = (number, first, second, three) => {
    const lastFigure = number % 10;
    if (lastFigure === 1) return first;
    if (lastFigure > 1 && lastFigure < 5) return second;
    else return three;
  };

  const deleteOnLoad = (photo) => {
    setPreview(preview.filter((item) => item.id !== photo.id));
  };
  const deletePhotos = (photo) => {
    setPhotos((prev) => prev.filter((item) => item.id !== photo.id));
  };

  const sendFile = () => {
    setPhotos((prev) => [...preview, ...prev]);
    setPreview([]);
  };
  useEffect(() => {
    if (files) {
      files.forEach((file) => {
        let photoUrl = URL.createObjectURL(file);
        setPreview((prev) => [
          {
            id: uniqid(),
            photo_src: photoUrl,
          },
          ...prev,
        ]);
      });
    }
  }, [files]);

  const anyfunc = (e) => {
    setFiles(Array.from(e.target.files));
    e.target.value = "";
  };

  const triggerINput = () => {
    input.current.click();
  };
  return (
    <div className="App">
      <input
        ref={input}
        type="file"
        id="file"
        onChange={(e) => anyfunc(e)}
        multiple
        accept=".png,.jpg,.jpeg,"
      />
      <button className={"btnDownload"} onClick={triggerINput}>
        {" "}
        Загрузить фото
      </button>

      {!!preview.length && (
        <>
          <Preview photos={preview} deleteOnLoad={deleteOnLoad} />
          <button className={"btnDownload"} onClick={sendFile}>
            {" "}
            Отправитvь
          </button>
        </>
      )}
      {!!photos.length && (
        <div>
          <div className={modalVisible ? "modal z-1" : null}> </div>
          <div>
            <Button
              disabled
              isDisable={
                !selectedPhotos.length ||
                selectedPhotos.length === photos.length
              }
              onClick={() => {
                swap(selectedPhotos, photos);
              }}
            >
              Расположить первыми
            </Button>
            <Button
              disabled
              isDisable={selectedPhotos.length >= photos.length}
              onClick={() => {
                selectAll();
              }}
            >
              Выбрать всё
            </Button>
            <Button
              disabled
              className="buttonReset"
              isDisable={!selectedPhotos.length}
              onClick={() => {
                resetAll();
              }}
            >
              Сбросить
            </Button>
          </div>
          {isSlider ? (
            <Slider
              photos={photos}
              handlerSelect={handlerSelect}
              modalVisible={modalVisible}
              selectedPhotos={selectedPhotos}
              deletePhotos={deletePhotos}
            />
          ) : (
            <Gallery
              photos={photos}
              handlerSelect={handlerSelect}
              modalVisible={modalVisible}
              selectedPhotos={selectedPhotos}
              deletePhotos={deletePhotos}
            />
          )}

          {isSlider ? (
            <Button
              onClick={() => {
                rollReroll();
              }}
            >
              Развернуть
            </Button>
          ) : (
            <Button
              onClick={() => {
                rollReroll();
              }}
            >
              Свернуть
            </Button>
          )}

          <div>
            {/* disabled  */}
            <Button
              disabled
              isDisable={!selectedPhotos.length}
              onClick={() => {
                selectedPhotos.length && showModal();
              }}
            >
              Показать выбранные
            </Button>
            {/* {console.log(selectedPhotos.length)} */}
            {selectedPhotos.length && selectedPhotos.length < photos.length ? (
              <p>
                {getWord(
                  selectedPhotos.length,
                  "Выбрана",
                  "Выбрано",
                  "Выбрано"
                )}{" "}
                {selectedPhotos.length}{" "}
                {getWord(
                  selectedPhotos.length,
                  "картинка",
                  "картинки",
                  "картинок"
                )}{" "}
                из {photos.length}
              </p>
            ) : null}

            {selectedPhotos.length &&
              selectedPhotos.length === photos.length ? (
              <p>Выбраны все {selectedPhotos.length} изображений</p>
            ) : null}
          </div>
          <Modal
            showModal={showModal}
            modalVisible={modalVisible}
            selectedPhotos={selectedPhotos}
          />
        </div>
      )}
    </div>
  );
}

export default App;
