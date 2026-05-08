import express from "express"; //

const app = express();
const port = process.env.PORT || 8000;
app.get("/", (req, res) => {
  res.send("Hi");
});

app.get("/login", (req, res) => {
  res.send("this is login page");
});
app.listen(port, () => {
  console.log("The applicatio is running onr port:" + port);
});
