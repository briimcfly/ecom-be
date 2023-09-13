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
    tag_name: req.body.tag_name,
    productIds: req.body.productIds
  },
  {
    where: {
      id: req.params.id
    }
  });

  // No ID Found
  if (!tagData) {
    res.status(404).json({message: "No Tag found with that ID"})
  }

  if (req.body.productIds && req.body.productIds.length) { 
  const productTags = await ProductTag.findAll({ where: { tag_id: req.params.id } 
  });

  //create filtered list of new product_ids
  const productTagIds = productTags.map(({product_id})=> product_id);
  const newProductTags = req.body.productIds
  .filter((product_id) => !productTagIds.includes(product_id))
  .map((product_id)=> {
    return {
      tag_id: req.params.id,
      product_id,
    }
  });

        //figure out which ones to remove 
        const productTagsToRemove = productTags
        .filter(({product_id}) => !req.body.productIds.includes(product_id))
        .map(({id}) => id);
        
        //run both actions
        return Promise.all([
          ProductTag.destroy({where: {id: productTagsToRemove}}),
          ProductTag.bulkCreate(newProductTags),
        ]) 
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
