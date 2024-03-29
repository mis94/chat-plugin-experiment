const express = require('express');
const cors = require('cors');
const todoRouter = require('./routes/todos');
const openaiRoutes = require('./routes/openai');

const app = express();
const PORT = 3000;

// Setting CORS to allow chat.openapi.com is required for ChatGPT to access your plugin
app.use(cors({ origin: [`http://localhost:${PORT}`, 'https://chat.openai.com'] }));
app.use(express.json());

// Simple request logging to see if your plugin is being called by ChatGPT
app.use((req, res, next) => {
    console.log(`Request received: ${req.method}: ${req.path}`)
    next()
})

// OpenAI Required Routes
app.use(openaiRoutes);

// The dummy todos API
app.use('/todos', todoRouter);

app.get('/hello-world', (req, res) => {
    res.send('Hello World!');
});

app.listen(PORT, () => {
    console.log(`Plugin server listening on port ${PORT}`);
});
