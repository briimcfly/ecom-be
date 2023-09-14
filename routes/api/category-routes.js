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

router.put('/:id', (req, res) => {
 try {

 } catch(err){
  res.status(500).json(err)
 }
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
