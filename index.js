const express = require('express');
const app = express();
const cors = require("cors");
var asciify = require('asciify-image');
const fileUpload = require("express-fileupload");
var Convert = require('ansi-to-html');


const port = 8000



const corsOptions = {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"]
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(fileUpload());


app.post('/AcscifywithColor', (req, res) => {
    try {
        
        if (!req.files || !req.files.uploadFile) {
            return res.status(404).json({ msg: 'No file uploaded' });
        }
    
        const myimage = req.files.uploadFile;
        let options = {
            color: true,
            fit:'width',
            width:100,
            height:100
          }
       

        myimage.mv('/tmp/picture.png',  function (err) {
            if (err) {
                console.log(err);
                return res.status(500).send(err);
            }
            asciify('/tmp/picture.png', options, function (err, asciified) {
                if (err) throw err;
                var convert = new Convert();
                const html = convert.toHtml(asciified)
            
                return res.json({html:html,text:asciified});
            });
        }
        );

       
    
    } catch (error) {
        console.error(error);
    }
});
app.post('/AcscifywithoutColor', (req, res) => {
    try {
        
        if (!req.files || !req.files.uploadFile) {
            return res.status(404).json({ msg: 'No file uploaded' });
        }
    
        const myimage = req.files.uploadFile;
      let options = {
        color: false,
        fit:'original',
        width:10,
        height:10
      }
       

        myimage.mv('/tmp/picture.png',  function (err) {
            if (err) {
                console.log(err);
                return res.status(500).send(err);
            }
            asciify('/tmp/picture.png', options, function (err, asciified) {
                if (err) throw err;
                var convert = new Convert();
                const html = convert.toHtml(asciified)
                return res.json({html:html,text:asciified});
            });
        }
        );

       
    
    } catch (error) {
        console.error(error);
    }
});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})