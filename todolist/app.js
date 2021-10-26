//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash")

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect(`mongodb+srv://admin-emmaku-todoapp:ojlF7TdO3p3vKug2@cluster0.rkrak.mongodb.net/todolistDB`)

const tasksSchema = new mongoose.Schema({
  name: {
          type: String,
          required: true
        }
})

const Task = mongoose.model("Task", tasksSchema)

const task1 = new Task({
  name: "Welcome to your todolist!"
})

const task2 = new Task({
  name: "Hit the + button to add a new item."
})

const task3 = new Task({
  name: "<-- Hit this to delete an item."
})


const listSchema = new mongoose.Schema({
  name: String,
  items: [tasksSchema]
})

const List = mongoose.model("List", listSchema)

// List.deleteMany({}, (err) => {
//   if (!err) {
//     console.log("Deletion Successful!")
//   }
// })

const homeTitle = "Today"

app.get("/", function(req, res) {

  Task.find({}, (err, results) => {
    if (err) {
      console.log(err)
    }  else if (results.length === 0) {
      
      Task.insertMany([task1, task2, task3], (err) => {
        if (err) {
          console.log(err)
        } else {
          console.log("Insertion successful")
        }
      })
      res.redirect("/")
    } else {
      res.render("list", {listTitle: homeTitle, newListItems: results});
    }
  })


});


app.get("/:listName", function(req,res){
  listName = _.capitalize(req.params.listName)
  List.findOne({name: listName}, (err, result) => {
    if (err) {
      console.log(err)
    } else if (!result) {
      const list = new List({
        name: listName,
        items: [task1, task2, task3]
      })
    
      list.save()
      res.redirect(`/${listName}`)
      
    } else {
      res.render("list", {listTitle: listName, newListItems: result.items});
    }
  })
});

app.post("/", function(req, res){
  const itemName = req.body.newItem;
  const listName = req.body.list;

  const item = new Task({
		name: itemName,
	});

	if (listName === 'Today') {
		item.save();
		res.redirect('/');
	} else {
    List.findOne({name: listName}, (err, foundList) => {
      if (err) {
        console.error(err)
      } else {
        foundList.items.push(item)
        foundList.save()
        res.redirect(`/${listName}`)
      }
    })
  }

});


app.post("/delete", (req, res) => {
  const itemId = req.body.checkbox
  const listName = req.body.listName
  if (listName === homeTitle) {
    Task.deleteOne({_id: itemId}, (err) => {
      if (err) {
        console.log(err)
      } else {
        console.log("Deletion Successful")
      }
    })
    res.redirect("/")
  } else {
    List.findOneAndUpdate(
      {name: listName}, 
      {$pull: {items: {_id: itemId}}}, 
      (err, result) => {
        if (err) {
          console.error(err)
        } else {
          res.redirect(`/${listName}`)
        }
      })
  }
  

  
})



app.get("/about", function(req, res){
  res.render("about");
});

app.listen(process.env.PORT || 3000, function() {
  console.log("Server started successfully");
});
