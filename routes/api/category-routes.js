const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

//Get All Categories
router.get('/', async(req, res) => {
 try {
  const catData = await Category.findAll({
    include: {model: Product}
  })
  res.status(200).json(catData);
 } catch (err) {
  res.status(500).json(err);
 }
});

//Get Single Category by ID 
router.get('/:id', async (req, res) => {
try {
  const catData = await Category.findByPk(req.params.id, {
  include: {model: Product}
  });

  //No ID can be found 
  if (!catData) {
    res.status(404).json({message: "No Category with that ID"})
  }

  //success
  res.status(200).json(catData);
} catch (err) {
  //error handling 
  res.status(500).json(err);
}
});

//Create a Category
router.post('/', async(req, res) => {
try{
 const catData = await Category.create(req.body);
 res.status(200).json(catData);
}catch(err){
  //error handling
  res.status(500).json(err)
}
});

//Update a Category
router.put('/:id', async (req, res) => {
 try {
 const catData = await Category.update(req.body, {
  where: {
    id: req.params.id
  }
 })

 //No ID Found 
 if (!catData) {
  res.status(404).json({message: "No Category found with that ID"})
 }

 res.status(200).json(catData);

 } catch(err){
  res.status(500).json(err)
 }
});


//Delete a Category
router.delete('/:id', async (req, res) => {
 try {
 const catData = await Category.destroy({
  where: {
    id: req.params.id
  }
 });

 //If no ID can be found 
 if (!catData) {
  res.status(404).json({message: "No Category found with that ID"})
 }

 res.status(200).json(catData);
 } catch (err) {
  res.status(500).json(err);
 }
});

module.exports = router;
