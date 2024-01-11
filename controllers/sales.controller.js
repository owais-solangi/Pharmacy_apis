const Sale = require('../models/sales.model');
const Product = require('../models/product.model');
const createSale = async (req, res) => {
    try {
      const { productName, quantity, price } = req.body;
      // Validate inputs
      if (!productName || !quantity || !price) {
        return res.status(400).json({ error: 'All fields are required' });
      }else{
        
        const product = await Product.findOne({where:{productName}});
        if(product){
          const sale = await Sale.create({
            productName,
            quantity,
            price,
            ProductId: product.id
          });
          return res.status(201).send(sale);
          
        }else{
          throw new Error("Product not found....")
        }
      }
      
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  const getAllSales = async (req, res) => {
    try {
      const allSales = await Sale.findAll();
      res.status(200).json(allSales);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };


  const updateSale = async (req, res) => {
    try {
      const saleId  = req.params.id;
      const { productName, quantity, price } = req.body;
  
      // Validate inputs
      if (!productName || !quantity || !price) {
        return res.status(400).json({ error: 'All fields are required' });
      }
  
      const updatedSale = await Sale.update(
        { productName, quantity, price },
        { where: { id: saleId } }
      );
  
      if (updatedSale[0] === 1) {
        res.status(200).json({ message: 'Sale updated successfully' });
      } else {
        res.status(404).json({ error: 'Sale not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  const deleteSale = async (req, res) => {
    try {
      const  saleId  = req.params.id;
  
      const deletedRows = await Sale.destroy({ where: { id: saleId } });
  
      if (deletedRows === 1) {
        res.status(200).json({ message: 'Sale deleted successfully' });
      } else {
        res.status(404).json({ error: 'Sale not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  module.exports = {
    createSale,
    getAllSales,
    updateSale,
    deleteSale,
  }
  