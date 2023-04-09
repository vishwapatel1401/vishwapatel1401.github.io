import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ContactSchema = new Schema (
    {
        FullName : String,
        ContactNumber : String,
        EmailAddress : String
    },
    {
        collection : 'contact'
    }
);
const Model = mongoose.model("Contact", ContactSchema);
export default Model;