const express = require("express");
const session = require("express-session");
const app = express();
const nocache = require("nocache");
const path = require("path");

// View engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "public", "views"));

// Add middleware {buliding ware middill ware}
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "Public")));

//====================>
//=====================>


app.use((req, res, next) => {
  res.set(
    "Cache-Control",
    "no-store, no-cache, must-revalidate, proxy-revalidate"
  );
  res.set("Pragma", "no-cache");
  res.set("Expires", "0");
  res.set("Surrogate-Control", "no-store");

  next();
});


//============================================>
  
// User details
const user = {
  name: "nihal",
  pass: "nihal",
};

// Session middleware
app.use(
  session({
    secret: "nihal",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, //1 day time out
  })
);

//{application level middile ware}
app.use((req, res, next) => {
  if (req.path === "/") {
    if (req.session.user) {
      return res.redirect("/home");
    }
  }
  if (req.path === "/home") {
    if (!req.session.user) {
      return res.redirect("/");
    }
  }
  next();
});

// Define routers
app.post("/verify", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  req.session.user = true;
  if (user.name !== username) {
    res.render("index", { usererror: "user name is not found", passerror: null });
  } else if (user.pass !== password) {
    res.render("index", { passerror: "please check your password", usererror: null });
  } else {
    res.redirect("/home");
  }
});

app.get("/", (req, res) => {
  res.render("index", { passerror: null, usererror: null });
});

app.get("/home", (req, res) => {
  res.render("home");
});

app.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
    }
    res.redirect("/");
  });
});

app.get("*",(req,res)=>{
  res.redirect('/')
})


// Start the server
app.listen(3000, () => {
  console.log("Server is running on port http://localhost:3000/");
});
