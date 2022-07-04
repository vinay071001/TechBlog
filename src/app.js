const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
const port = 8000;
const hostname = "127.0.0.1";

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require("./db/conn");
const Contact = require("./models/contacts");

app.set("view engine", "hbs");
const partialPath = path.join(__dirname, "../templates/partials");
const staticPath = path.join(__dirname, "../public");
app.use(express.static(staticPath));
const templatePath = path.join(__dirname, "../templates/views");
app.set("views", templatePath);

hbs.registerPartials(partialPath);

app.get("/", (req, res) => {
    res.render("home");
});

app.get("/about", (req, res) => {
    res.render("about");
});

app.get("/about/*", (req, res) => {
    res.render("404");
});

app.get("/contact", (req, res) => {
    res.render("contact");
});

app.post("/contact", (req, res) => {
    var myData = new Contact(req.body);
    myData.save()
    .then(item => {
        // res.send("item saved to database");
        console.log("your information is sent to server successfully");
    })
    .catch(err => {
        res.status(400).send("unable to save to database");
    });
    res.statusCode = 201;
    res.render("home")
   });

app.get("*", (req, res) => {
    res.render("404");
});

app.listen(port, hostname, () => {
    console.log(`server is listening to port ${port}`);
})