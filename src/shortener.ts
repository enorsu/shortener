
import express = require("express")
import editJsonFile = require("edit-json-file")
const router = express.Router()

const data = "./data/shortened.json"
const index = "/shortener/"

function getAllLinks() {
    let file = editJsonFile(data)
    return file.get()
}

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

    

    file.routerend(randomshort, url)
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

router.get("/shortener/list", (req, res) => {
    return res.render("list", {
        "list": getAllLinks()
    })
})

router.get('/:short', (req, res) => {
    
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

router.post('/shortener/newurl', (req, res) => {
    const url = req.body.url
    let validate = isValidUrl(url)
    if (validate) {
        const short = addNewUrl(validate)
        
        return res.render("valid", { "url": short })

    } else {
        return res.redirect("/shortener/invalid/")
    }
})

module.exports = router