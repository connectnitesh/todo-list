//Declare the installed modules express and body-parser.
const express = require('express');
const bodyParser = require('body-parser');

let note = [];

//call the express and Body-parser
const app = express();
app.use(bodyParser.urlencoded({extended: true}));

//serving static files
app.use(express.static('public'));
//installed the ejs and created a file inside the views
app.set('view engine', 'ejs');

//set up the route for the App.
app.get("/", function(req, res){
    var date = new Date();
    var options = {
      weekday: "long",
      day: "numeric",
      month: "long"
    }

    var day = date.toLocaleDateString("en-us",options);

    res.render("list",{name: day , note: note});
});

//use app.post option.
app.post("/addNotes",function(req,res){
  //assigning Note id to the notes using math.random
  const userNote = {};
  userNote.id = Math.random() * 100;
  userNote.body = req.body.newNote
  note.push(userNote);
  //then we redirect it to the root route
  res.redirect('/');
})

//Handling the delete request
app.post('/deleteNote/:id', function (req, res) {
  // console.log(req.params.id);
  const deleteNotes = note.filter(item => item.id != req.params.id);
  note = deleteNotes;
  return res.redirect('/');
});



//set server port
app.listen(process.env.PORT || 3000, function(){
  console.log("Todo List server running at localhost:3000 ..");
});

