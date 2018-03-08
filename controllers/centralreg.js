const mongoose = require('mongoose');
const UserModel = require('../models/user');

var centralRegd = function (req, res) {

    console.log(req.params.id);
    var id = Number(req.params.id);
    id = (((((id / 300) - 2) / 7) + 7) / 30) - 5;
    if (isNaN(id)) {
        res.json({ "msg": "Not an integer" })
    } else {
        UserModel.findOneAndUpdate({ xtasyid: id }, { $set: { centralRegd: "true" } }, function (err, doc) {
            console.log(doc)
            if (err) throw err;
            if (!doc) res.json({ "msg": "Id not found" })
            else res.json({ "msg": "successfully updated" });
        });
    }


}

module.exports = { "centralRegd": centralRegd };