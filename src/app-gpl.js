
// Database Connection
const Clinic = require('./models/Clinic')
const Appointment = require('./models/Appointment')
const Pet = require('./models/Pet')
const PetOwner = require('./models/PetOwner')
// const { ApolloServer, gql } = require('apollo-server');
const { ApolloServer, gql } = require('apollo-server-express');

require('./db/db')
// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Appointment {
        _id: String
        id: String
        startTime: String
        duration: String
        description: String
        appointmentStatus: String
        appointmentType: String
        trackingComponent: String
        food: String
        bowlMovements: String
        clinicId: String
        petOwnerId: PetOwner
        petId: Pet
        createdAt : String
        updatedAt : String
  }

  type PetOwner {
    _id: String
    id: String
    backupFirstName: String
    backupLastName: String
    backupPhone: String
    email: String
    fax: String
    firstName: String
    lastName: String
    mobilePhone: String
    workPhone: String
    phone: String
    role: String
    practiceId: String
    uid: String
    pets : [Pet]
    createdAt : String
    updatedAt : String
}

type Pet {
    _id: String
    id: String
    name: String
    breed: String
    coverPhoto: String
    dob: String
    microchip: String
    notes: String
    species: String
    appointments : [Appointment]
    createdAt : String
    updatedAt : String
}

type Clinic {
    _id: String
    id: String
    address: String
    affiliation: String
    alternatePhone: String
    clinicType: String
    email: String
    customerMessage: String
    ezyVetClientSecret: String
    ezyVetClinicId: String
    ezyVetGrantType: String
    ezyVetScope: String
    food: String
    hours: String
    joinDate: String
    lastSync: String
    mapLink: String
    medication: String
    name: String
    nonProfit: String
    paidCustomer: String
    phone: String
    practiceId: String
    practiceMessage: String
    speciality: String
    streetAddress: String
    syncRoutinePercentage: String
    syncRoutineStatus: String
    website: String
    appointments: [Appointment]
    createdAt : String
    updatedAt : String
}

  type Query {
    appointments: [Appointment]
    getClinic( date : String ): Clinic
    weeklyAppointments( startDate : String, endDate : String ) : Clinic
  }
