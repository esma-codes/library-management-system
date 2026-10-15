import express from "express";
import { db } from "./prisma/db.ts";

const app = express();

const PORT = 3001;

// Gelen JSON verilerini okuyabilmemizi sağlar.
app.use(express.json());


// Ana test endpoint'i
app.get("/", (req, res) => {
    res.json({
        message: "Library API is running"
    });
});


// Database bağlantısını test ettiğimiz endpoint
app.get("/api/test-db", async (req, res) => {
    try {
        const user = await db.orm.public.User
            .where({ email: "esma@example.com" })
            .first();

        res.json({
            database: "connected",
            userFound: Boolean(user)
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            database: "connection failed"
        });
    }
});


// Bütün kitapları getir
app.get("/api/books", async (req, res) => {
    try {
        const books = await db.orm.public.Book.all();

        res.json(books);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Books could not be fetched"
        });
    }
});


// ID'ye göre tek bir kitabı getir
app.get("/api/books/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const book = await db.orm.public.Book
            .where({ id })
            .first();

        if (!book) {
            return res.status(404).json({
                message: "Book not found"
            });
        }

        res.json(book);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Book could not be fetched"
        });
    }
});


// Yeni kitap oluştur
app.post("/api/books", async (req, res) => {
    try {
        const { title, description } = req.body;

        if (!title) {
            return res.status(400).json({
                message: "Title is required"
            });
        }

        const book = await db.orm.public.Book.create({
            title,
            description
        });

        res.status(201).json(book);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Book could not be created"
        });
    }
});


// Server'ı başlat
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});