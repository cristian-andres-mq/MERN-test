const express = require("express");
const cors = require("cors");
const logger = require("./loggerMiddleware");

const app = express();

app.use(cors());
app.use(express.json());
app.use(logger);

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    date: "2019-05-30T17:30:31.098Z",
    important: true,
  },
  {
    id: 2,
    content: "Browser can execute only Javascript",
    date: "2019-05-30T18:39:34.091Z",
    important: false,
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    date: "2019-05-30T19:20:35.091Z",
    important: true,
  },
  {
    id: 4 ,
    content: "GET and POST are the most important methods of HTTP protocol",
    date: "2019-05-30T19:20:35.091Z",
    important: true,
  },
];

app.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>");
});

app.get("/api/notes", (req, res) => {
  res.json(notes);
});

// : dinamic route
app.get("/api/notes/:id", (req, res) => {
  const id = Number(req.params.id);
  const note = notes.find((identifier) => identifier.id === id);

  note ? res.json(note) : res.status(404).end();
});

app.delete("/api/notes/:id", (req, res) => {
  const id = Number(req.params.id);
  notes = notes.filter((note) => note.id !== id);
  res.status(204).end();
});

app.post("/api/notes", (req, res) => {
  const note = req.body;

  const ids = notes.map((identifier) => identifier.id);
  const maxId = Math.max(...ids);

  if (!note || !note.content) {
    return res.status(400).json({ error: "content missing" });
  }

  const newNote = {
    id: maxId + 1,
    content: note.content,
    date: new Date(),
    important: typeof note.important !== "undefined" ? note.important : false,
  };
  // notes.push(newNote);
  notes = [...notes, newNote];
  res.statusCode(201).json(newNote);
});

app.use((req, res) => {
  res.status(404).jason({
    error: "Not found",
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
