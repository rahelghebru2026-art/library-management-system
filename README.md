# library-management-system
Library Management System – Full Stack Development Assignment
## Schema Decisions

### Database Models

The database consists of three main models: `User`, `Genre`, and `Book`.

- **User:** Stores user information, including name, email, and role. The `Role` enum defines two roles: `PATRON` and `LIBRARIAN`.
- **Genre:** Stores book categories such as Fiction, Science, Technology, and History.
- **Book:** Stores book information, including title, author, ISBN, publication year, and genre.

### Relationships

The relationship between `Genre` and `Book` is one-to-many. One genre can contain multiple books, while each book belongs to one genre.

### Why Use a Foreign Key?

I used a foreign key (`genreId`) in the `Book` model instead of embedding genre information directly in every book record.

This approach reduces data duplication, maintains data consistency, and makes it easier to update genre information in one place.

## Relational Database vs. Document Database

This project uses Prisma with PostgreSQL, a relational database. Related data is stored in separate tables and connected using relationships and foreign keys. For example, each Book has a `genreId` that links it to a Genre.

In a document database, related information could instead be embedded inside a document. For example, a book document could contain its genre information directly. This can make retrieving related data easier in some cases, but it may also duplicate information.