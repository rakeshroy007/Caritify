const express = require('express')
const router = express.Router()
const ownerModel = require('../models/owner-model');



if( process.env.NODE_ENV === "development"){
    router.post("/create", async function(req, res){
        // ➡️ Code for Not more than one Owner....
        let owners = await ownerModel.find();
        if(owners.length > 0){
            // return res.status(503).send("You don't have permission to create a new owner")
            return res.status(503).render("permission-denied")
        }

        let {fullname, email, password} = req.body

        let createdOwner = await ownerModel.create({
            fullname: fullname,
            email: email,
            password: password
        })
        // res.status(201).send(createdOwner)
        res.status(201).render("show-created-owner")
        // res.send("We can create a new Owner")
    })
}


router.get("/admin", function(req, res){
    let success = req.flash("success")
    res.render("createproducts", { success })
})

router.get("/", function(req, res){
    // let success = req.flash("success")
    res.render("owner-login")
})

// To setup this : setx NODE_ENV "development"   it will Sets the variable permanently, (This value can be found there in 'Environment variable' -> 'User variables')... after setting the value restart the vscode, then run 'npx nodemon app.js'...
console.log(process.env.NODE_ENV)                 


module.exports = router