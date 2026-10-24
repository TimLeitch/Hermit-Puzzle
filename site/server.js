const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve game files
app.use('/games', express.static(path.join(__dirname, 'games')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/play/hermit-puzzle', (req, res) => {
    res.sendFile(path.join(__dirname, 'games', 'hermit-puzzle', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Hermit Puzzle server running at http://localhost:${PORT}`);
    console.log(`Play the game at http://localhost:${PORT}/play/hermit-puzzle`);
});
