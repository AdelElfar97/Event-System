const { validationResult } = require("express-validator");
const Speaker = require("./../models/speakerSchema");
const bcrypt = require('bcrypt');

exports.getAllSpeaker = (request, response, next) => {

    Speaker.find({})
    .then(data => {
        response.status(200).json(data)
    })
    .catch(error => {
        next(error);
    })

    // if (request.role == "administrator" || request.role == "speaker") {
    //     Speaker.find({})
    //         .then(data => {
    //             response.status(200).json(data)
    //         })
    //         .catch(error => {
    //             next(error);
    //         })
    // }
    // else {
    //     throw new Error("Not Authorized. A student can't do that");
    // }

}

exports.getSpeaker = (request, response) => {

    Speaker.findOne({ _id: request.params.id })
            .then(data => {
                response.status(200).json(data)
            })
            .catch(error => {
                next(error);
            })
    // if (request.role == "administrator" || request.role == "speaker") {
    //     Speaker.find({ email: request.params.email })
    //         .then(data => {
    //             response.status(200).json(data)
    //         })
    //         .catch(error => {
    //             next(error);
    //         })
    // }
    // else {
    //     throw new Error("Not Authorized. A student can't do that");
    // }

}


exports.login = (request, response) => {
    console.log("body",request.body)
    console.log("pars",request.params)
    
    Speaker.findOne({ _id: request.params.id })
            .then(data => {
                response.status(200).json(data)
            })
            .catch(error => {
                next(error);
            })
    // if (request.role == "administrator" || request.role == "speaker") {
    //     Speaker.find({ email: request.params.email })
    //         .then(data => {
    //             response.status(200).json(data)
    //         })
    //         .catch(error => {
    //             next(error);
    //         })
    // }
    // else {
    //     throw new Error("Not Authorized. A student can't do that");
    // }

}



exports.addSpeaker = (request, response, next) => {
    console.log(request.file)

    let errors = validationResult(request);
    if (!errors.isEmpty()) {
        let error = new Error();
        error.status = 422;
        error.message = errors.array().reduce((current, object) => current + object.msg + " ", "")
        throw error;

    }

 
    let speakerObj = new Speaker({
        // _id: request.body.id,
        name: request.body.name,
        image: "http://localhost:8080/images/"+request.file.originalname,
        address: request.body.address,
        bdate: request.body.bdate,
        hourRate: request.body.hourRate,
        isMarried: request.body.isMarried,
        rating: request.body.rating
    })

    speakerObj.save()
        .then(data => {
            response.status(201).json({ message: "added", data })
        })
        .catch(error => next(error))


}

exports.updateSpeaker = (request, response, next) => {
    let errors = validationResult(request);
    if (!errors.isEmpty()) {
        let error = new Error();
        error.status = 422;
        error.message = errors.array().reduce((current, object) => current + object.msg + " ", "")
        throw error;

    }

    Speaker.updateOne({ _id: request.params.id }, {
        $set: {
            name: request.body.name,
            image: request.body.image,
            address: request.body.address,
            bdate: request.body.bdate,
            hourRate: request.body.hourRate,
            isMarried: request.body.isMarried,
            rating: request.body.rating
        }
    }).then(data => {

        if (data == null) throw new Error("Speaker not found");
        response.status(200).json({ message: "Updated", data })
    })
        .catch(error => next(error))

}



exports.deleteSpeaker = async (request, response, next) => {
    let errors = validationResult(request);
    if (!errors.isEmpty()) {
        let error = new Error();
        error.status = 422;
        error.message = errors.array().reduce((current, object) => current + object.msg + " ", "")
        throw error;

    }

    try {
        let data = await Speaker.findOneAndDelete({ _id: request.params.id });
        if (data == null) throw new Error("Speaker not found");
        response.status(200).json({ message: "deleted" })
    }
    catch (error) {
        next(error)
    }


    // if (request.role == "administrator") {
    //     try {
    //         let data = await Speaker.findOneAndDelete({ email: request.body.email });
    //         if (data == null) throw new Error("Speaker not found");
    //         response.status(200).json({ message: "deleted" })
    //     }
    //     catch (error) {
    //         next(error)
    //     }
    // }
    // else {
    //     next(new Error("Not Authorized. Only admin can do that"));
    // }


}

