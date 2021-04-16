const express = require('express');
const SSEChannel = require('sse-pubsub');
const cors = require('cors');

const app = express();
const channel = new SSEChannel({
    maxStreamDuration: 120000    
});

app.use(cors({origin: '*'}));

var port = process.env.PORT || 5000;
 
app.get('/stream', (req, res) => { 
    console.log("subscribing stream of data")
    channel.subscribe(req, res); 
});

app.get('/send', (req, res) => {
    console.log("sending '" + req.query.message + "' to " + req.query.event);
    channel.publish(req.query.message, req.query.event);
    res.statusCode = 200;
    res.end();
});
 
app.listen(port);