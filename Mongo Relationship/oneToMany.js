const mongoose = require('mongoose');

// Define the post schema
const postSchema = new mongoose.Schema({
    title: String,
    content: String,
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

// Define the user schema
const userSchema = new mongoose.Schema({
    name: String,
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }]
});

// Create the models
const User = mongoose.model('User', userSchema);
const Post = mongoose.model('Post', postSchema);

async function addData() {
    try {
        // Create a new user
        const newUser = new User({
            name: 'John Doe'
        });

        // Save the user to the database using async/await
        const savedUser = await newUser.save();
        console.log('User saved:', savedUser);

        // Create a new post and associate it with the user
        const newPost = new Post({
            title: 'My first post',
            content: 'Hello world!',
            author: savedUser._id // Use the saved user's ID as the author
        });

        // Save the post to the database using async/await
        const savedPost = await newPost.save();
        console.log('Post saved:', savedPost);

        // Find the user and add the post to their posts array using async/await
        const updatedUser = await User.findOneAndUpdate(
            { _id: savedPost.author },
            { $push: { posts: savedPost._id } },
            { new: true }
        );
        console.log('User updated:', updatedUser);
    } catch (err) {
        console.error(err);
    }
}

// Call the addData function
addData();
//promise

// const mongoose = require('mongoose');

// // Define the post schema
// const postSchema = new mongoose.Schema({
//     title: String,
//     content: String,
//     author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
// });

// // Define the user schema
// const userSchema = new mongoose.Schema({
//     name: String,
//     posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }]
// });

// // Create the models
// const User = mongoose.model('User', userSchema);
// const Post = mongoose.model('Post', postSchema);

// // Create a new user
// const newUser = new User({
//     name: 'John Doe'
// });

// // Save the user to the database using Promises
// newUser.save()
//     .then(savedUser => {
//         console.log('User saved:', savedUser);

//         // Create a new post and associate it with the user
//         const newPost = new Post({
//             title: 'My first post',
//             content: 'Hello world!',
//             author: savedUser._id // Use the saved user's ID as the author
//         });

//         // Save the post to the database using Promises
//         return newPost.save();
//     })
//     .then(savedPost => {
//         console.log('Post saved:', savedPost);

//         // Find the user and add the post to their posts array
//         return User.findOneAndUpdate(
//             { _id: savedPost.author },
//             { $push: { posts: savedPost._id } },
//             { new: true }
//         );
//     })
//     .then(updatedUser => {
//         console.log('User updated:', updatedUser);
//     })
//     .catch(err => {
//         console.error(err);
//     });
