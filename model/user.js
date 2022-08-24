import { Schema, models, model } from "mongoose";

const userSchema = new Schema({
  ownerName: String,
  phone: String,
  petName: String,
  petAge: String,
  petBirthDate: String,
  petType: String,
});

const Users = models.user || model("user", userSchema);

export default Users;