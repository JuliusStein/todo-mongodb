//Importing models that will be used throughout the application
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
/* This method will be called when the user submits the form, 
and will be used to add a new task to the database, after which it 
will redirect to the home page. Errors are caught and logged to the console */

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
/* This method will be called when the user visits the home page,
and will be used to retrieve all the tasks from the database and
display them on the home page. Errors are caught and logged to the console */
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
/* This method will be called when the user clicks the edit box next to a task,
and will be used to update the task in the database. 
Errors are caught and logged with the code 500 to the console */
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
/* This method will be called when the user clicks the delete button next to a task,
and will be used to delete the task from the database.*/

app.route("/remove/:id").get((req, res) => {
    const id = req.params.id;
    TodoTask.findByIdAndRemove(id, err => {
        if (err) return res.send(500, err);
        res.redirect("/");
    });
});

//Connection to MongoDB
/* This method will be called when the application starts,
and will be used to connect to the database using the credentials 
provided in the .env file */

//The following is depreciated:
//mongoose.set("useFindAndModify", false);

mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, () => {
    console.log("Connected to db!");
    app.listen(3000, () => console.log("Server Up and running"));
});