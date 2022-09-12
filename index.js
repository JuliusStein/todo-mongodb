//models
const TodoTask = require("./models/TodoTask");
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

app.use("/static", express.static("public"));

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


//GET METHOD
app.get("/", (req, res) => {
    try{
        TodoTask.find({}, (err, tasks) => {
           //console.log(tasks);
            if(tasks == null){
                tasks = [];
            }
            res.render("todo.ejs", { todoTasks: tasks });
        });
    }catch (err){
        console.log(err);
        res.redirect("/");
    }
    
});

//UPDATE
app
    .route("/edit/:id")
    .get((req, res) => {
        const id = req.params.id;
        TodoTask.find({}, (err, tasks) => {
            res.render("todoEdit.ejs", { todoTasks: tasks, idTask: id });
        });
    })
    .post((req, res) => {
        const id = req.params.id;
        TodoTask.findByIdAndUpdate(id, { content: req.body.content }, err => {
            if (err) return res.send(500, err);
            res.redirect("/");
        });
    });

//DELETE
app.route("/remove/:id").get((req, res) => {
    const id = req.params.id;
    TodoTask.findByIdAndRemove(id, err => {
        if (err) return res.send(500, err);
        res.redirect("/");
    });
});

//connection to db
//mongoose.set("useFindAndModify", false);
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, () => {
//mongoose.connect(CONNECTION_URL).then(()=>{console.log('...')})
    console.log("Connected to db!");
    app.listen(3000, () => console.log("Server Up and running"));
});

//DB_CONNECT = mongodb+srv://jstein:DouglasMoad1968@clustertodojs.5jkboed.mongodb.net/test?retryWrites=true
