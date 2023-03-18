// const mongoose = require('mongoose');

// const passportSchema = new mongoose.Schema({
//     number: { type: String, required: true },
//     issuedBy: { type: String, required: true }
// });

// const personSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     age: { type: Number, required: true },
//     passport: { type: mongoose.Schema.Types.ObjectId, ref: 'Passport', required: true }
// });

// const Passport = mongoose.model('Passport', passportSchema);
// const Person = mongoose.model('Person', personSchema);

// // Insert sample data
// const passportData = {
//     number: '123456789',
//     issuedBy: 'Government of USA'
// };
// const passport = new Passport(passportData);
// passport.save();

// const personData = {
//     name: 'John Doe',
//     age: 30,
//     passport: passport._id
// };
// const person = new Person(personData);
// person.save();
// ///









const mongoose = require('mongoose');

// Define the person schema
const personSchema = new mongoose.Schema({
    name: String,
    email: String,
    address: { type: mongoose.Schema.Types.ObjectId, ref: 'Address' }
});

// Define the address schema
const addressSchema = new mongoose.Schema({
    street: String,
    city: String,
    state: String,
    zip: String
});

// Create the models
const Person = mongoose.model('Person', personSchema);
const Address = mongoose.model('Address', addressSchema);

async function addData() {
    try {
        // Create a new address
        const newAddress = new Address({
            street: '123 Main St',
            city: 'Anytown',
            state: 'CA',
            zip: '12345'
        });

        // Save the address to the database using async/await
        const savedAddress = await newAddress.save();
        console.log('Address saved:', savedAddress);

        // Create a new person and associate it with the address
        const newPerson = new Person({
            name: 'John Doe',
            email: 'john@example.com',
            address: savedAddress._id // Use the saved address's ID as the address
        });

        // Save the person to the database using async/await
        const savedPerson = await newPerson.save();
        console.log('Person saved:', savedPerson);

        // Find the person and populate the address using async/await
        const foundPerson = await Person.findOne({ _id: savedPerson._id }).populate('address');
        console.log('Person with address:', foundPerson);
    } catch (err) {
        console.error(err);
    }
}

// Call the addData function
addData();
