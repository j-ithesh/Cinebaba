const express = require('express')
const router = express.Router()
const Screen = require('../models/screen')
const Show = require('../models/show')


router.get('/', async (req, res, next) => {
    try{
      const shows = await Show.find({});
       res.status(200).json(shows)
    }
    catch(error){
      res.status(500).send('Error occured')
    }
  }),

  router.get('/:showId', async (req, res, next) => {
    try{
      const show = await Show.findById(req.params.showId).populate('screen');
       res.status(200).json(show)
    }
    catch(error){
      res.status(500).send('Error occured')
    }
  }),

router.post('/', async (req, res, next) => {
    try{
     const show = new Show(req.body)
     await show.save()
     res.status(201).json(show)
    }
    catch(error){
      res.status(500).send('Error occured')
    }
  }),
  router.delete('/:showId',async (req, res, next) => {
    try{
      await Show.findByIdAndDelete(req.params.showId)
      res.status(204).send("deleted")

    }
    catch(error){
      res.status(404).send('show of req Id not found')
    }
  })
  

module.exports = router