const userModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../utils/generateToken");

// User registration function
module.exports.registerUser = async function(req, res) {   
    try {
        // Extract email, password, and fullname from the request body
        let { email, password, fullname } = req.body;

        // Check if a user with the provided email already exists
        let user = await userModel.findOne({ email: email });
        if (user) {
            req.flash("error", "You already have an account, Please login.");
            return res.redirect("/"); // Redirect to homepage if user exists
        } 

        // Generate salt and hash the password
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(password, salt, async function(err, hash) {
                if (err) return res.send(err.message); // Handle hashing error

                // Create a new user in the database
                let user = await userModel.create({
                    email: email,
                    password: hash, // Store the hashed password
                    fullname: fullname
                });

                // Generate a token for the user
                let token = generateToken(user);
                res.cookie("token", token); // Set the token as a cookie
                res.send("User created successfully"); // Send success message
            });
        });
    } catch (err) {
        res.send(err.message); // Handle other errors
    }
};

// User login function
module.exports.loginUser = async function(req, res) {
    let { email, password } = req.body;

    // Find the user by email
    let user = await userModel.findOne({ email: email });
    if (!user) {
        req.flash("error", "Email or Password incorrect");
        return res.redirect("/"); // Redirect if user not found
    }

    // Compare the provided password with the hashed password
    bcrypt.compare(password, user.password, function(err, result) {
        if (result) {
            // Password is correct, generate a token
            let token = generateToken(user);
            res.cookie("token", token); // Set the token as a cookie
            res.redirect("/shop"); // Redirect to the shop page on successful login
        } else {
            return res.send("Email or Password incorrect"); // Send error message if password is incorrect
        }
    });
};

// User logout function
module.exports.logoutUser = function(req, res) {
    res.cookie("token", ""); // Clear the token cookie
    res.redirect("/"); // Redirect to homepage after logout
};
