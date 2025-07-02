import express = require('express');
import fs = require('fs');


const app = express()
const port = 80


app.set('view engine', 'ejs');
app.use(express.static("./public"))
app.use(express.urlencoded({
    extended: true
}))
app.use("/", require("./shortener"))



app.get("/", (req, res) => {
    return res.redirect("/index/")
})

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})


