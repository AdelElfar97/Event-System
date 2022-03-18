const { validationResult } = require("express-validator");

const Event = require("./../models/eventSchema");

exports.getAllEvents = (request, response) => {


    Event.find({})
        .then(data => {
            response.status(200).json(data)
        })
        .catch(error => {
            next(error);
        })
}

exports.getEvent = (request, response) => {
    Event.find({ _id: request.params.id })
        .then(data => {
            response.status(200).json(data)
        })
        .catch(error => {
            next(error);
        })

}

exports.addEvent = (request, response, next) => {
    console.log(request.body)
    console.log(request.file.filename)
    let errors = validationResult(request);
    if (!errors.isEmpty()) {
        let error = new Error();
        error.status = 422;
        error.message = errors.array().reduce((current, object) => current + object.msg + " ", "")
        throw error;
    }

    if (1 /*||request.role == "administrator"*/) {
        let eventObj = new Event({
            
            title: request.body.title,
            subtitle: request.body.subtitle,
            description: request.body.description,
            image: "http://localhost:8080/images/"+request.file.filename,
            date: request.body.date,
            mainspeaker: request.body.mainspeaker,

        })
        console.log(eventObj)
        eventObj.save()
            .then(data => {
                response.status(201).json({ message: "added", data })
            })
            .catch(error => next(error))
    }
    else {
        throw new Error("Not Authorized. Only Admin can do that");
    }


}

exports.updateEvent = (request, response) => {


    let errors = validationResult(request);
    if (!errors.isEmpty()) {
        let error = new Error();
        error.status = 422;
        error.message = errors.array().reduce((current, object) => current + object.msg + " ", "")
        throw error;
    }
    if (request.role == "administrator") {
        Event.findByIdAndUpdate(request.body.id, {
            $set: {
                title: request.body.title,
                subtitle: request.body.subtitle,
                description: request.body.description,
                image: "http://localhost:8080/images/"+request.file.filename,
                date: request.body.date,
                mainspeaker: request.body.mainspeaker,
                
            }
        })
            .then(data => {
                if (data == null) throw new Error("event not found");
                response.status(200).json({ message: "Updated", data })
            })
            .catch(error => next(error))
    }
    else {
        throw new Error("Not Authorized. Only admin do that");
    }
}

















exports.deleteEvent = (request, response) => {

    let errors = validationResult(request);
    if (!errors.isEmpty()) {
        let error = new Error();
        error.status = 422;
        error.message = errors.array().reduce((current, object) => current + object.msg + " ", "")
        throw error;
    }

    if (1||request.role == "administrator") {
        Event.findByIdAndDelete(request.params.id)
            .then(data => {
                if (data == null) throw new Error("student Is not Found!")
                response.status(200).json({ message: "deleted" })

            })
            .catch(error => next(error))
    }
    else {
        throw new Error("Not Authorized. only admin can do that");
    }

}
