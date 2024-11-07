const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, '../client/build')))

let token = null;
let tokenExpiry = null;

app.use(bodyParser.json());


// Function to get a new token
const fetchToken = async () => {
    const apiKey = 'xzzFGrGxeaLXvDak7zcr5-OtEZ-A1kTZ8S2ZPKMm7mt4'; // Use your actual API key here
    const url = 'https://iam.cloud.ibm.com/identity/token';
    const params = new URLSearchParams();
    params.append('grant_type', 'urn:ibm:params:oauth:grant-type:apikey');
    params.append('apikey', apiKey);

    try {
        const response = await axios.post(url, params, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        token = response.data.access_token;
        tokenExpiry = Date.now() + response.data.expires_in * 1000; // Set expiry time
    } catch (error) {
        console.error('Error fetching token:', error);
        throw error;
    }
};

// Middleware to ensure valid token
const ensureToken = async (req, res, next) => {
    if (!token || Date.now() >= tokenExpiry) {
        await fetchToken();
    }
    next();
};

// Route to handle text generation
app.post('/api/generate', ensureToken, async (req, res) => {
    const { input, model_id } = req.body;
    const apiUrl = 'https://eu-de.ml.cloud.ibm.com/ml/v1/text/generation?version=2023-05-29';

    try {
        const response = await axios.post(
            apiUrl,
            {
                input: input.trim(), // Directly use the trimmed input
                model_id,
                parameters: { max_new_tokens: 1024, time_limit: 3000 },
                project_id: '19daba88-21b1-4bd6-b00b-4bb05a9a81f1',
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        // Extract the generated text directly from the response
        const generatedText = response.data.results[0].generated_text.trim();

        // Return the generated text only
        res.json({ generated_text: generatedText });
        
    } catch (error) {
        console.error('Error generating text:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Failed to generate text' });
    }
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/../client/build/index.html'))
})

app.listen(port, () => console.log(`Server running on port ${port}`));
