const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');
const { destroy } = require('../../models/Category');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  const tags = await Tag.findAll({
    include: [
      {
        model: Product,
        through: ProductTag,
        as: 'product_id',
      }
    ]
  });
  // find all tags
 
  res.json(tags)
});

router.get('/:id', async (req, res) => {
  const tagId = await Tag.findByPk(req.params.id, {
    include: [
      {
        model: Product,
        through: ProductTag,
        as: 'product_id',
      }
    ]
  })
  // find a single tag by its `id`
 
  res.json(tagId)
});

router.post('/', async (req, res) => {
  const newTag = await Tag.create({
    ...req.body
  });
  // create a new tag
  res.json(newTag)
});

router.put('/:id', async (req, res) => {
  const updateTag = await Tag.update(
    {
      tag_name: req.body.tag_name
    },
    {
      where: {
        id: req.params.id
      },
    });
  // update a tag's name by its `id` value
  res.json(updateTag)
});

router.delete('/:id', async (req, res) => {
  const destroyTag = await Tag.destroy({
    where: {
      id: req.params.id
    }
  })
  // delete on tag by its `id` value
  res.json(destroyTag)
});

module.exports = router;
