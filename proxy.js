const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();

app.use(cors());

app.use('/api/reddit', async(req, res) => {
    try {
        const url = `https://www.reddit.com${req.url}`;
        const response = await axios.get(url);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({error: 'Error fetching data from Reddit API'});
    }
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Proxy server is running on http://localhost:${PORT}`);
});