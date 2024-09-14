const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3000;

const API_KEY = 'AIzaSyCKEQcVMo1-s1u8R-HaEN6mKwhm_Cz6MzQ'; // Sostituisci con la tua chiave API
const CHANNEL_ID = 'UC9rMiEjNaCSsebs31MRDCRA'; // Sostituisci con l'ID del tuo canale

app.get('/recent-videos', async (req, res) => {
    try {
        const response = await axios.get(`https://www.googleapis.com/youtube/v3/search`, {
            params: {
                key: API_KEY,
                channelId: CHANNEL_ID,
                part: 'snippet,id',
                order: 'date',
                maxResults: 10
            }
        });

        const videos = response.data.items.map(item => {
            const title = item.snippet.title;
            const link = `https://www.youtube.com/watch?v=${item.id.videoId}`;
            const thumbnail = item.snippet.thumbnails.medium.url;
            const category = item.snippet.title.toLowerCase().includes('short') ? 'shorts' :
                             item.snippet.title.toLowerCase().includes('live') ? 'live' :
                             'normal';

            return {
                title,
                link,
                thumbnail,
                category
            };
        });

        res.json(videos);
    } catch (error) {
        console.error('Errore nel recupero dei video:', error);
        res.status(500).send('Errore nel recupero dei video');
    }
});

app.listen(PORT, () => {
    console.log(`Server in ascolto su http://localhost:${PORT}`);
});