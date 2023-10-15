const express = require("express");
const mysql = require("mysql");
const app = express();
const port = 5000;
const bodyParser = require('body-parser')

app.use(bodyParser.json({ limit: '400mb' }));
app.use(bodyParser.urlencoded({ limit: "400mb", extended: true }));

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: null,
  database: "games",
});

app.listen(port, () => console.log(`Listening on port ${port}`));

app.get("/get_data", (req, res) => {
  connection.query("SELECT * FROM games_info", (error, results) => {
    if (error) {
      console.error("Ошибка выполнения запроса: ", error);
      return res.status(500).json({ error: "Ошибка выполнения запроса" });
    }
    res.json(results);
  });
});

app.delete("/delete_data/:id", (req, res) => {
  const gameId = req.params.id;
  connection.query(
    "DELETE FROM games_info WHERE id = ?",
    [gameId],
    (error, results) => {
      if (error) {
        console.error("Ошибка выполнения запроса: ", error);
        return res.status(500).json({ error: "Ошибка выполнения запроса" });
      }
      res.json(results);
    }
  );
});

app.post("/add_data", (req, res) => {
  const {title, genres, isMultiplayer, rating, date, img} = req.body;
  const bufferImg = Buffer.from(img, "base64");
    connection.query(
      "INSERT INTO games_info (title, genre, isMultiplayer, rating, date_prod, img) VALUES (?, ?, ?, ?, ?, ?)",
      [title, genres, isMultiplayer, rating, date, bufferImg],
      (error, results) => {
        if (error) {
          console.error("Ошибка выполнения запроса: ", error);
          return res.status(500).json({ error: "Ошибка выполнения запроса" });
        }
        res.sendStatus(200);
      }
    );
  });

  app.post("/filter_data", (req, res) => {

    const { isMultiplayer, isTitle, dateFrom, dateTo, ratingOption } = req.body;
    let query = "SELECT * FROM games_info";
  
    let conditions = [];
    let params = [];
  
    if (isMultiplayer) {
      conditions.push("isMultiplayer = 1");
    }
  
    if (dateFrom) {
      conditions.push("date_prod >= ?");
      params.push(dateFrom);
    }
  
    if (dateTo) {
      conditions.push("date_prod <= ?");
      params.push(dateTo);
    }
  
    if (ratingOption) {
      conditions.push("rating = ?");
      params.push(ratingOption);
    }
  
    if (conditions.length > 0) {
      query += " WHERE " + conditions.join(" AND ");
    }
  
    if (isTitle) {
      query += " ORDER BY title ASC";
    }
    
    console.log(query);
    connection.query(query, params, (error, results) => {
      if (error) {
        console.error("Ошибка выполнения запроса: ", error);
        return res.status(500).json({ error: "Ошибка выполнения запроса" });
      }
      res.json(results);
    });
  });