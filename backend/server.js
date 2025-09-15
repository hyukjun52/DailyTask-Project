import express from "express";
import mysql2 from "mysql2";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// MySQL 연결
const db = mysql2.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

db.connect(err => {
  if (err) {
    console.error("MySQL 연결 실패:", err);
    return;
  }
  console.log("MySQL 연결 성공");
});

// ----------------- ToDo API ----------------- //

// GET 모든 ToDo
app.get("/api/todos", (req, res) => {
  db.query("SELECT * FROM todos ORDER BY created_at DESC", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// POST 새 ToDo
app.post("/api/todos", (req, res) => {
  console.log("POST /api/todos body:", req.body);
  const { title } = req.body;
  if (!title) return res.status(400).json({ error: "title 필요" });

  db.query("INSERT INTO todos (title) VALUES (?)", [title], (err, result) => {
    if (err) {
      console.error("DB INSERT ERROR:", err);
      return res.status(500).json({ error: err.message });
    }
    res.json({ id: result.insertId, title, is_done: false });
  });
});

// PUT ToDo 완료/수정
app.put("/api/todos/:id", (req, res) => {
  const { id } = req.params;
  const { is_done } = req.body;

  db.query("UPDATE todos SET is_done = ? WHERE id = ?", [is_done, id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true });
  });
});

// DELETE ToDo
app.delete("/api/todos/:id", (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM todos WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true });
  });
});

// 서버 실행
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 서버 실행: http://localhost:${PORT}`));


// ----------------- Memo API ----------------- //

// GET 모든 메모
app.get("/api/memos", (req, res) => {
  db.query("SELECT * FROM memos ORDER BY created_at DESC", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// POST 새 메모
app.post("/api/memos", (req, res) => {
  const { content } = req.body;
  if (!content) return res.status(400).json({ error: "content 필요" });

  db.query("INSERT INTO memos (content) VALUES (?)", [content], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: result.insertId, content });
  });
});

// DELETE 메모
app.delete("/api/memos/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM memos WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true });
  });
});
