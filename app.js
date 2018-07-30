//grab external modules
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-Parser');
const app = new express()
//const main = require('./views/main');
const models = require('./models');
const wiki = require('./routes/wiki');
const users = require('./routes/users');

//Middleware
app.use(morgan('dev'));
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
  }));

//Routing redirect
app.get("/", (req, res, next)=>{
    res.redirect("/wiki");
});

app.use("/wiki", wiki);
app.use("/users", users);

//Initializ App and Database
const port = process.env.URL || 1337;
const init = async ()=> {
    await models.Page.sync({force: true});
    await models.User.sync({force: true});

    app.listen(port, ()=> {
        console.log(`App is listening on ${port}`);
    });
};

//Run App
init();


