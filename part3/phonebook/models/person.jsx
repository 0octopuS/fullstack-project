const mongoose = require("mongoose")

const url = process.env.MONGODB_URI

console.log("connecting to", url)
mongoose.connect(url)
    .then(result => { console.log("connected to MongoDB") })
    .catch(
        (error) => { console.log("error connecting to MongoDB:", error.message) })
mongoose.set("strictQuery", false)
mongoose.connect(url)

// 3.19 name over 3
// 3.30 number meet requirement 
const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
    },
    number: {
        type: String,
        required: true,
        validate: {
            validator: (value) => {
                const phoneRegex = /^(\d{2,3})-(\d+)$/
                return phoneRegex.test(value)
            },
            message: "Invalid phone number format. Use the format XX-XXXXXXXX or XXX-XXXXXXXX.",
        },
    },
})
personSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model("phonebook", personSchema)
