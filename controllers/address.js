var Address = require('../models/address.js');

exports.show = function(req, res) {

    Address.findOne({
        zipCode: req.params.zipCode
    }, function(err, address) {
        if (err) res.send("error happend: " + err);
        console.log(address);
        if (address) res.json(address);
    });
};