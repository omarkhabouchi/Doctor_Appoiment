const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  email: { 
    type: String, 
    unique: true
 },
  password: { 
    type: String 
},
  roles: { 
    type: String, 
    default: "user" 
},
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
