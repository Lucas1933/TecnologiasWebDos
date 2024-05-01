import express from "express";
import getRandomNumber from "./utils/get.random.number";
import generateRandomString from "./utils/get.random.string";
const app = express();
const port = 8080;
const history: History = { wins: [], loses: [] };

/* 
GET /spin = gira la tragamonedas, guarda el resultado y lo devuelve al cliente
GET /history = devuelve el historial de victorias y derrotas
DELETE /history/:id = identifica una entrada del historial y la elimina
*/

app.get("/spin", (req, res) => {
  const slotMachine = [
    getRandomNumber(1, 3),
    getRandomNumber(1, 3),
    getRandomNumber(1, 3),
  ];

  const result = `[${slotMachine[0]}] [${slotMachine[1]}] [${slotMachine[2]}]`;

  if (slotMachine[0] == slotMachine[1] && slotMachine[1] == slotMachine[2]) {
    history.wins.push({
      id: generateRandomString(10),
      date: new Date(),
      winnerNumber: result,
    });
  } else {
    history.loses.push({
      id: generateRandomString(10),
      date: new Date(),
      loserNumber: result,
    });
  }

  res.send(result);
});

app.get("/history", (req, res) => {
  res.send(history);
});

app.delete("/history/:id", (req, res) => {
  const { id } = req.params;
  history.wins = history.wins.filter((eachEntry) => {
    eachEntry.id == id;
    return;
  });
  history.loses = history.loses.filter((eachEntry) => {
    eachEntry.id == id;
    return;
  });
  res.send("Deleted history entry");
});

app.listen(port, () => {
  console.log("[server] listening in port ", port);
});

type History = {
  wins: { id: string; date: Date; winnerNumber: string }[];
  loses: { id: string; date: Date; loserNumber: string }[];
};
