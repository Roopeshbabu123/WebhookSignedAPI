const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 8443;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

app.get('/webhook', (req, res) => {    
    const adobeSignClientId = req.headers['x-adobesign-clientid'];
    res.setHeader('x-adobesign-clientid',adobeSignClientId);    
    res.send(`GET request received with clientId: ${adobeSignClientId}`);
    console.log('x-adobesign-clientid:', adobeSignClientId);
});

// Webhook endpoint to receive Adobe Sign notifications
app.post('/webhook', (req, res) => {
    var clientid = req.headers['x-adobesign-clientid'];
    if (clientid == "CBJCHBCAABAAeWAPme8oFbAPZTqb9W15dXkExVU9Qr7l" || clientid == "UQXJXD753B") 
    {
        var responseBody = 
        {
                        "xAdobeSignClientId" : clientid // Return Client Id in the body
        };
        res.body = responseBody;
        res.status = 200;

        const reqbody = req.body;
        console.log('"Request data:":',req.body);   
        if(reqbody){
            console.log('"Webhook Id:":',req.body.webhookId);   
            console.log('"Webhook URL:":',req.body.webhookUrlInfo); 
            const agreement = reqbody.agreement;
            console.log(`Agreement ID: ${agreement.id}`);
            console.log(`Agreement Name: ${agreement.name}`);
            console.log(`Status: ${agreement.status}`);
        }       
        res.send('Webhook received successfully');
        }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get("/", (req, res) => {
    res.status(200).send("Home Page");
})