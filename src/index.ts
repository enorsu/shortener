import express = require('express');
import fs = require('fs');
import shortener = require("./shortener")

const app = express()
const port = 4000


app.set('view engine', 'ejs');
app.use(express.static("./public"))
app.use(express.urlencoded({
    extended: true
}))


app.use("/", require("./shortener"))

app.get("/", (req, res) => {
    return res.redirect("/shortener/")
})



app.listen(port, () => {
  console.log(`listening on port ${port}`)
})


