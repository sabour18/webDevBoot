const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

mongoose.connect("mongodb://127.0.0.1:27017/fruitsDB");

const fruitsSchema = new mongoose.Schema ({
    name: {
        type: String,
        required: [true, "Please chech data entry, no name specified"]
        },
    rating: {
        type: Number,
        min: 1,
        max: 10
        },
    review: String
});

const Fruit = mongoose.model("Fruit", fruitsSchema);

const fruit = new Fruit ({
    name: "",
    rating: 7,
    review: "Solid fruit."
});

// fruit.save();

// const peopleSchema = new mongoose.Schema ({
//     name: String,
//     age: Number
// });

// const Person = mongoose.model("Person", peopleSchema);

// const person = new Person ({
//     name: "John",
//     age: 37
// });

// // person.save();

// const kiwi = new Fruit ({
//     name: "Kiwi",
//     rating: 10,
//     review: "The best Fruit."
// });

// const orange = new Fruit ({
//     name: "orange",
//     rating: 4,
//     review: "Too sour for me"
// });

// const banana = new Fruit ({
//     name: "banana",
//     rating: 5,
//     review: "Like them, but am allergic."
// });

// Fruit.insertMany([kiwi, orange, banana], function(err){
//     if(err){
//         console.log(err);
//     }else{
//         console.log("Successfully saved all fruits to fruitsDB");
//     }
// });


Fruit.find(function(err, fruits){
    if(err){
        console.log(err);
    }else{
        //console.log(fruits);

        
        //mongoose.connection.close();

        fruits.forEach(function(fruit){
            console.log(fruit.name + " " + fruit.rating);
        });
    }
});

Fruit.updateOne({_id:"63dd633c0b8f6fa41d3dda2c"}, {rating: 9}, function(err){
    if(err){
        console.log(err);
    }else{
        console.log("Successfully updated document.");
    }
    mongoose.connection.close();
});




























// Without mongoose
// const insertDocuments = async function(database, callback){
//     //Get the documents collection
//     const collection = database.collection('fruits');
//     //Insert some documents
   
//     const docs = [
//         { title: 'Dangal', rating: 'Not Rated' },
//         { title: 'The Boss Baby', rating: 'PG' },
//         { title: 'The Meny', rating: '14a' }
//     ];

//     const options = { ordered: true };

//     const result = await collection.insertMany(docs, options);

//     console.log(`${result.insertedCount} documents successfully inserted`);
//     //console.log(await collection.find());
// }



// const findDocuments = async function(database, callback){
//     // Get the document collection
//     const collection = database.collection('fruits');
//     // Find some documents

//     const result = collection.find({}).toArray(function(err, result){
//         if (err) throw err;
//     });

//     // print a message if no documents were found
//     if ((await collection.countDocuments()) === 0) {
//         console.log("No documents found!");
//     }
    
//     //await cursor.forEach(console.dir);

//     console.log(result);
// }