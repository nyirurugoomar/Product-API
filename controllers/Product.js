const Product = require("../model/Product.js");


//get
const getProduct = (req, res) => {
    Product.find()
      .then((products) => {
        res.json(products);
      })
      .catch((error) => {
        res.status(500).json({ error: error.message });
      });
  };
  

//create
const createProduct = async (req, res) => {
    const { productTitle, description, price, image, rate } = req.body;

if (!productTitle || !description || !price || !image || rate === undefined) {
    return res.status(400).json({ error: "Missing or invalid fields in the request body." });
}


    try {
        const product = new Product({
            productTitle,
            description,
            price,
            image,
            rate,
        });

        const savedProduct = await product.save();
        res.json(savedProduct);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//put

const updateProduct = (req, res) => {
    Product.findOneAndUpdate(
      { _id: req.params.productID },
      {
        $set: {
          productTitle: req.body.productTitle,
          description: req.body.description,
          price: req.body.price,
          image: req.body.image,
          rate :req.body.rate,
        },
      },
      { new: true }
    )
      .then((updatedProduct) => {
        if (!updatedProduct) {
          return res.status(404).json({ error: "Product not found" });
        }
        res.json(updatedProduct);
      })
      .catch((error) => {
        res.status(500).json({ error: error.message });
      });
  };

  //delete

  const deleteProduct = (req, res) => {
    Product.deleteOne({ _id: req.params.productID })
      .then((result) => {
        if (result.deletedCount === 0) {
          return res.status(404).json({ error: "Product not found" });
        }
        res.json({ message: "Product Deleted" });
      })
      .catch((error) => {
        res.status(500).json({ error: error.message });
      });
  };

module.exports = {
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
};
