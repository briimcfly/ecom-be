const router = require('express').Router();
const sequelize = require('sequelize');
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

//get all tags 
router.get('/', async (req, res) => {
try {
  const tagData = await Tag.findAll({
    include : [{model: Product}]
  })
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
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{model: Product}]
    });
    
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
    const newTag = await Tag.create(req.body);
    let responseData = newTag;
    // if there's related products, we need to create pairings to bulk create in the ProductTag model
    if (req.body.product_id && req.body.product_id.length) {
      const productTagArr = req.body.product_id.map(product_id => {
        return {
          tag_id: newTag.id,
          product_id,
        }
      });
      await ProductTag.bulkCreate(productTagArr);
      //update responseData to be productTags
      responseData = productTagArr;
    }
    //If No Products:
    res.status(200).json(responseData)
  } catch (err) {
    res.status(500).json(err)
  }
});

//update tag name by id
router.put('/:id', async (req, res) => {
 try {
  const tagData = await Tag.update(req.body, {
    where: {
      id: req.params.id
    }
  })

  // No Tag Data 
  if (!tagData) {
    res.status(404).json({message: "No Tag found with that ID "})
  }

  //success 
  res.status(200).json(tagData);
 } catch (err) {
  res.status(500).json(err)
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
