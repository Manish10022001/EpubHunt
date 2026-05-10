import express from "express"; //
import authRouter from "./routes/auth.js";

const app = express();
const port = process.env.PORT || 8000;

//we create routes for auth, so to use it we use app.use
app.use("/auth", authRouter); // /auth is used as prefix as it is used for multiple routes so directly prefixed it so not to give again and again

app.get("/login", (req, res) => {
  res.send("this is login page");
});
app.listen(port, () => {
  console.log("The application is running onr port:" + port);
});
