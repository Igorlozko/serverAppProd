const express = require('express')
const router = express.Router()
const getDbClient = require('../util/database').getDbClient

let nextProductId = 0



router.get('/products', (req, res, next) => {
  const db = getDbClient();
  db.collection('products')
    .find()
    .toArray()
    .then((products) => {
      res.json(products);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.get('/getSpecificProduct', (req, res, next) => {
  const db = getDbClient();
  db.collection('products')
    .findOne({ ourId: '1' })
    .then((theProduct) => {
      res.json(theProduct); // Send JSON response
    })
    .catch((err) => {
      res.status(500).json({ error: err.message }); // Send JSON response with error message
    });
});

router.get('/addProduct', (req, res, next) => { // this add the product 
  res.send(`
    <form action="/addTheProduct" method="POST">
      <input type="text" name="title" placeholder="Product title">
      <input type="text" name="price" placeholder="Product price">
      <button type="submit">Add Product</button>
    </form>
  `);
});

router.post('/addTheProduct', (req, res, next) => {
  const db = getDbClient();
  db.collection('products')
    .insertOne({ ourId: '' + nextProductId, name: req.body.title, price: req.body.price })
    .then(() => {
      nextProductId++;
      res.redirect('/');
    })
    .catch((err) => {
      res.status(500).json({ error: err.message }); // Send JSON response with error message
    });
});

router.get('/updateProduct', (req, res, next) => {
  const db = getDbClient()
  db
  .collection('products')
  .updateOne( { ourId: '0' }, {$set: {price: '99.95'}} )
  .then(() => {
    res.redirect('/')
  })
  .catch(err => {
    res.send('Error: ' + err)
    res.redirect('/')
  })
})

router.get('/showProducts', (req, res, next)=>{
  req.send()
})

router.get('/deleteProduct', (req, res, next) => {
  const db = getDbClient()
  db
  .collection('products')
  .deleteOne( { ourId: '0' } )
  .then(() => {
    res.redirect('/')
  })
  .catch(err => {
    res.send('Error: ' + err)
  })
})

exports.routes = router
