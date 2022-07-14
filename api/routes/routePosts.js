const express = require('express')

// ROUTER WILL BE ADDED AS MIDDLEWAREE AND WILL TAKE CONTROL OF REQUESTS
const Routes = express.Router();

// GET CONNECTED TO THE DATABASE
const dbo = require("../db/conn");


const pic = require('../services/uploadImage')


// GET ALL POSTS "JUST TESTING TO SEE ATLAS RESPONSE"
Routes.route("/").get(async (req, res) => {

  const dbConnect = dbo.getDb();

  dbConnect
    .collection("posts")
    .find({}).limit(50)
    .toArray(function (err, result) {
      try {
        res.json(result);
      } catch (err) {
        res.status(400).send("Error Fetching Telegraphs!");
      }
    });

});

// GET SPECIFIC POST BY TITLE
Routes.route("/:str").get(async (req, res) => {

  const dbConnect = dbo.getDb();
  const path = req.params.str;

  dbConnect
    .collection("posts")
    .find({ 'title': path })
    .toArray(function (err, result) {
      try {
        res.json(result);
      } catch (err) {
        res.status(400).send("Error Fetching Telegraphs!");
      }
    });

});


// POST NEW TELEGRAPH POST
Routes.route("/").post(pic.single("image"), (req, res) => {

  const dbConnect = dbo.getDb();

  console.log(req.file.location)

  const newPost = {
    title: req.body.title,
    name: req.body.name,
    story: req.body.story,
    date: new Date(),
    url: req.body.url,
    picture: req.file.location
  };

  dbConnect
    .collection("posts")
    .insertOne(newPost, (err, result) => {
      try {
        console.log(`Added a new data with Title ${result}`);
        res.status(204).send();

      } catch (err) {
        res.status(400).send("Could not insert this data" + err);
      }
    });
});


module.exports = Routes
