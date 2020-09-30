const express = require('express')
const { v4: uuid } = require('uuid')
//const logger = require('../logger')
const { bookmarks } = require('../store')

const bookmarkRouter = express.Router()
const bodyParser = express.json()

bookmarkRouter
    .route('/bookmarks')
    .get((req, res) => {
        res.json(bookmarks)
    })
    .post(bodyParser, (req, res) => {
        const { title, url, description, rating } = req.body

        if (!title) {
            //logger.error(`Title is required`);
            return res
                .status(400)
                .send('Invalid data')
        }

        if (!url) {
            //logger.error(`URL is required`);
            return res
                .status(400)
                .send('Invalid data')
        }

        if(!description) {
            //logger.error(`Decsription is required`)
            return res
                .status(400)
                .send(`Invalid data`)
        }
        if(!rating) {
            //logger.error(`Rating is required`)
            return res
                .status(400)
                .send(`Invalid data`)
        }

        const id = uuid()

        const bookmark = {
            id,
            title,
            url,
            description,
            rating
        };

        bookmarks.push(bookmark)

        //logger.info(`Card with id ${id} created!`);

        res
            .status(201)
            .location(`https://localhost:8000/bookmark/${id}`)
            .json(bookmark);
    })

bookmarkRouter
    .route('/bookmarks/:bookmark_id')
    .get((req, res) => {
        const { bookmark_id } = req.params

        const bookmark = bookmarks.find(c => c.id == bookmark_id)

        // make sure we find a bookmark
        if (!bookmark) {
            //logger.error(`Card with id ${id} not found.`)
            return res
                .status(404)
                .send(`404: Bookmark Not Found`)
        }

        res.json(bookmark);
    })
    .delete((req, res) => {
       const { bookmark_id } = req.params

       const bookmarkIndex = bookmarks.findIndex(b => b.id === bookmark_id)

        console.log(bookmarkIndex)

       if ( bookmarkIndex === -1) {
           //logger.error(`Bookmark with id ${id} not found`);
           return res
            .status(404)
            .send("Bookmark Not Found")
       }

       bookmarks.splice(bookmarkIndex, 1)

       //logger.info(`bookmark with id ${id} deleted.`)
       res
        .status(204)
        .end()
    })

module.exports = bookmarkRouter