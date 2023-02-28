import {Schema, Model} from "mongoose";
import {conn} from "./conn";
import {IRating} from "../src/model/Rating";

const ratingSchema : Schema = new Schema({
    user : {
        type: String,
        required: true,
        unique: false
    },

});

export const ratingModel = conn.model<IRating>("Rating", ratingSchema);