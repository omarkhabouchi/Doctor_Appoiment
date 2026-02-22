const mongoose = require("mongoose");

const departmentSchema = mongoose.Schema({
    name:String,
    descriptio:String,
    image:String
});

Department = mongoose.model("departement", departmentSchema);
module.exports = Department;
