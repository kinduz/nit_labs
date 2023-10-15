import { useEffect, useState } from "react";
import { selectOptions } from "./data/data";
import MyButton from '../Components/UI/Button/MyButton'
import axios from "axios";
import { addGamesAction } from "./store/reducers/gamesReducer";
import { useDispatch, useSelector } from "react-redux";
import { addFiltersAction } from "./store/reducers/filtersReducer";

const Filters = ({setIsFilters}) => {

  const filtersParams = useSelector(state => state.filters)

  const [isMultiplayer, setIsMultiplayer] = useState(filtersParams.isMultiplayer)
  const [isTitle, setIsTitle] = useState(filtersParams.isTitle)
  const [dateFrom, setDateFrom] = useState(filtersParams.dateFrom);
  const [dateTo, setDateTo] = useState(filtersParams.dateTo);
  const [ratingOption, setRatingOption] = useState(filtersParams.rating)

  const dispatch = useDispatch()

  const handleSubmit = () => {
    axios.post("/filter_data", {
        isMultiplayer: isMultiplayer,
        isTitle: isTitle,
        dateFrom: +new Date(dateFrom)/1000,
        dateTo: +new Date(dateTo)/1000,
        ratingOption: ratingOption,
    }).then(res => {
      dispatch(addFiltersAction(isTitle, isMultiplayer, dateFrom, dateTo, ratingOption))
      dispatch(addGamesAction(res.data))
    setIsFilters(false)
    })
  }

  const handleSubmitNoFilters = () => {
    axios.post("/filter_data").then(res => {
    dispatch(addFiltersAction(false, false, '', '', ''))
    dispatch(addGamesAction(res.data))
    setIsFilters(false)
  })
  }

  return (
    <div
      className="filters__body d-flex column"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="filter__item">
        По наличию мультиплеера
        <input type="checkbox" defaultChecked={isMultiplayer} className="checkbox__filter" value={isMultiplayer} onChange={() => setIsMultiplayer(!isMultiplayer)}/>
      </div>
      <div className="filter__item">
        По заголовку
        <input type="checkbox" defaultChecked={isTitle} className="checkbox__filter" value={isTitle} onChange={() => setIsTitle(!isTitle)}/>
      </div>
      <div className="filter__item">По дате выхода</div>
      <div className="filter__date d-flex">
        <input
          type={"date"}
          value={dateFrom}
          defaultValue={dateFrom}
          onChange={(e) => setDateFrom(e.target.value)}
          required={false}
        />
        <input
          type={"date"}
          value={dateTo}
          defaultValue={dateTo}
          onChange={(e) => setDateTo(e.target.value)}
          required={false}
        />
      </div>
      <div className="filter__item">По возрастному рейтингу</div>
      <div className="filter__select d-flex center">
        <select defaultValue={ratingOption} onChange={(e) => setRatingOption(e.target.options[e.target.selectedIndex].text)}>
          <option value="" selected={true} disabled>
            Выберите рейтинг:
          </option>
          {selectOptions.map((option) => (
            <option key={option.value}>{option.value}</option>
          ))}
        </select>
      </div>
      <div className="filters__buttons d-flex">
        <MyButton backColor={'red'} text={'Фильтровать'} textColor={'#FFF'} clickFunction={handleSubmit}/>
        <MyButton  text={'Сбросить фильтры'}  clickFunction={handleSubmitNoFilters}/>
      </div>
    </div>
  );
};

export default Filters;
