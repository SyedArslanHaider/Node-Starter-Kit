const express = require("express"); // Use require() instead of import

const app = express();
app.use(express.json());
const port = 3000;

const movies = [
  {
    id: 1,
    title: "The Godfather",
    certificate: "18",
    yearOfRelease: 1972,
    director: "Francis Ford Coppola",
  },
  {
    id: 2,
    title: "The Shawshank Redemption",
    certificate: "15",
    yearOfRelease: 1994,
    director: "Frank Darabont",
  },
  {
    id: 3,
    title: "Schindler's List",
    certificate: "15",
    yearOfRelease: 1993,
    director: "Steven Spielberg",
  },
];

app.get("/", (req, res) => {
    res.status(200).send("welcome to my movie api");
});

app.get("/movies", (req, res) => {
  res.json(movies);
});

app.get("/movies/:id", (req, res) => {
  //  console.log(req.params, "<-------- req.params"); 
    const idToFind = Number(req.params.id);
    const mov = movies.find((movie) => movie.id === idToFind);
    res.status(200).send({ mov });
});

app.post("/movies", (req, res) => {
    console.log(req.body); 
    const movie = req.body;
    movies.push(movie);
    res.status(201).send({ movie });

});

app.delete("/movies/:id", (req, res) => {
    const idToFind = Number(req.params.id);
    const mov = movies.find((movie) => movie.id === idToFind);
    const deleteMovie = movies.splice(mov, 1);
    res.status(201).send({ message: "movie deleted", deleteMovie });
});

app.put("/movies/:id", (req, res) => {
    const idToFind = Number(req.params.id);
    const mov = movies.findIndex((movie) => movie.id === idToFind);
    movies[mov] = { ...movies[mov], ...[req.body] };
    res.status(201).send({ message: "updated movie", updateMovie: movies[mov] });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});