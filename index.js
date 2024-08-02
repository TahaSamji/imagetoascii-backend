const express = require('express');
const app = express();
const cors = require("cors");
var asciify = require('asciify-image');
var ansiHTML = require('ansi-html');

var Convert = require('ansi-to-html');

var convert = new Convert();


console.log(convert.toHtml('\x1b[30mblack\x1b[37mwhite'));
const port = 8000

var options = {
    color: true,
    fit: 'box',
    width: 100,
    height: 100
}



const corsOptions = {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"]
}

app.use(cors(corsOptions));
app.use(express.json());


app.get('/', (req, res) => {
    try {
        asciify('tmp/person.webp', options, function (err, asciified) {
            if (err) throw err;

            // Print to console
            // console.log(asciified);
            // const tag = convert.toHtml(asciified)
            const tag = ansiHTML(asciified)
            
           
            return res.send(tag);
        });

    } catch (error) {

        console.error(error);
    }
});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})