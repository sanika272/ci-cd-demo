// webhook-server.js
const express = require('express');
const bodyParser = require('body-parser');
const { exec } = require('child_process');

const app = express();
app.use(bodyParser.json());

// This is the endpoint GitHub will call
app.post('/deploy', (req, res) => {
    console.log('Webhook received! Deploying...');
    
    // Run deployment commands
    exec('git pull origin main && npm install', (err, stdout, stderr) => {
        if (err) {
            console.error(stderr);
            return res.status(500).send('Deployment failed!');
        }
        console.log(stdout);
        res.send('Deployment successful!');
    });
});

app.listen(3000, () => console.log('Server running on port 3000'));