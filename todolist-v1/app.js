const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");

const app = express();

// Set views of pages to views
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.set('strictQuery', false);

mongoose.connect("mongodb+srv://admin-Bailey:test123@cluster0.0mnh5pa.mongodb.net/todolistDB");

// creating schema for collections
const itemsSchema = {
    name: String
};

// create collection based on the schema
const Item = mongoose.model("Item", itemsSchema);

// Create documents
const item1 = new Item({
    name: "Welcome to your todolist!"
});

const item2 = new Item({
    name: "Hit the + button to add a new item"
});

const item3 = new Item({
    name: "<-- Hit this to delete an item"
});

const defaultItems = [item1, item2, item3];

const listSchema = {
    name: String,
    items: [itemsSchema]
};

const List = mongoose.model("List", listSchema);

app.get("/", function(req, res){
    
    Item.find({}, function(err, result){

        if(result.length === 0) {
            // Inserts document into the collection
            Item.insertMany(defaultItems, function(err){
                if(err){
                    console.log(err);
                }else{
                    console.log("Default Items added successfully");
                }
            });
            res.redirect("/");
        }else{

            res.render("list", {listTitle: "Today", list: result});

        }
    });
    
    
});

app.post("/", function(req, res){

    const itemName = req.body.newTask;
    const listName = req.body.list;

    const item = new Item({
        name: itemName
    });

    if(listName === "Today"){
        item.save();
        res.redirect("/");
    }else{
        List.findOne({name: listName}, function(err, result){
            result.items.push(item);
            result.save("/" + listName);
            res.redirect("/" + listName);
        })
    }
});

app.get("/:customListName", function(req, res){
    const customListName = _.capitalize(req.params.customListName);

    List.findOne({name: customListName}, function(err, result){
        if(!err){
            if(!result){
                // Create a new list
                const list = new List({
                    name: customListName,
                    items: defaultItems
                });

                list.save();
                res.redirect("/" + customListName);
            }else{
                console.log(result);
                // Show an existing list
                res.render("list", {listTitle: result.name, list: result.items});

            }
        }
    });

    const list = new List({
        name: customListName,
        items: defaultItems
    });

    list.save();
});

app.post("/delete",function(req, res){
    const checkedItemId = req.body.checkbox;
    const listName = req.body.listName;

    if(listName === "Today"){
        Item.findByIdAndRemove(checkedItemId, function(err){
            if(err){
                console.log(err);
            }else{
                console.log("Removed item");
                res.redirect("/");
            }
        });
    }else{
        List.findOneAndUpdate({name: listName}, {$pull: {items: {_id: checkedItemId}}}, function(err, result){
            if(!err){
                res.redirect("/" + listName);
            }
        });
    }

    
});


app.listen(3000, function(){
    console.log("Server started on port 3000");
})