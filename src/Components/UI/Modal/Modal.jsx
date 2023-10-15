import { useEffect, useState } from "react";
import MyInput from "../Input/MyInput";
import MyButton from "../Button/MyButton";
import { selectOptions } from "../../data/data";

const Modal = ({ setIsModal, addGame }) => {
  const [title, setTitle] = useState("");
  const [genres, setGenres] = useState("");
  const [isMultiplayer, setIsMultiplayer] = useState(false);
  const [rating, setRating] = useState("");
  const [date, setDate] = useState("");
  const [inputFile, setInputFile] = useState(null);
  const [fileData, setFileData] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    addGame(title, genres, isMultiplayer, rating, +new Date(date) / 1000, fileData);
    setIsModal(false);
  };

  const uploadFile = (e) => {
    setInputFile(e.target.files[0]);
  };

  useEffect(() => {
    if (inputFile) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64File = reader.result.split(",")[1];
        setFileData(base64File);
      };
      reader.readAsDataURL(inputFile);
    }
  }, [inputFile]);

  return (
    <div className="modal d-flex center" onClick={() => setIsModal(false)}>
      <div
        className="modal__content d-flex center"
        onClick={(e) => e.stopPropagation()}
      >
        <form
          className="modal__inputs d-flex column"
          onSubmit={(e) => handleSubmit(e)}
        >
          <MyInput
            value={title}
            label="Введите название игры"
            changeFunc={(value) => setTitle(value)}
            required={true}
            fontSize="20px"
          />
          <MyInput
            value={genres}
            label="Введите жанры игры"
            changeFunc={(value) => setGenres(value)}
            required={true}
            fontSize="20px"
          />
          <div className="multiplayer__input d-flex center">
            <span>Поддержка мультиплеера:</span>
          <input
            className="d-flex center"
            value={isMultiplayer}
            type={'checkbox'}
            onChange={() => setIsMultiplayer(!isMultiplayer)}
          />
          </div>

          <select className="select__rating" required={true} onChange={(e) => setRating(e.target.options[e.target.selectedIndex].text)}>
            <option
              value=""
              selected={true}
              disabled
            >
              Выберите рейтинг:
            </option>
            {selectOptions.map((option) => (
            <option key={option.value}>{option.value}</option>
          ))}
          </select>
          <MyInput
            value={date}
            type="date"
            changeFunc={(value) => setDate(value)}
            required={true}
            fontSize="20px"
          />

          <div className="input__file">
            <div className="input__text d-flex center">Загрузить изображение</div>
            <input
              type="file"
              onChange={(e) => uploadFile(e)}
              required={true}
            />

          </div>
          {inputFile && (
              <div className="file__name">
                {inputFile.name}
              </div>
            )}
          <MyButton text="Добавить игру" backColor={"red"} textColor={"#FFF"} />
        </form>
      </div>
    </div>
  );
};

export default Modal;
