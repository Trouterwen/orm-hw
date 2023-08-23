const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// gets all products
router.get('/', async (req, res) => {
  const products = await Product.findAll({
    include: [
      {
        model: Tag,
        through: ProductTag,
        as: 'tag_id'
      },
    ]
  });
  // find all products
 
  res.json(products)
});

// get one product
router.get('/:id', async (req, res) => {
  const productId = await Product.findByPk(req.params.id, {
    include: [
      {
        model: Tag,
        through: ProductTag,
        as: 'tag_id'
      }
    ]
  });
  // find a single product by its `id`
 
  res.json(productId)
});

// create new product
router.post('/', (req, res) => {
 
  Product.create(req.body)
    .then((product) => {
     
      if (req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      // if no product tags, respond only
      res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// update product
router.put('/:id', (req, res) => {
  // update product data
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      if (req.body.tagIds && req.body.tagIds.length) {

        ProductTag.findAll({
          where: { product_id: req.params.id }
        }).then((productTags) => {
          // creates filtered list of new tag_ids
          const productTagIds = productTags.map(({ tag_id }) => tag_id);
          const newProductTags = req.body.tagIds
            .filter((tag_id) => !productTagIds.includes(tag_id))
            .map((tag_id) => {
              return {
                product_id: req.params.id,
                tag_id,
              };
            });

          // determine which ones to remove
          const productTagsToRemove = productTags
            .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
            .map(({ id }) => id);
          // run both actions
          return Promise.all([
            ProductTag.destroy({ where: { id: productTagsToRemove } }),
            ProductTag.bulkCreate(newProductTags),
          ]);
        });
      }

      return res.json(product);
    })
    .catch((err) => {
     
      res.status(400).json(err);
    });
});

router.delete('/:id', async (req, res) => {
  const destroyProduct = await Product.destroy({
    where: {
      id: req.params.id,
    },
  });
  // delete one product by its `id` value
  res.json(destroyProduct)
});

module.exports = router;
