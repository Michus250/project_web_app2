const express = require('express');
const router = express.Router();
const { User } = require("../models/user")

router.get('/showAll', async (req, res) => {
    getAllUsers().then(users=>{
        res.json({ data: users });
    })
        
})

const getAllUsers = async () => {
    try {
      const users = await User.find({}, 'firstName lastName email role phone personalId address dateOfBirth');
      return users;
    } catch (error) {
      console.error('Błąd podczas pobierania użytkowników:', error);
      throw error;
    }
  };
module.exports = router;
