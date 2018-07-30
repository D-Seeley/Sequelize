const express = require('express');
let router = express.Router();
const { userList, userPages } = require("../views");
const { Page, User } = require("../models");

router.get("/", async (req, res, next)=>{
    const allUsers = await User.findAll();
    res.send(userList(allUsers));
});

router.get("/:id", async (req, res, next)=>{
    try {
        const user = await User.findById(req.params.id);
        const pages = await Page.findAll({
            where: {authorId: req.params.id}
        });
        res.send(userPages(user, pages));
    } catch (err) {next(err)}
});


module.exports = router;