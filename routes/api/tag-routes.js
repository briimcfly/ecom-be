const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

//get all tags 
router.get('/', async (req, res) => {
try {
  const tagData = await Tag.findAll()
  //success
  res.status(200).json(tagData);
}catch(err){
  //error handling
  res.status(500).json(err);
}
});

//get single tag by id
router.get('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id);
    
    //No ID can be found 
    if (!tagData) {
      res.status(404).json({message: "No Tag found with that ID"});
      return
    }
    //success
    res.status(200).json(tagData);
  } catch (err){
    //error handling 
    res.status(500).json(err)
  }
});

//create new tag 
router.post('/', async(req, res) => {
  try {
    const newTag = await Tag.create(req.body)
    //success
    res.status(200).json(newTag)
  } catch (err) {
    res.status(500).json(err)
  }
});

//update tag name by id
router.put('/:id', async (req, res) => {
  try {
  const tagData = await Tag.update({
    tag_name: req.body.tag_name
  },
  {
    where: {
      id: req.params.id
    }
  })

  // No ID Found
  if (!tagData) {
    res.status(404).json({message: "No Tag found with that ID"})
  }
  //success
  res.status(200).json(tagData);
  }catch (err) {
    //error handling
    res.status(500).json(err);
  }
});

//delete single tag by id
router.delete('/:id', async(req, res) => {
  try {
  const tagData = await Tag.destroy({
    where: {
      id: req.params.id
    }
  })
  // No ID Found
  if (!tagData) {
    res.status(404).json({message: "No Tag found with that ID"})
  }
  //success
  res.status(200).json(tagData);
  }catch(err) {
    //error handling 
    res.status(500).json(err)
  }
});

module.exports = router;
