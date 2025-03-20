const express = require("express"); // Use require() instead of import
const fs = require("fs").promises;
const path = require("path");
const app = express();
app.use(express.json());
const port = 3000;

app.get("/", (req, res) => {
    res.status(200).send("welcome to my movie api");
});

app.get("/movies",async (req, res) => {
  let movies = await readMovies();
  res.json(movies);
});

app.get("/movies/:id",async (req, res) => {
  //  console.log(req.params, "<-------- req.params"); 
    let movies = await readMovies();
    const idToFind = Number(req.params.id);
    const mov = movies.find((movie) => movie.id === idToFind);
    res.status(200).send({ mov });
});

app.post("/movies",async (req, res) => {
  const movie = req.body;
   let movies = await readMovies();
  movies.push(movie);
  await storeMovies(movies);
    res.status(201).send({ movie });

});

app.delete("/movies/:id", async (req, res) => {
  const idToFind = Number(req.params.id);
  let movies = await readMovies();
  const mov = movies.filter((movie) => movie.id !== idToFind);
  await storeMovies(mov);
  res.status(204).send({ message: "movie deleted", id: mov });
});

app.put("/movies/:id",async (req, res) => {
  const idToFind = Number(req.params.id);
  let movies = await readMovies();
  const mov = movies.findIndex((movie) => movie.id === idToFind);
  movies[mov] = { ...movies[mov], ...req.body };
  await storeMovies(movies);
  res.status(201).send({ message: "updated movie", updateMovie: movies[mov] });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

let readMovies = async () => {
  let movies = await fs.readFile(
    path.join(__dirname, "data", "movies.json"),
    "utf-8"
  );
  return JSON.parse(movies);
};
let storeMovies = async (movies) => {
  await fs.writeFile(
    path.join(__dirname, "data", "movies.json"),
    JSON.stringify(movies, null, 2)
  );
};
  