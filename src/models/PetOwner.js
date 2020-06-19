const mongoose = require('mongoose')

const PetOwnerSchema = mongoose.Schema({
    id: {
        type: String
    },
    backupFirstName: {
        type: String
    },
    backupLastName: {
        type: String
    },
    backupPhone: {
        type: String
    },
    email: {
        type: String
    },
    fax: {
        type: String
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    mobilePhone: {
        type: String
    },
    workPhone: {
        type: String
    },
    phone: {
        type: String
    },
    role: {
        type: String
    },
    practiceId: {
        type: String
    },
    uid: {
        type: String
    },
    pets : [
        { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Pet' 
        }
    ]

}, {timestamps: true})


PetOwnerSchema.statics.findPetOwner = async function( _id ) {
    const petOwner = await PetOwner.findOne({ _id } )

    if (!petOwner) {
        return false;
    }
    return petOwner    
}

const PetOwner = mongoose.model('PetOwner', PetOwnerSchema)

module.exports = PetOwner