const express = require('express');
const cors = require('cors');

const app = express();

// Habilita CORS para permitir requisições do frontend
app.use(cors());

// Permite interpretar JSON no corpo das requisições
app.use(express.json());

// Simula uma "base de dados" em memória
let posts = [
  { id: 1, user: "John Doe", message: "Hello from the backend!" }
];

// Rota para obter todos os posts
app.get('/posts', (req, res) => {
  res.json(posts);
});

// Rota para adicionar um novo post
app.post('/posts', (req, res) => {
  const { message, user } = req.body;
  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }
  const newPost = { id: posts.length + 1, user: user || "John Doe", message };
  posts.push(newPost);
  res.status(201).json(newPost);
});

// Inicia o servidor na porta 5000 
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  
    fetch(`http://localhost:${PORT}/posts`)
      .then(() => console.log("Warm-up request concluída"))
      .catch(err => console.error("Warm-up request falhou:", err));
  });
  