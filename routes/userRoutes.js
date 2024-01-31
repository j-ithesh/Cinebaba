const express = require('express')
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const router = express.Router()
const User = require('../models/user')

router.post('/signup', async (req, res, next) => {
    try{
      const hash = bcrypt.hashSync(req.body.password, saltRounds);
      const user = new User({
        ...req.body,
        password: hash
      })
      await user.save()
      res.status(201).json(user)
    }
    catch(error){
      res.status(500).send('Error occured')
    }
  })
  router.post('/login', async (req, res, next) => {
    try{
     const user = await User.find({email: req.body.email})
     if(user.length === 0){
        res.status(404).send("user with given username not found")
     }
    const result =  bcrypt.compareSync(req.body.password, user[0].password); 
    const token = jwt.sign({email: user.email}, process.env.JWT_SECRET)
    res.cookie('token',token, {
      httpOnly: true
      
    })
    res.status(200).json(token)
    }
    catch(error){
      res.status(500).send('Error occured')
    }
  })
  

module.exports = router