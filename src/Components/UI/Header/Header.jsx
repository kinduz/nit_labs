import { useEffect, useState } from "react";
import MyButton from "../Button/MyButton";
import Modal from "../Modal/Modal";
import Filters from "../../Filters";
import { useHandleClick } from '../../../hooks/useHandleClick'

const Header = ({ addGame }) => {
  const [isModal, setIsModal] = useState(false);
  const [isFilters, setIsFilters] = useState(false);

  useHandleClick(isFilters, setIsFilters)

  return (
    <div className="header d-flex center">
      <MyButton
        text="Добавить игру"
        clickFunction={() => setIsModal(!isModal)}
      />
      <div className="filters__all">
        <MyButton
          text="Фильтровать данные"
          clickFunction={(e) => {e.stopPropagation(); setIsFilters(!isFilters)}}
          backColor="red"
          textColor="#FFF"
        />
        {isFilters && <Filters setIsFilters={setIsFilters} />}
      </div>
      {isModal && <Modal setIsModal={setIsModal} addGame={addGame} />}
    </div>
  );
};

export default Header;
