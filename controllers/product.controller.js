const Product = require('../models/product.model');

const createProduct =  async (req, res) => {
    try {
      const { productName,  description, price , quantity} = req.body;
      if(!productName || !description || !price || !quantity){
        return res.send("All Field Are Required........").status(304);
      }else{

        const product =  Product.build({ productName, description, price , quantity });
        const newProduct = product.save();
        if(!newProduct){
         return res.send("invalid product......");
        }else{
          return res.status(201).json(newProduct);
        }
        


      }
      
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  
  const getProducts =  async (req, res) => {
    try {
      const products = await Product.findAll();
      if(!products){
        return res.send("Products not Founde.....").status(404);
      }else{
        return res.status(201).json(products);
      }
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  
  const getProductById =  async (req, res) => {
    try {
      const productId = req.params.id;
      const product = await Product.findByPk(productId);
      if (!product) {
        res.status(404).json({ error: 'Product not found' });
      } else {
        res.json(product);
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  
  // const Updateproduct =  async (req, res) => {
  //   try {
  //     const productId = req.params.id;
  //     const { productName, description, price , quantity } = req.body;
  
  //     const product = await Product.findByPk(productId);
  
  //     if (!product) {
  //       res.status(404).json({ error: 'Product not found' });
  //     } else {
  //       product.name = name;
  //       product.description = description;
  //       product.price = price;
  //       product.quantity = quantity;
  
  //       await product.save();
  
  //       res.json(product);
  //     }
  //   } catch (error) {
  //     res.status(500).json({ error: 'Internal Server Error' });
  //   }
  // };

  const Updateproduct = async (req, res) => {
    try {
      const { productName, description, price , quantity } = req.body;
      const { id } = req.params;
  
      // Basic validation
  
      const updatedRows = await Product.update(
        { productName, description, price , quantity },
        { where: { id } }
      );
  
      if (updatedRows[0] > 0) {

        
        return res.status(200).json({ message: 'Product updated successfully.' });
      } else {
        return res.status(404).json({ error: 'Product not found.' });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  
  const Deleteproduct =  async (req, res) => {
    try {
      const productId = req.params.id;
      const product = await Product.findByPk(productId);
  
      if (!product) {
        res.status(404).json({ error: 'Product not found' });
      } else {
        const delproduct = await product.destroy();
        res.send(delproduct).status(201);
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };


  module.exports = {
    createProduct,
    getProducts,
    getProductById,
    Updateproduct,
    Deleteproduct
  }