`;

const resolvers = {
    Query: {
      appointments: async () => {
          console.log("Get Appointments!");
          let appointments =  await Appointment.find({})
                                                    .limit(100)
                                    console.log(appointments);
                                    
            console.log(" Appointments Found: ", appointments && appointments.length ? appointments.length : 0);
            return appointments
      },
      weeklyAppointments: async ( parent, args ) => {
        try {
          console.log("Get Clinic!");
          let clinic = await Clinic.findOne({ id : "-LvGoHzGUfQV79NlzmHl"})
          let appointments = []
          if ( args.startDate && args.endDate) {
            appointments = await Appointment
            .find({ 
                    clinicId :  clinic._id,
                    startTime : {
                      $gte: args.startDate,
                      $lt: args.endDate
                  }
                })
            console.log(" Appointments Found: ", appointments && appointments.length ? appointments.length : 0);
            clinic.appointments = appointments   
          }
          return clinic   
        } catch (error) {
            console.log(error);
            return {}
        }
    },
      getClinic: async ( parent, args ) => {
          try {
            console.log("Get Clinic!");
            let clinic = await Clinic.findOne({ id : "-LvGoHzGUfQV79NlzmHl"})
            let appointments = await Appointment
                                        .find({ 
                                                clinicId :  clinic._id,
                                                startTime : { "$regex": args.date }
                                            })
                                        // .populate('petId' , 'breed coverPhoto dob microchip name species notes')
                                        // .populate('petOwnerId', 'email firstName lastName practiceId role uid')
                                        // .limit(100)
                                        // console.log(appointments);
                                        console.log(" Appointments Found: ", appointments && appointments.length ? appointments.length : 0);
            clinic.appointments = appointments
            return clinic   
          } catch (error) {
              console.log(error);
              return {}
          }
    }
    },
    Appointment : {
        _id: (parent) => parent._id,
        id: (parent) => parent.id,
        startTime: (parent) => parent.startTime,
        duration:  (parent) => parent.duration,
        description: (parent) => parent.description,
        appointmentStatus: (parent) => parent.appointmentStatus,
        appointmentType: (parent) => parent.appointmentType,
        trackingComponent: (parent) => parent.trackingComponent,
        food: (parent) => parent.food,
        bowlMovements: (parent) => parent.bowlMovements,
        clinicId: (parent) => parent.clinicId,
        petOwnerId: (parent) => parent.petOwnerId,
        petId: (parent) => parent.petOwnerId,
        createdAt : (parent) => parent.createdAt,
        updatedAt : (parent) => parent.updatedAt
  },
   PetOwner: {
        _id: (parent) => parent._id,
        id: (parent) => parent.id,
        backupFirstName: (parent) => parent.backupFirstName,
        backupLastName: (parent) => parent.backupLastName,
        backupPhone: (parent) => parent.backupPhone,
        email: (parent) => parent.email,
        fax: (parent) => parent.fax,
        firstName: (parent) => parent.firstName,
        lastName: (parent) => parent.lastName,
        mobilePhone: (parent) => parent.mobilePhone,
        workPhone: (parent) => parent.workPhone,
        phone: (parent) => parent.phone,
        role: (parent) => parent.role,
        practiceId: (parent) => parent.practiceId,
        uid: (parent) => parent.parent,
        pets : (parent) => parent.pets,
        createdAt : (parent) => parent.createdAt,
        updatedAt : (parent) => parent.updatedAt,
    },

    Pet:  {
        _id: (parent) => parent._id,
        id: (parent) => parent.id,
        name: (parent) => parent.name,
        breed: (parent) => parent.breed,
        coverPhoto: (parent) => parent.coverPhoto,
        dob: (parent) => parent.dob,
        microchip: (parent) => parent.microchip,
        notes: (parent) => parent.notes,
        species: (parent) => parent.species,
        appointments : (parent) => parent.appointments,
        createdAt : (parent) => parent.createdAt,
        updatedAt : (parent) => parent.updatedAt,
    },

    Clinic :  {
        _id: (parent) => parent._id,
        id: (parent) => parent.id,
        address: (parent) => parent.address,
        affiliation: (parent) => parent.affiliation,
        alternatePhone: (parent) => parent.alternatePhone,
        clinicType: (parent) => parent.clinicId,
        email: (parent) => parent.email,
        customerMessage: (parent) => parent.customerMessage,
        ezyVetClientSecret: (parent) => parent.ezyVetClientSecret,
        ezyVetClinicId: (parent) => parent.ezyVetClinicId,
        ezyVetGrantType: (parent) => parent.ezyVetGrantType,
        ezyVetScope: (parent) => parent.ezyVetScope,
        food: (parent) => parent.food,
        hours: (parent) => parent.hours,
        joinDate: (parent) => parent.joinDate,
        lastSync: (parent) => parent.lastSync,
        mapLink: (parent) => parent.mapLink,
        medication: (parent) => parent.medication,
        name: (parent) => parent.name,
        nonProfit: (parent) => parent.nonProfit,
        paidCustomer: (parent) => parent.paidCustomer,
        phone: (parent) => parent.phone,
        practiceId: (parent) => parent.practiceId,
        practiceMessage: (parent) => parent.practiceMessage,
        speciality: (parent) => parent.speciality,
        streetAddress: (parent) => parent.streetAddress,
        syncRoutinePercentage: (parent) => parent.syncRoutinePercentage,
        syncRoutineStatus: (parent) => parent.syncRoutineStatus,
        website: (parent) => parent.website,
        appointments : (parent) => parent.appointments,
        createdAt : (parent) => parent.createdAt,
        updatedAt : (parent) => parent.updatedAt,
    }

  };

const server = new ApolloServer({ typeDefs, resolvers, tracing: true });

  // The `listen` method launches a web server.
  const express = require('express')
  const app = express();
  server.applyMiddleware({ app });
  
  app.listen({ port: 4000 }, () =>
      console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  )

// server.listen().then(({ url }) => {
//     console.log(`🚀  Server ready at ${url}`);
//   });