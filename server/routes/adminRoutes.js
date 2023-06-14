const express = require('express');
const router = express.Router();
const { User } = require("../models/user")

router.get('/showAll', async (req, res) => {
    getAllUsers().then(users=>{
        res.json({ data: users });
    })
        
})
router.get('/createEmployee', async (req, res) => {
  getAllUsers().then(users=>{
      res.json({ data: users });
  })
      
});
router.put('/createEmployee', async (req, res) => {
  const userId = req.body.userId;
  const newRole = req.body.role;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Użytkownik nie został znaleziony' });
    }

    user.role = newRole;
    if (newRole === 'doctor'){
      user.workingHours = {
        Monday: { open: '09:00', close: '17:00', isWorking: true },
        Tuesday: { open: '09:00', close: '17:00', isWorking: true },
        Wednesday: { open: '09:00', close: '17:00', isWorking: true },
        Thursday: { open: '09:00', close: '17:00', isWorking: true },
        Friday: { open: '09:00', close: '17:00', isWorking: true },
        Saturday: { open: '09:00', close: '14:00', isWorking: true },
        Sunday: { open: '-', close: '-', isWorking: false }
      };
      
    }
    await user.save();

    return res.json({ message: 'Rola użytkownika została zaktualizowana', workingHours: user.workingHours });
  } catch (error) {
    return res.status(500).json({ message: 'Wystąpił błąd serwera' });
  }
      
});

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
