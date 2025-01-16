const express = require("express");
const Menu = require('../models/model.menu.js')

const router = express.Router(); 

router.get('/', async(req, res)=>{
  try{
    const menuItem = await Menu.find(); 
    res.json(menuItem); 
  }catch(error){
    res.status(500).send(error.message)
  }
})


router.post('/', async(req, res)=>{
  try{
    const {name, category, price, availability} = req.body; 
    const menuItem = new Menu({name, category, price, availability}); 
    await menuItem.save(); 
    res.status(201).json(menuItem); 
  }catch(error){
    res.status(500).send(error.message)
  }
})

router.put('/:id', async(req, res)=>{
  try{
    const menuItem = await Menu.findByIdAndUpdate(req.params.id, req.body, {new: true}); 
    if(!menuItem) return res.status(404).send('Menu item not found'); 
    res.json(menuItem); 
  }catch(error){
    res.status(400).send(error.message)
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const menuItem = await Menu.findByIdAndDelete(req.params.id);
    if (!menuItem) return res.status(404).send('Menu item not found');
    res.send("Menu item deleted");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;