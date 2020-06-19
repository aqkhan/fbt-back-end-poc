const mongoose = require('mongoose')

const PetSchema = mongoose.Schema({
    name: {
        type: String
    },
    breed: {
        type: String
    },
    coverPhoto: {
        type: String
    },
    dob: {
        type: String
    },
    microchip: {
        type: String
    },
    notes: {
        type: String
    },
    species: {
        type: String
    },
    id: {
        type: String
    },
    appointments : [
        { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Appointment' 
        }
    ]

}, {timestamps: true})


PetSchema.statics.findPet = async function( _id ) {
    const pet = await Pet.findOne({ _id } )

    if (!pet) {
        return false;
    }
    return pet    
}

const Pet = mongoose.model('Pet', PetSchema)

module.exports = Pet