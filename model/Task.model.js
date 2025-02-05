const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const TasksSchema = new Schema({
  description : {
    type : String,
    required : true
  },
  start :
  {
    type: String,
    required : true
  },
  end : 
  {
    type: String,
    required : true
  },
  createdBy : 
  {
    type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true
  },
  acceptedBy :
  {
    type: mongoose.Schema.Types.ObjectId, ref: 'Volunteer', required: true
  },
  currentStat : 
  {
    type : String,
    default : "pending"
  },
  money:
  {
    type:Number,
    required : true
  }
});
module.exports = mongoose.model("Task", TasksSchema);