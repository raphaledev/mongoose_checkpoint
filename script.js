let mongoose = require('mongoose');
require('dotenv').config()
const Person = require('./Person')

//Connection to the database
mongoose.connect(process.env.MONGO_URI,{useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
            console.log('Database connection successful')
        })
        .catch(err => {
            console.error(err.message)})

// Creating and saving a person
const person = new Person({name: "Rapha", age: 32, favoriteFoods: ["Mafé", "Yassa"]})
person.save().then(doc => {
        console.log("person created and saved with success")})
    .catch(err => {
        console.log(err)
})

// To create many records, first we create an array with all in the information inside
const arrayOfPeople= [
    {
        name: "Samba",
        age: 20,
        favoriteFoods: ["Thiéré", "Burritos"]
    },
    {
        name: "Demba",
        age: 22,
        favoriteFoods: ["Thiep", "Mafé"]
    },
    {
        name: "Ngor",
        age: 15,
        favoriteFoods: ["Ngourbane", "Burritos"]
    },
    {
        name: "Diegane",
        age: 25,
        favoriteFoods: ["Thiep", "Burritos"]
    },
    {
        name: "Yoro",
        age: 42,
        favoriteFoods: ["Lathiéri", "Burritos"]
    },
    {
        name: "Said",
        age: 34,
        favoriteFoods: ["Tajine", "Burritos"]
    },
    {
        name: "Koffi",
        age: 27,
        favoriteFoods: ["Attiéké", "Aloco"]
    },
    {
        name: "Mary",
        age: 25,
        favoriteFoods: ["Tacos"]
    },
    {
        name: "Mary",
        age: 45,
        favoriteFoods: ["Pizza"]
    }
]

// Then we use model.create() to put them into the database
Person.create(arrayOfPeople).then(doc => {
        console.log("Documents loaded with success")})
    .catch(err => {
        console.log(err)
})

// Find all the people having the name "Ngor"
Person.find({name: "Ngor"}, (error, doc) => {
    if (error){
        console.log(error);
    }
    else console.log(doc);
})

// Find only one person that has a certain food in his favorite
Person.findOne({favoriteFoods: "Thiep"}, (error, doc) => {
    if (error){
        console.log(error);
    }
    else console.log(doc);
})

// Find one person by his id
Person.find({_id: "635eb2325fbf55eed9f7dc2d"}, (error, doc) => {
    if (error){
        console.log(error);
    }
    else console.log(doc);
})

// Finding one person by his id and adding "Hamburger" to this favorite foods
Person.findOneAndUpdate(
    { _id: "635fc2e47c81951bcc0bb8c0"}, 
    { $push: { favoriteFoods: "Hamburger"}},
    function (error, doc) {
        if (error) {
            console.log(error);
        } else {
            doc.save();
            console.log(doc);
        }
    });

// Finding one person and updating his age
Person.findOneAndUpdate(
    {name: "Diegane"}, 
    {age: 20} ,
    {new: true},
    function (error, doc) {
        if (error) {
            console.log(error);
        } else {
            console.log(doc);
        }
    });

// Finding one person by his id removing him from the database
Person.findOneAndRemove({ _id: "635fc2c5ae1f5f143e9ae8e1"}, 
    function (error, doc) {
        if (error) {
            console.log(error);
        } else {
            console.log(doc);
        }
    });

// Removing many people from the database given their names
Person.remove({name: "Mary"}, 
    function (error, doc) {
        if (error) {
            console.log(error);
        } else {
            console.log(doc);
        }
    });

/* Finding all people having "Burritos" in their favorite foods,
Sorting them by their names,
Just pick 2
and hide their age
*/
Person.find({favoriteFoods: "Burritos"}) 
    .sort({name: 1})
    .limit(2)                     
    .select({name: true, favoriteFoods: true} )
    .exec()               
        .then(docs => {
            console.log(docs)
        })
        .catch(err => {
            console.error(err)
        })
