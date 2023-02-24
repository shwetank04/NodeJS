const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");
const adminData = require("./routes/admin");
const shopRoutes = require("./routes/shop");
// const expressHbs = require("express-handlebars");

// app.engine(
//   "handlebars",
//   expressHbs.engine({
//     layoutsDir: "views/layouts/",
//     defaultLayout: "main-layout",
//     extname: "handlebars",
//   })
// );
// app.set("view engine", "pug");
app.set("view engine", "ejs");

app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use("/admin", adminData.routes);
app.use(shopRoutes);

app.use((req, res, next) => {
  // res.sendFile(path.join(__dirname, "views", "404.html"));
  res.status(404).render("404", { pageTitle: "Page Not Found" });
});
app.listen(3000);
