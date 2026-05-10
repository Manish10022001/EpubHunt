import express from "express"; //
import authRouter from "./routes/auth.js";
const port = process.env.PORT || 8000;

const app = express();

//manual middleware
/*
app.use((req,res,next)=>{
  req.on("data",(chunk)=>{
    req.body = JSON.parse(chunk);
    next(); //this will take to the route
  })
})
  */
app.use(express.json()); //universal middleware
app.use(express.urlencoded({ extended: false }));

//we create routes for auth, so to use it we use app.use
app.use("/auth", authRouter); // /auth is used as prefix as it is used for multiple routes so directly prefixed it so not to give again and again

app.get("/login", (req, res) => {
  res.send("this is login page");
});
app.listen(port, () => {
  console.log("The application is running onr port:" + port);
});
