const express = require("express");
const { body, query, param } = require("express-validator")
const router = express.Router();

const controller = require("./../Controllers/speakerController");
const Speaker = require("./../models/speakerSchema");
let isAuth = require("./../middleware/authMW");

//removed isAuth
router.route("/speakers")
    .get( [],isAuth, controller.getAllSpeaker)

    // name: String,
    // image: String,
    // address: String,
    // bdate: Date,
    // hourRate: Number,
    // isMarried: Boolean,
    // rating: Number,
    //Authentication Middleware is currently not added to post
    //because I don't send the token in CodePen.io
    //will be fixed later
    .post([
        body("name").notEmpty().withMessage("name shouldn't be Empty."),
        body("image"),
        body("address").notEmpty().withMessage("address shouldn't be Empty."),
        body("bdate").notEmpty().withMessage("bdate shouldn't be Empty."),
        body("hourRate").notEmpty().withMessage("hourRate shouldn't be Empty."),
        body("isMarried").notEmpty().withMessage("isMarried shouldn't be Empty."),
        body("rating").notEmpty().withMessage("rating shouldn't be Empty.")
        
    ], controller.addSpeaker)

    .delete( [
        body("_id").notEmpty().withMessage("_id shouldn't be Empty.")
        // body("email").notEmpty().withMessage("email should not be empty")
    ], controller.deleteSpeaker)

    //Authentication Middleware is currently not added to put
    //because I don't send the token in CodePen.io
    //will be fixed later
    .put([
        body("name").notEmpty().withMessage("name shouldn't be Empty."),
        body("image"),
        body("address").notEmpty().withMessage("address shouldn't be Empty."),
        body("bdate").notEmpty().withMessage("bdate shouldn't be Empty."),
        body("hourRate").notEmpty().withMessage("hourRate shouldn't be Empty."),
        body("isMarried").notEmpty().withMessage("isMarried shouldn't be Empty."),
        body("rating").notEmpty().withMessage("rating shouldn't be Empty.")
    ], controller.updateSpeaker)



router.route("/speakers/:id")
    .get([], controller.getSpeaker)
    .delete([], controller.deleteSpeaker)
    .put([], controller.updateSpeaker)

module.exports = router;