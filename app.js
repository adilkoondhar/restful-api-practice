const express = require('express')
const app = express()

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: true}))

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/wikiDB')

const Article = mongoose.model('Article', {title: String, content: String})

app.route('/articles')
.get((req, res) => {
    Article.find({}).then(results => {
        res.send(results)
    }).catch(err => {
        res.send(err)
    })
})
.post((req, res) => {
    const newArticle = new Article(req.body)
    newArticle.save().then(() => {
        res.send('New article saved')
    }).catch(err => {
        res.send(err)
    })
})
.delete((req, res) => {
    Article.deleteMany({}).then(() => {
        res.send('Deleted all the articles')
    }).catch(err => {
        res.send(err)
    })
})

app.route('/articles/:article')
.get((req, res) => {
    Article.findOne({title: req.params.article}).then(results => {
        res.send(results)
    }).catch(err => {
        res.send(err)
    })
})
.put((req, res) => {
    Article.findOneAndReplace({title: req.params.article}, req.body).then(() => {
        res.send('Article updated')
    }).catch(err => {
        res.send(err)
    })
})
.patch((req, res) => {
    Article.updateOne({title: req.params.article}, {$set: req.body}).then(() => {
        res.send('Article updated')
    }).catch(err => {
        res.send(err)
    })
})
.delete((req, res) => {
    Article.deleteOne({title: req.params.article}).then(() => {
        res.send('Articled deleted')
    }).catch(err => {
        res.send(err)
    })
})

app.listen('3000')