const mongoose = require('mongoose')


const ClinicSchema = mongoose.Schema({

    address: {
        type: String
    },

    affiliation: {
        type: String
    }, 

    alternatePhone: {
        type: String
    }, 

    clinicType: {
        type: String
    },

    email: {
        type: String
    }, 

    customerMessage: {
        type: String
    }, 

    ezyVetClientSecret: {
        type: String
    },

    ezyVetClinicId: {
        type: String
    }, 

    ezyVetGrantType: {
        type: String
    },

    ezyVetScope: {
        type: String
    }, 

    food: {
        type: String
    }, 


    hours: {
        type: String
    },

    joinDate: {
        type: String
    }, 

    lastSync: {
        type: String
    }, 

    mapLink: {
        type: String
    },

    medication: {
        type: String
    }, 

    name: {
        type: String
    }, 

    nonProfit: {
        type: String
    },

    paidCustomer: {
        type: String
    }, 

    phone: {
        type: String
    }, 


    practiceId: {
        type: String
    }, 

    practiceMessage: {
        type: String
    },

    speciality: {
        type: String
    }, 

    streetAddress: {
        type: String
    }, 

    syncRoutinePercentage: {
        type: String
    },

    syncRoutineStatus: {
        type: String
    }, 

    website: {
        type: String
    }, 

    id: {
        type: String
    },

}, {timestamps: true})


ClinicSchema.statics.findClinic = async function( _id ) {
    const clinic = await Clinic.findOne({ _id } )

    if (!clinic) {
        return false;
    }
    return clinic    
}

const Clinic = mongoose.model('Clinic', ClinicSchema)

module.exports = Clinic