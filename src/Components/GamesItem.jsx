import {BsTrash} from 'react-icons/bs'
import MyButton from './UI/Button/MyButton';
import { useState } from 'react';

const GamesItem = ({ game, deleteGame }) => {
  const [isMouseOver, setIsMouseOver] = useState(false)
  const convertTime = (time) => {
    const date = new Date(time);
    const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    const month =
      date.getMonth() + 1 < 10
        ? `0${date.getMonth() + 1}`
        : date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  const convertImg = (imgBlob) => {
    const arrayBufferView = new Uint8Array(imgBlob.data);
    const blob = new Blob([arrayBufferView], { type: imgBlob.type });
    const imageUrl = URL.createObjectURL(blob);
    return imageUrl;
  };

  const checkRating = (rating) => {
    switch (rating) {
      case "0+":
      case "3+":
      case "6+":
        return "green";
      case "12+":
        return "blue";
      case "16+":
        return "orange";
      case "18+":
        return "red";
      default:
        return "#FFF";
    }
  };

  return (
    <div className="game__body d-flex center column" onMouseOver={() => setIsMouseOver(true)} onMouseOut={() => setIsMouseOver(false)}>
      <div
        className="game__rating"
        style={{ borderColor: checkRating(game.rating) }}
      >
        {game.rating}
      </div>
      {isMouseOver && (
      <div className="game__delete" onClick={() => deleteGame(game.id)}>
      <MyButton backColor='red' text={<BsTrash/>}  textColor='#FFF' />
    </div>
      )}

      <div className="game__item img">
        <img src={convertImg(game.img)} alt="" />
      </div>
      <div className="game__info d-flex column">
        <h1 className="game__item title">{game.title}</h1>
        <span className="game__item genre">{game.genre}</span>
        {game.isMultiplayer ? (
          <span className='game__item multiplayer'>Поддерживает мультипллер</span>
        ) : ''}
        <div className="game__item year">
          Дата выпуска: {convertTime(game.date_prod * 1000)}
        </div>
      </div>
    </div>
  );
};

export default GamesItem;
