import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create four book genres
  const fiction = await prisma.genre.upsert({
    where: { name: 'Fiction' },
    update: {},
    create: { name: 'Fiction' },
  });

  const science = await prisma.genre.upsert({
    where: { name: 'Science' },
    update: {},
    create: { name: 'Science' },
  });

  const technology = await prisma.genre.upsert({
    where: { name: 'Technology' },
    update: {},
    create: { name: 'Technology' },
  });

  const history = await prisma.genre.upsert({
    where: { name: 'History' },
    update: {},
    create: { name: 'History' },
  });

  // Create 16 books across the four genres
  const books = [
    { title: 'Things Fall Apart', author: 'Chinua Achebe', genreId: fiction.id },
    { title: 'The Old Man and the Sea', author: 'Ernest Hemingway', genreId: fiction.id },
    { title: 'Pride and Prejudice', author: 'Jane Austen', genreId: fiction.id },
    { title: 'Animal Farm', author: 'George Orwell', genreId: fiction.id },

    { title: 'A Brief History of Time', author: 'Stephen Hawking', genreId: science.id },
    { title: 'The Selfish Gene', author: 'Richard Dawkins', genreId: science.id },
    { title: 'Cosmos', author: 'Carl Sagan', genreId: science.id },
    { title: 'The Gene', author: 'Siddhartha Mukherjee', genreId: science.id },

    { title: 'Clean Code', author: 'Robert C. Martin', genreId: technology.id },
    { title: 'The Pragmatic Programmer', author: 'Andrew Hunt', genreId: technology.id },
    { title: 'Introduction to Algorithms', author: 'Thomas H. Cormen', genreId: technology.id },
    { title: 'Code', author: 'Charles Petzold', genreId: technology.id },

    { title: 'Sapiens', author: 'Yuval Noah Harari', genreId: history.id },
    { title: 'Guns, Germs, and Steel', author: 'Jared Diamond', genreId: history.id },
    { title: 'The Silk Roads', author: 'Peter Frankopan', genreId: history.id },
    { title: 'The History of the Ancient World', author: 'Susan Wise Bauer', genreId: history.id },
  ];

  for (const book of books) {
  const existingBook = await prisma.book.findFirst({
    where: { title: book.title },
  });

  if (!existingBook) {
    await prisma.book.create({
      data: book,
    });
  }
}

  console.log('Database seeded successfully!');
  console.log('Created 4 genres and 16 books.');
}

main()
  .catch((error) => {
    console.error('Error seeding database:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });