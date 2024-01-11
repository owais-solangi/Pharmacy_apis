const SalesOrder = require('../models/SalesOrder.model');
const Product = require('../models/product.model');
const Sale = require("../models/sales.model");

const SalesOrders = async (req, res) => {
try {
      // const{ orderDate, customerName, productName, quantity, price } = req.body;
    const { orderDate, customerName, productName, quantity, price } = req.body;

    console.log('Request Body:', req.body); // Log the entire request body

    if (!customerName || !productName || !quantity ) {
      return res.status(401).send("Please provide values for customerName, productName, quantity, and price.");
    }

      console.log('Values:', orderDate, customerName, productName, quantity, price);
      const product = await Product.findOne({ where: { productName: productName }});
      if(!product){
       return res.status(404).send("invalid not found....");
      }
        const salesOrder = await SalesOrder.create({
          orderDate,
          customerName: customerName,
          productName: product.productName,
          quantity,
          price:product.price,
          totalAmount: quantity * product.price
        })
       
          const Sales = await Sale.create({
            productName,
            quantity,
            price:salesOrder.price,
            ProductId:product.id,
            totalAmount: salesOrder.totalAmount,
            salesOrderId: salesOrder.id
          })
          return res.status(201).send({
            SalesOrder:salesOrder,
            Sales:Sales,
            message:"Sales Order created and Sales are created...."
          })
    } catch (err) {
      console.error('Error creating sales order:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

const getSalesorder =  async (req, res) => {
    try {
      const orders = await SalesOrder.findAll();
      res.json(orders);
    } catch (err) {
      console.error('Error getting sales orders:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
}

const UpdateSaleOrder = async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      const { orderDate, customerName } = req.body;
      const order = await SalesOrder.findByPk(req.params.id);
      if (!order) {
        return res.status(404).json({ error: 'Sales Order not found' });
      }
  
      await order.update({ orderDate, customerName });
      res.json(order);
    } catch (err) {
      console.error('Error updating sales order:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  const DeletesalesOrder =  async (req, res) => {
    try {
      const order = await SalesOrder.findByPk(req.params.id);
      if (!order) {
        return res.status(404).json({ error: 'Sales Order not found' });
      }
  
      await order.destroy();
      res.json({ message: 'Sales Order deleted successfully' });
    } catch (err) {
      console.error('Error deleting sales order:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }


  module.exports = {
    SalesOrders,
    getSalesorder,
    UpdateSaleOrder,
    DeletesalesOrder
  }
    