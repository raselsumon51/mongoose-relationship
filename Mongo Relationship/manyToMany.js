const mongoose = require('mongoose');

// Define the book schema
const bookSchema = new mongoose.Schema({
    title: String,
    authors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Author' }]
});

// Define the author schema
const authorSchema = new mongoose.Schema({
    name: String,
    books: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }]
});

// Create the models
const Book = mongoose.model('Book', bookSchema);
const Author = mongoose.model('Author', authorSchema);

async function addData() {
    try {
        // Create some authors
        const author1 = new Author({ name: 'J.K. Rowling' });
        const author2 = new Author({ name: 'Stephen King' });

        // Save the authors to the database using async/await
        const savedAuthor1 = await author1.save();
        const savedAuthor2 = await author2.save();
        console.log('Authors saved:', savedAuthor1, savedAuthor2);

        // Create some books and associate them with the authors
        const book1 = new Book({
            title: 'Harry Potter and the Philosopher\'s Stone',
            authors: [savedAuthor1._id] // Use the saved author's ID as the author
        });
        const book2 = new Book({
            title: 'The Shining',
            authors: [savedAuthor2._id] // Use the saved author's ID as the author
        });

        // Save the books to the database using async/await
        const savedBook1 = await book1.save();
        const savedBook2 = await book2.save();
        console.log('Books saved:', savedBook1, savedBook2);

        // Add the books to the authors' books array using async/await
        savedAuthor1.books.push(savedBook1._id);
        savedAuthor2.books.push(savedBook2._id);
        const updatedAuthor1 = await savedAuthor1.save();
        const updatedAuthor2 = await savedAuthor2.save();
        console.log('Authors updated:', updatedAuthor1, updatedAuthor2);

        // Find the books and populate the authors using async/await
        const foundBooks = await Book.find().populate('authors');
        console.log('Books with authors:', foundBooks);
    } catch (err) {
        console.error(err);
    }
}

// Call the addData function
addData();




// const mongoose = require('mongoose');

// const bookSchema = new mongoose.Schema({
//     title: { type: String, required: true },
//     isbn: { type: String, required: true },
//     authors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Author' }]
// });

// const authorSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     email: { type: String, required: true },
//     books: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }]
// });

// const Book = mongoose.model('Book', bookSchema);
// const Author = mongoose.model('Author', authorSchema);

// // Insert sample data
// const authorData1 = {
//     name: 'John Smith',
//     email: 'john@example.com'
// };
// const author1 = new Author(authorData1);
// author1.save();

// const authorData2 = {
//     name: 'Jane Doe',
//     email: 'jane@example.com'
// };
// const author2 = new Author(authorData2);
// author2.save();

// const bookData1 = {
//     title: 'Book 1',
//     isbn: '1234567890',
//     authors: [author1._id, author2._id]
// };
// const book1 = new Book(bookData1);
// book1.save();

// const bookData2 = {
//     title: 'Book 2',
//     isbn: '0987654321',
//     authors: [author2._id]
// };
// const book2 = new Book(bookData2);
// book2.save();

// author1.books.push(book1._id);
// author1.save();
// author2.books.push(book1._id, book2._id);
// author2.save();
