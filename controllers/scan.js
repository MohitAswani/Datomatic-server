const { validationResult } = require("express-validator");

exports.getScan = (req, res, next) => {

    try{

    }
    catch(err){
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    }
};

