const express = require('express');
let router = express.Router();
const { addPage, wikiPage, main } = require('../views');
const { Page, User } = require('../models')

router.get("/", async (req, res, next)=> {
    try {
        const content = await Page.findAll();
        res.send(main(content));

    } catch (err) {next(err)}
    //res.send("On Wiki Page");
});

router.post("/", async (req, res, next)=>{
    const page = new Page({
        title: req.body.title,
        content: req.body.content
    });
    
    const [user, wasCreated] = await User.findOrCreate({
        where: {
            name: req.body.name,
            email: req.body.email
        }
    });
  
    page.setAuthor(user);

    try {
        await page.save();
        res.redirect(`/wiki/${page.slug}`);
    } 
    catch (error) { next(error) }
});

router.get("/add", async (req, res, next)=>{
    res.send(addPage());
});

router.get("/:slug", async (req, res, next)=> {
    try {
        const page = await Page.findOne({
            where: {slug: req.params.slug}
        });

        const author = await User.findById(page.authorId);

        res.send(wikiPage(page, author));
    } catch (err) {next(err)}
});

module.exports = router;