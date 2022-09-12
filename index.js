//models
const TodoTask = require("./models/TodoTask");
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

app.use("/static", express.static("public"));

app.get('/',(req, res) => {
    res.render('todo.ejs');
    });

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

//POST METHOD
app.post('/',async (req, res) => {
    console.log(req.body);
    const todoTask = new TodoTask({
        content: req.body.content
    });
    try {
        await todoTask.save();
        res.redirect("/");
    } catch (err) {
        console.log(err);
        res.redirect("/");
    }
});

// app.post('/',(req, res) => {
//     console.log(req.body);
// });

//connection to db
//mongoose.set("useFindAndModify", false);
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, () => {
//mongoose.connect(CONNECTION_URL).then(()=>{console.log('...')})
    console.log("Connected to db!");
    app.listen(3000, () => console.log("Server Up and running"));
});

//DB_CONNECT = mongodb+srv://jstein:DouglasMoad1968@clustertodojs.5jkboed.mongodb.net/test?retryWrites=true
