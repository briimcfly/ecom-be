const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

//get all tags 
router.get('/', async (req, res) => {
try {
  const tagData = await Tag.findAll()
  res.status(200).json(tagData);
}catch(err){
  //error handling
  res.status(500).json(err);
}
});

//get single tag by id
router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
});


//create new tag 
router.post('/', (req, res) => {
  // create a new tag
});

//update tag name by id
router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
});

//delete single tag by id
router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
