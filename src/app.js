const express = require('express')
const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT ? process.env.PORT : 3000;

// Database Connection
require('./db/db')

const Clinic = require('./models/Clinic')
const Appointment = require('./models/Appointment')
const Pet = require('./models/Pet')
const PetOwner = require('./models/PetOwner')

ObjectId = require('mongoose').Types.ObjectId;

// Router
const app = express()
// Json Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

// // Add all Pets
// app.get('/addPets', async (req, res)=> {
//     console.log("Add Pets")
//     const pets = require('../mongo-style-pets.json')
//     let count = 0
//     for (let index = 0; count < 100; index++) {
//         const pet = pets[index];
//         if (pet && pet.id ) {
//             const newPet = new Pet(pet)
//             await newPet.save()
//             count++
//         }
        
//     }
//     res.send({message : `${count} Pets added to Database!`})
// })

// // Add All PetOwners
// app.get('/addPetOwners', async (req, res)=> {
//     console.log("Add PetOwners")
//     const petOwners = require('../mongo-style-petOwner.json')
//     // console.log("Total PetOwners Found: ", petOwners.length);
//     let count = 0
//     for (let index = 0; count <= 50; index++) {
//         const petOwner = petOwners[index];
//         if (petOwner && petOwner.id ) {
//             const newPetOwner = new PetOwner(petOwner)
//             await newPetOwner.save()
//             count++
//         }
        
//     }
//     res.send({message : `${count} PetOwners added to Database!`})
// })

// Adding All Appointments
app.get('/addAppointments', async (req, res)=> {
    console.log("Add Appointments")
    let clinics = await Clinic.find({})
    const appointments = require('../mongo-style-appointments.json')
    console.log("Total Appointments Found: ", appointments.length);
    let count = 0
    for (let index = 0; index < appointments.length; index++) {
        const appointment = appointments[index];
        if (appointment && appointment.id && appointment.clinicId && appointment.petId && appointment.petOwnerId) {
            appointment.createdAt ? delete appointment.createdAt : appointment
            appointment.updatedAt ? delete appointment.updatedAt : appointment
            clinics.forEach(clinic => {
                if (appointment.clinicId == clinic.id) {
                    appointment.clinicId = clinic._id 
                }
            });
            const newAppointment = new Appointment(appointment)
            await newAppointment.save()
            count++
        }
    }
    res.send({message : `${count} Appointments added to Database!`})
})

// // Adding all clinics
app.get('/addClinics', async (req, res)=> {
    console.log("Add Clinics")
    const clinics = require('../mongo-style-clinics.json')
    clinics.forEach(async clinic => {
        const newClinic = new Clinic(clinic)
        await newClinic.save()
    });
    res.send({message : `${clinics.length} added to Database!`})
})

// Update Data
app.get('/updateData', async (req, res)=> {
    console.log("Update Data")
    let appointments = await Appointment.find({})
    console.log("Total Appointments Found: ", appointments.length);
    let pets = await Pet.find({})
    console.log("Total Pets Found: ", pets.length);
    let petOwners = await PetOwner.find({})
    console.log("Total PetOwners Found: ", petOwners.length);
    let petCount = -1
    let appointmentCount = 0
    for (let index = 0; index < petOwners.length; index++) {
        const petOwner = petOwners[index];
        let pet1 = pets[++petCount]
        let pet2 = pets[++petCount]
        appointmentCount =  index * 100
        petOwner.pets.push(pet1._id) 
        petOwner.pets.push(pet2._id)  
        await petOwner.save()
        let petApp = 0
        console.log(appointmentCount);
        for (let i = appointmentCount; i < appointmentCount+100; i++) {
            const appointment = appointments[i];
            if (appointment) {
                petApp++
                if ( petApp <=50 ) {
                    appointment.petId = pet1._id
                    appointment.petOwnerId = petOwner._id
                    pet1.appointments.push(appointment._id)
                } else {
                    appointment.petId = pet2._id
                    appointment.petOwnerId = petOwner._id
                    pet2.appointments.push(appointment._id)
                }
                console.log("Apointment No#: ",i);
                
                // console.log(appointment);
                await appointment.save()   
            }
        }
        await pet1.save()
        await pet2.save()
    }
    res.send({message : `Data Updated!`})
})


app.get('/getClinic/:date', async (req, res)=> {
    let clinic = await Clinic.findOne({ id : "-LvGoHzGUfQV79NlzmHl"});
    let appointments = await Appointment
                                        .find({ 
                                                clinicId :  clinic._id,
                                                startTime : { "$regex": req.params.date }
                                            })
                        
    console.log(appointments.length);
    res.send({
        clinic : clinic,
        appointments : appointments
    })    
})

app.post('/weeklyAppointments', async (req, res)=> {
    let startDate = req.body.startDate
    let endDate = req.body.endDate
    let clinic = await Clinic.findOne({ id : "-LvGoHzGUfQV79NlzmHl"});
    let appointments = await Appointment
                                    .find({ 
                                        clinicId :  clinic._id,
                                        startTime : {
                                            $gte: startDate,
                                            $lt: endDate
                                        }
                                     })
    console.log("Appointments Found: ",appointments.length);
    res.send({
        appointments : appointments
    })    
})

// app.get('/getPets', async (req, res)=> {
//     // let petOwner = await PetOwner.findOne({ _id : "5eeb4f845941bb21ac2a040d"});
//     let pets = await Pet.findOne({  _id : "5eeb4f845941bb21ac2a040d" }).populate('appointments')
//     res.send({
//         pet : pets
//     })    
// })

// app.get('/getPetOwners', async (req, res)=> {
//     let petOwner = await PetOwner.findOne({ _id : "5eeb4e7bfb302128786a0c4f"}).populate('pets', 'breed coverPhoto dob microchip name species notes')
//     let appointments = []
//     for (let index = 0; index < petOwner.pets.length; index++) {
//         const pet = petOwner.pets[index];
//         let petApointments = await Pet.findOne({  _id : pet._id }).populate('appointments')
//         console.log("Appointments Found: ",petApointments.appointments.length);
//         appointments.push(petApointments)
//     }
//     petOwner.pets = appointments
//     res.send({
//         petOwner : petOwner
//     })    
// })


app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})

