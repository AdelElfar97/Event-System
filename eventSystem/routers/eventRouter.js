const express=require("express");
const {body,query,param}=require("express-validator")
const router=express.Router();

const controller=require("./../Controllers/eventController");
let isAuth = require("./../middleware/authMW");

router.route("/events")
.get([],controller.getAllEvents)

.post([
    body("title").isString(),
    body("subtitle").isString(),
    body("image"),
    body("description").isString(),
    body("date").isString(),
    body("mainspeaker").isString(),
],controller.addEvent)




router.route("/events/:id")
.get([],controller.getEvent)



.put([
    body("title").isString(),
    body("subtitle").isString(),
    body("image").isString(),
    body("description").isString(),
    body("date").isDate(),
    body("mainspeaker").isString()
],controller.updateEvent)


.delete([

],isAuth,controller.deleteEvent)





module.exports=router