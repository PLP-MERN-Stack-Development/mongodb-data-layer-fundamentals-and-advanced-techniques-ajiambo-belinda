// queries.js

// 1. Find all books in a specific genre
const findBooksByGenre = async (db, genre) => {
  return await db.collection('books').find({ genre }).toArray();
};

// 2. Find books published after a certain year
const findBooksPublishedAfter = async (db, year) => {
  return await db.collection('books').find({ published_year: { $gt: year } }).toArray();
};

// 3. Find books by a specific author
const findBooksByAuthor = async (db, author) => {
  return await db.collection('books').find({ author }).toArray();
};

// 4. Update the price of a specific book
const updateBookPrice = async (db, title, newPrice) => {
  return await db.collection('books').updateOne({ title }, { $set: { price: newPrice } });
};

// 5. Delete a book by its title
const deleteBookByTitle = async (db, title) => {
  return await db.collection('books').deleteOne({ title });
};

// 6. Find books that are both in stock and published after 2010 (projection of title, author, price)
const findInStockAfter2010 = async (db) => {
  return await db.collection('books').find({ in_stock: true, published_year: { $gt: 2010 } }, { projection: { title: 1, author: 1, price: 1, _id: 0 } }).toArray();
};

// 7. Sort books by price ascending (projection)
const sortBooksByPriceAsc = async (db) => {
  return await db.collection('books').find({}, { projection: { title: 1, author: 1, price: 1, _id: 0 } }).sort({ price: 1 }).toArray();
};

// 8. Sort books by price descending (projection)
const sortBooksByPriceDesc = async (db) => {
  return await db.collection('books').find({}, { projection: { title: 1, author: 1, price: 1, _id: 0 } }).sort({ price: -1 }).toArray();
};

// 9. Pagination: 5 books per page (projection)
const paginateBooks = async (db, page) => {
  const limit = 5;
  const skip = (page - 1) * limit;
  return await db.collection('books').find({}, { projection: { title: 1, author: 1, price: 1, _id: 0 } }).skip(skip).limit(limit).toArray();
};

// 10. Aggregation pipeline to calculate average price of books by genre
const avgPriceByGenre = async (db) => {
  return await db.collection('books').aggregate([
    { $group: { _id: "$genre", avgPrice: { $avg: "$price" } } }
  ]).toArray();
};

// 11. Aggregation to find the author with the most books
const authorWithMostBooks = async (db) => {
  return await db.collection('books').aggregate([
    { $group: { _id: "$author", count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 1 }
  ]).toArray();
};

// 12. Group books by publication decade and count them
const countBooksByDecade = async (db) => {
  return await db.collection('books').aggregate([
    {
      $group: {
        _id: {
          $subtract: [
            "$published_year",
            { $mod: ["$published_year", 10] }
          ]
        },
        count: { $sum: 1 }
      }
    },
    { $sort: { _id: 1 } }
  ]).toArray();
};

// 13. Create an index on the title field for faster searches
const createTitleIndex = async (db) => {
  return await db.collection('books').createIndex({ title: 1 });
};

// 14. Create a compound index on author and published_year
const createAuthorYearIndex = async (db) => {
  return await db.collection('books').createIndex({ author: 1, published_year: 1 });
};

// 15. Use explain() to demonstrate performance improvement with indexes
const explainQueryPerformance = async (db) => {
  const withoutIndex = await db.collection('books').find({ title: "Book One" }).explain();
  const withIndex = await db.collection('books').find({ title: "Book One" }).hint({ title: 1 }).explain();
  return { withoutIndex, withIndex };
};

module.exports = {
  findBooksByGenre,
  findBooksPublishedAfter,
  findBooksByAuthor,
  updateBookPrice,
  deleteBookByTitle,
  findInStockAfter2010,
  sortBooksByPriceAsc,
  sortBooksByPriceDesc,
  paginateBooks,
  avgPriceByGenre,
  authorWithMostBooks,
  countBooksByDecade,
  createTitleIndex,
  createAuthorYearIndex,
  explainQueryPerformance
};
