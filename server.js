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
    if (clientid == "CBJCHBCAABAAeWAPme8oFbAPZTqb9W15dXkExVU9Qr7l") 
    {
        var responseBody = {
                        "xAdobeSignClientId" : clientid // Return Client Id in the body
        };
        //res.headers['Content-Type'] = 'application/json';
        res.body = responseBody;
        res.status = 200;
        console.log(JSON.stringify(responseBody));
       // res.send(`Received with clientId: ${clientid}`);

        const event = req.body.event;
        if (event && event.eventType === 'AGREEMENT_ACTION_COMPLETED') {
            const agreement = event.agreement;
            console.log(`Agreement ID: ${agreement.id}`);
            console.log(`Agreement Name: ${agreement.name}`);
            console.log(`Status: ${agreement.status}`);
            console.log('Participants:');
            
            // You can add more logic here to handle the event,
            // such as sending a notification, updating a database, etc.
        } else {
            console.log('Received non-signature event or unknown event type.');
        }

        // Respond to Adobe Sign to acknowledge receipt of the webhook
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