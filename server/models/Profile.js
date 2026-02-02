const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProfileSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    nameUser: {
        type: String,
    },
    dept: {
        type: String,
    },
    avatar: {
        type: String,
        default: ''
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }

})
module.exports = mongoose.model('profiles', ProfileSchema)