const express = require('express')
const router = express.Router()
const isLoggedIn = require('../middlewares/isLoggedIn')
const productModel = require('../models/product-model')
const userModel = require('../models/user-model')

router.get("/", function(req, res){
    let error = req.flash("error")
    res.render("index", { error, loggedin: false })
})
 
router.get("/shop", isLoggedIn, async function(req, res){
    let products = await productModel.find()
    let success = req.flash("success")
    res.render("shop", { products, success })
})

// ➡️ Give functional the add-to-cart icon...
router.get("/addtocart/:productid", isLoggedIn, async function(req, res){
    let user = await userModel.findOne({ email: req.user.email})

    // Check if the user exists
    if (!user) {
        req.flash("error", "User not found")
        return res.redirect("/shop")
    }

    // Add the product to the user's cart
    user.cart.push(req.params.productid)
    await user.save()
    req.flash("success", "Added to cart")
    res.redirect("/shop")
})


// ➡️ Give functionality to cart...
router.get("/cart", isLoggedIn, async function (req, res) {
    try {
        let user = await userModel.findOne({ email: req.user.email }).populate("cart");
        if (!user || user.cart.length === 0) {
            // If the cart is empty, render the page with an empty cart message
            return res.render("cart", { user, bill: 0, error: "Your cart is empty!" });
        }

        // If the cart is not empty, calculate the bill
        const bill = (Number(user.cart[0].price) + 20) - Number(user.cart[0].discount);

        // Render the cart page with cart items and total bill
        res.render("cart", { user, bill, error: "" });

    } catch (err) {
        console.log(err);
        res.status(500).send("Server Error");
    }
});



router.post("/cart/delete/:id", isLoggedIn, async function(req, res) {
    let user = await userModel.findOne({ email: req.user.email });
    user.cart = user.cart.filter(item => item.toString() !== req.params.id);
    await user.save();
    req.flash("success", "Item removed from cart");
    res.redirect("/cart");
});



module.exports = router