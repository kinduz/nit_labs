import "./styles/style.css";
import GamesList from "./Components/GamesList";
import { useEffect, useState } from "react";
import axios from "axios";
import Header from "./Components/UI/Header/Header";
import { useDispatch } from "react-redux";
import { addGamesAction } from "./Components/store/reducers/gamesReducer";

const App = () => {
  const [data, setData] = useState("");
  const [msg, setMsg] = useState("");

  const dispatch = useDispatch()

  const callMySql = async () => {
    await axios.get("/get_data").then((res) => {
      if (res) {
        if (res.data) {
        setData(res.data);
        dispatch(addGamesAction(res.data))
        }
        else {
        setMsg("Похоже, игр по данному запросу не найдено :(");
        }
      } else {
        setMsg("Произошла ошибка, попробуйте ещё раз.");
      }
    });
  };

  const deleteGame = (id) => {
    axios.delete(`/delete_data/${id}`).then((res) => {
      if (res) {
        callMySql()
      }
      else {
        setMsg("Произошла ошибка во время удаления данных")
      }
    })
  }

  const addGame = (title, genres, isMultiplayer, rating, date, img) => {
    axios.post("/add_data", {
      title: title,
      isMultiplayer: isMultiplayer,
      genres: genres,
      rating: rating,
      date: date,
      img: img
    }).then((res) => {
      if (res) callMySql()
      else setMsg("Ошибка при добавлении данных")
    })
  }

  useEffect(() => {
    callMySql();
  }, []);

  return (
    <div className="content d-flex center column">
      <Header addGame={addGame}/>
      {data && (
        <GamesList deleteGame={deleteGame}/>
      )}
    </div>
  );
};

export default App;
