const mongoose = require('mongoose')

const AppointmentSchema = mongoose.Schema({

    id: {
        type: String
    },

    startTime: {
        type: String
    },

    duration: {
        type: String
    },

    description: {
        type: String
    },

    appointmentStatus: {
        type: String
    },

    appointmentType: {
        type: String
    },

    trackingComponent: {
        type: String
    },

    food: {
        type: String
    },
    
    bowlMovements: {
        type: String
    },

    clinicId: {
        type: String
    },
    petOwnerId: {
        // type: mongoose.Schema.Types.ObjectId,
        // ref : 'PetOwner'
        type : String
    },

    petId: {
        // type: mongoose.Schema.Types.ObjectId,
        // ref : 'Pet'
        type : String
    },

}, {timestamps: true})


AppointmentSchema.statics.findAppointment = async function( _id ) {
    const appointment = await Appointment.findOne({ _id } )

    if (!appointment) {
        return false;
    }
    return appointment    
}

const Appointment = mongoose.model('Appointment', AppointmentSchema)

module.exports = Appointment