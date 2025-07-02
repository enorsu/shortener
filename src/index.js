const express = require('express')
const fs = require('fs')
const ejs = require("ejs")
const editJsonFile = require("edit-json-file")

const app = express()
const port = 80
const data = "./data/shortened.json"
const index = "/shortener/"

app.set('view engine', 'ejs');
app.use(express.static("./public"))
app.use(express.urlencoded({
    extended: true
})) 

function isValidUrl(string) {
  try {
    new URL(string);
    return string
  } catch (err) {
    try {
        string = "https://" + string
        new URL(string)
        return string
    } catch(err) {
        return false
    }

    return false
  }
}

const generateRandomString = (myLength) => {
  const chars =
    "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz1234567890";
  const randomArray = Array.from(
    { length: myLength },
    (v, k) => chars[Math.floor(Math.random() * chars.length)]
  );

  const randomString = randomArray.join("");
  return randomString;
};

function addNewUrl(url) {
    let file = editJsonFile(`./data/shortened.json`);
    let randomshort = generateRandomString(4)

    

    file.append(randomshort, url)
    file.save()
    return randomshort
    

}

function getShortened(string) {
    let file = editJsonFile(data)
    try {
        let url = file.get(string)
        return {
            "exists": true,
            "url": url
        }
    } catch(err) {
        
        return {
            "exists": false
        }
    }

}

app.get("/", (req, res) => {
    return res.redirect(index)
})

app.get('/:short', (req, res) => {
    
    if (req.params.short) {
        let check = getShortened(req.params.short)
        if (check.url == undefined) {
            return res.redirect("/404/")
        } else {
            
            return res.redirect(check.url)
        }

    } else {
            return res.redirect(index)
        }
    }
)

app.post('/shortener/newurl', (req, res) => {
    const url = req.body.url
    let validate = isValidUrl(url)
    if (validate) {
        const short = addNewUrl(validate)
        
        return res.render("valid", { "url": short })

    } else {
        return res.redirect("/shortener/invalid/")
    }
})

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})


