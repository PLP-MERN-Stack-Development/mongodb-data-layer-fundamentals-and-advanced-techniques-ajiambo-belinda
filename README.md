# PLP Bookstore MongoDB Assignment

## Setup Instructions

1. Install MongoDB Community Edition locally or create a free cluster on MongoDB Atlas.
2. Replace the connection string in `insert_books.js` with your MongoDB URI.
3. Run `node insert_books.js` to insert sample book documents into the `plp_bookstore` database.
4. Use the functions in `queries.js` by importing them into your Node.js environment and calling them with a connected database instance.

## Running the Scripts

- To insert data:  
  `node insert_books.js`

- To run queries:  
  Import functions from `queries.js` into your application or test file and call them with a database connection.

## Additional Information

This assignment covers:

- Database setup with MongoDB
- Basic CRUD operations
- Advanced queries with filtering, projection, sorting, and pagination
- Aggregation pipelines for data analysis
- Index creation and query performance evaluation
