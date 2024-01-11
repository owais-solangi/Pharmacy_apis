// const { where } = require('sequelize');
const PurchaseOrder = require('../models/Purchaseorder.model');
const moment = require('moment');
const Purchase = require('../models/purchase.model');
const Product = require('../models/product.model');



const createPurchaseOrder = async (req, res) => {
    try {
      const { orderNumber,itemName,itemdescription,quantity,unitPrice,vendor,vendorPhone,orderDate } = req.body;

      const imagePath = req.file ? req.file.filename :null

      const baseUrl = `${req.protocol}://${req.get('host')}`;

      const parsedOrderDate = moment(orderDate);

      if (!parsedOrderDate.isValid()) {
        return res.status(400).json({ error: 'Invalid orderDate format' });
      }


      
      
      const formattedOrderDate = parsedOrderDate.format('YYYY-MM-DD')
     

      const purchaseOrder = await PurchaseOrder.create({
        orderNumber,
        itemName,
        itemdescription,
        image : imagePath ? `${baseUrl}/uploads/Product/${imagePath}` : null,
        quantity,
        unitPrice,
        totalAmount: quantity * unitPrice,
        vendor,
        vendorPhone,
        orderDate: formattedOrderDate,
      });
    //   await purchaseOrder.setPurchases(purchases);
    if (!purchaseOrder) {
        res.status(400).send("invalid purchase Order.....");   
    }else{

      
      const purchase = await Purchase.create({
        itemName,
        itemdescription: itemdescription,
        image: imagePath ? `${baseUrl}/uploads/Product/${imagePath}` : null,
        quantity,
        unitPrice,
        totalAmount: purchaseOrder.totalAmount,
        PurchaseOrderId: purchaseOrder.id,
      });

      const product = await Product.create({
        productName: itemName,
        quantity,
        price: unitPrice,
        description: itemdescription,
        image: imagePath ? `${baseUrl}/uploads/Product/${imagePath}` : null,
        PurchaseId: purchase.id,
      });
      // console.log('Purchase Order:', purchaseOrder );
      return res.status(201).send({
        PurchaseOrder: {
          ...purchaseOrder.toJSON(),
          orderDate:formattedOrderDate,
        },
        Purchase: {...purchase},
        product: {...product},
        message: "Purchase Order and Purchase are created succesfully..."
      });
    }} catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  // const handleFileUpload = (req,res)=>{
  //   const filePath = req.file.path;
  //   if(!filePath){
  //     return res.status(401).json("invalid file path");

  //   }
  //   return res.status(202).json({filePath});
  // }

  const getPurchaseOrderById = async (req, res) => {
    try {
      const { id } = req.params;
      
      const purchaseOrder = await PurchaseOrder.findByPk(id);//, { include: Purchase })
  
      if (purchaseOrder) {
        return res.status(200).json(purchaseOrder);
      } else {
        return res.status(404).json({ error: 'Purchase Order not found.' });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  const getPurchaseOrder = async(req,res)=>{
    try {
      const Purchaseorder = await PurchaseOrder.findAll();
      if(!Purchaseorder){
        return res.status(401).send("Purchase Order is not found");
        
      }else{
        return res.status(201).send({
          purchaseOrder: Purchaseorder,
          message: "succesfully find....."
        })
      }
      
    } catch (error) {
      console.log(error);
    }
  }

  // const updatePurchaseOrder = async (req, res) => {
  //   try {
  //     const { orderNumber, vendor, orderDate } = req.body;
  //     const { id } = req.params;
  
  //     // Basic validation
      
  
  //     const updatedPurchaseOrder = await PurchaseOrder.findOne({where:{id}});
  //     const updatedRows = await PurchaseOrder.update(
  //        vendor,
  //       { where: { updatedPurchaseOrder } }
  //     );
     
  
  //     if (!updatedRows) {
  //       // await updatedPurchaseOrder.setPurchases(purchases);
  
  //       return res.status(200).json({ message: 'Purchase Order updated successfully.' });
  //     } else {
  //       return res.status(404).json({ error: 'Purchase Order not found.' });
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     return res.status(500).json({ error: 'Internal Server Error' });
  //   }
  // };

  // const updatePurchaseOrder = async (req, res) => {
  //   try {
  //     const { orderNumber, vendor, orderDate } = req.body;
  //     const { id } = req.params;
  
  //     // Basic validation
  
  //     const updatedPurchaseOrder = await PurchaseOrder.findOne({ where: { id } });
  
  //     if (updatedPurchaseOrder) {
  //       // Update the fields
  //       const updatedRows = await updatedPurchaseOrder.update({
  //         orderNumber,
  //         vendor,
  //         orderDate,
  //       });
  
  //       if (updatedRows) {
  //         // Successfully updated
  //         return res.status(200).json({ message: 'Purchase Order updated successfully.' });
  //       } else {
  //         // Update was not successful
  //         return res.status(500).json({ error: 'Error updating Purchase Order.' });
  //       }
  //     } else {
  //       // Purchase Order not found
  //       return res.status(404).json({ error: 'Purchase Order not found.' });
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     return res.status(500).json({ error: 'Internal Server Error' });
  //   }
  // };
  
  const updatePurchaseOrder = async (req, res) => {
    try {
      const { orderNumber, vendor, orderDate } = req.body;
      const { id } = req.params;
  
      // Basic validation
  
      const updatedRows = await PurchaseOrder.update(
        { orderNumber, vendor, orderDate },
        { where: { id } }
      );
  
      if (updatedRows[0] > 0) {
        return res.status(200).json({ message: 'Purchase Order updated successfully.' });
      } else {
        return res.status(404).json({ error: 'Purchase Order not found.' });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };

const deletePurchaseOrder = async (req, res) => {
    try {
      const id = req.params.id;
  
      // Delete the purchase order
      const deletedRowCount = await PurchaseOrder.destroy({ where: { id } });
  
      if ([deletedRowCount] > 0) {
        return res.status(200).json({ message: 'Purchase Order deleted successfully.' });
      } else {
        return res.status(404).json({ error: 'Purchase Order not found.' });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  module.exports = {
    createPurchaseOrder,
    getPurchaseOrderById,
    getPurchaseOrder,
    updatePurchaseOrder,
    // handleFileUpload,
    deletePurchaseOrder
  }
  