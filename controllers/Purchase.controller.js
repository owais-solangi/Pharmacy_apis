const Purchase = require('../models/purchase.model');
const Product = require("../models/product.model");

// const createPurchase = async (req, res) => {
//     try {
//       const { itemName, quantity, unitPrice } = req.body;
      
//       if (!itemName || !quantity || !unitPrice) {
//         return res.status(400).send(" error: 'Please provide itemName, quantity, and unitPrice." );
//       }

//       const product = await Product.findOne({where : {productName : itemName}});

//       if(!product){
//         product = await Product.create({productName: itemName , quantity:0 , price:unitPrice});
//       }

//       const purchase = await Purchase.create({
//         itemName,
//         quantity,
//         unitPrice,
//         totalAmount: quantity * unitPrice,
//       });

//       product.quantity += quantity;
//       product.price = unitPrice;
//       await product.save();

//       return purchase;
     
//     } catch (error) {
//       console.error(error);
//       return res.status(500).json({ error: 'Internal Server Error' });
//     }
//   };


const createPurchase = async (req, res) => {
  try {
    const { itemName, quantity, unitPrice , itemdescription} = req.body;

    if (!itemName || !quantity || !unitPrice) {
      return res.status(400).json({ error: 'Please provide itemName, quantity, and unitPrice.' });
    }

    const imagePath = req.file ? req.file.filename :null

    const baseUrl = `${req.protocol}://${req.get('host')}`;

    let product = await Product.findOne({ where: { productName: itemName } });

    if (!product) {
      product = await Product.create(
        {
           productName: itemName, 
           quantity: 0, price: 
           unitPrice , 
           description: itemdescription ,
           image: imagePath ? `${baseUrl}/uploads/Product/${imagePath}` : null
          
          });
    }
    const purchase = await Purchase.create({
      itemName,
      itemdescription,
      image: imagePath ? `${baseUrl}/uploads/Product/${imagePath}`:null,
      quantity,
      unitPrice,
      totalAmount: quantity * unitPrice,
    });


    product.quantity += quantity;
    product.price = unitPrice;
    await product.save();

    await product.update({ PurchaseId: purchase.id });

    return res.status(201).json({ success: true, purchase });
  } catch (error) {
    console.error('Error creating purchase:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

  const getAllPurchases = async (req, res) => {
    try {
      const purchases = await Purchase.findAll();
      if(!purchases){
        return res.send("invalid purchase....").status(400);
      }else{
        return res.status(200).json(purchases);
      }
      
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  // const updatePurchase = async (req, res) => {
  //   try {
  //     const { itemName, quantity, unitPrice } = req.body;
  //     const { id } = req.params;
  //     if (!itemName || !quantity || !unitPrice) {
  //       return res.status(400).json({ error: 'Please provide itemName, quantity, and unitPrice.' });
  //     }
  //     const updatedRows = await Purchase.update(
  //       {
  //         itemName,
  //         quantity,
  //         unitPrice,
  //         totalAmount: quantity * unitPrice,
  //       },
  //       { where: { id } }
  //     );
  
  //     if (updatedRows[0] > 0) {
  //       return res.status(200).json({ message: 'Purchase updated successfully.' });
  //     } else {
  //       return res.status(404).json({ error: 'Purchase not found.' });
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     return res.status(500).json({ error: 'Internal Server Error' });
  //   }
  // };

  // const updatePurchase = async (req, res) => {
  //   try {
  //     const { itemName, quantity, unitPrice } = req.body;
  //     const { id } = req.params;
  
  //     if (!itemName || !quantity || !unitPrice) {
  //       return res.status(400).json({ error: 'Please provide itemName, quantity, and unitPrice.' });
  //     }
  
  //     const updatedRows = await Purchase.update(
  //       {
  //         itemName,
  //         quantity,
  //         unitPrice,
  //         totalAmount: quantity * unitPrice,
  //       },
  //       { where: { id } }
  //     );
  
  //     if (updatedRows[0] > 0) {
  //       // Purchase updated successfully, now update the associated Product
  //       const purchase = await Purchase.findOne({ where: { id } });
  //       const product = await Product.findOne({ where: { productName: itemName } });
  
  //       if (purchase && product) {
  //         product.quantity += quantity;
  //         product.price = unitPrice;
  //         await product.save();
  
  //         return res.status(200).json({ message: 'Purchase updated successfully.' });
  //       } else {
  //         // Purchase or Product not found
  //         return res.status(404).json({ error: 'Purchase or Product not found.' });
  //       }
  //     } else {
  //       // Purchase not found
  //       return res.status(404).json({ error: 'Purchase not found.' });
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     return res.status(500).json({ error: 'Internal Server Error' });
  //   }
  // };
  
  // const updatePurchase = async (req, res) => {
  //   try {
  //     const { itemName, quantity, unitPrice } = req.body;
  //     const { id } = req.params;
  
  //     if (!itemName || !quantity || !unitPrice) {
  //       return res.status(400).json({ error: 'Please provide itemName, quantity, and unitPrice.' });
  //     }
  
  //     const purchase = await Purchase.findOne({ where: { id } });
  
  //     if (!purchase) {
  //       return res.status(404).json({ error: 'Purchase not found.' });
  //     }
  
  //     const updatedRows = await purchase.update({
  //       itemName,
  //       quantity,
  //       unitPrice,
  //       totalAmount: quantity * unitPrice,
  //     });
  
  //     if (updatedRows > 0) {
  //       // Purchase updated successfully, now update the associated Product
  //       const product = await Product.findOne({ where: { productName: itemName } });
  
  //       if (product) {
  //         product.quantity += quantity;
  //         product.price = unitPrice;
  //         await product.save();
  
  //         return res.status(200).json({ message: 'Purchase updated successfully.' });
  //       } else {
  //         // Product not found
  //         return res.status(404).json({ error: 'Product not found.' });
  //       }
  //     } else {
  //       // Update not successful
  //       return res.status(500).json({ error: 'Error updating Purchase.' });
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     return res.status(500).json({ error: 'Internal Server Error' });
  //   }
  // };
  
  // const updatePurchase = async (req, res) => {
  //   try {
  //     const { itemName, quantity, unitPrice } = req.body;
  //     const { id } = req.params;
  
  //     if (!itemName || !quantity || !unitPrice) {
  //       return res.status(400).json({ error: 'Please provide itemName, quantity, and unitPrice.' });
  //     }
  
  //     const purchase = await Purchase.findOne({ where: { id } });
  
  //     if (!purchase) {
  //       return res.status(404).json({ error: 'Purchase not found.' });
  //     }
  
  //     const updatedPurchase = await purchase.update({
  //       itemName,
  //       quantity,
  //       unitPrice,
  //       totalAmount: quantity * unitPrice,
  //     });
  
  //     if (updatedPurchase) {
  //       // Purchase updated successfully, now update the associated Product
  //       const product = await Product.findOne({ where: { productName: itemName } });
  
  //       if (product) {
  //         product.quantity += quantity;
  //         product.price = unitPrice;
  //         await product.save();
  
  //         return res.status(200).json({ message: 'Purchase updated successfully.' });
  //       } else {
  //         // Product not found
  //         return res.status(404).json({ error: 'Product not found.' });
  //       }
  //     } else {
  //       // Update not successful
  //       return res.status(500).json({ error: 'Error updating Purchase.' });
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     return res.status(500).json({ error: 'Internal Server Error' });
  //   }
  // };
  
  // const updatePurchase = async (req, res) => {
  //   try {
  //     const { itemName, quantity, unitPrice } = req.body;
  //     const { id } = req.params;
  
  //     if (!itemName || !quantity || !unitPrice) {
  //       return res.status(400).json({ error: 'Please provide itemName, quantity, and unitPrice.' });
  //     }
  
  //     const purchase = await Purchase.findOne({ where: { id } });
  
  //     if (!purchase) {
  //       return res.status(404).json({ error: 'Purchase not found.' });
  //     }
  
  //     const updatedPurchase = await purchase.update({
  //       itemName,
  //       quantity,
  //       unitPrice,
  //       totalAmount: quantity * unitPrice,
  //     });
  
  //     if (updatedPurchase) {
  //       // Purchase updated successfully, now update the associated Product
  //       const product = await Product.findOne({ where: { productName: itemName } });
  
  //       if (product) {
  //         product.quantity += quantity;
  //         product.price = unitPrice;
  //         await product.save();
  
  //         return res.status(200).json({ message: 'Purchase and Product updated successfully.' });
  //       } else {
  //         // Product not found
  //         return res.status(404).json({ error: 'Product not found.' });
  //       }
  //     } else {
  //       // Update not successful
  //       return res.status(500).json({ error: 'Error updating Purchase.' });
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     return res.status(500).json({ error: 'Internal Server Error' });
  //   }
  // };
  
  const updatePurchase = async (req, res) => {
    try {
      const { itemName, quantity, unitPrice } = req.body;
      const { id } = req.params;
  
      if (!itemName || !quantity || !unitPrice) {
        return res.status(400).json({ error: 'Please provide itemName, quantity, and unitPrice.' });
      }
  
      const purchase = await Purchase.findOne({ where: { id } });
  
      if (!purchase) {
        return res.status(404).json({ error: 'Purchase not found.' });
      }
  
      const updatedPurchase = await purchase.update({
        itemName,
        quantity,
        unitPrice,
        totalAmount: quantity * unitPrice,
      });
  
      if (updatedPurchase) {
        // Purchase updated successfully, now update the associated Product
        const product = await Product.findOne({ where: { id} });
  
        if (product) {
          product.productName = itemName
          product.quantity += quantity;
          product.price = unitPrice;
          await product.save();
  
          return res.status(200).json({ message: 'Purchase and Product updated successfully.' });
        } else {
          // Product not found
          return res.status(404).json({ error: 'Product not found.' });
        }
      } else {
        // Update not successful
        return res.status(500).json({ error: 'Error updating Purchase.' });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  

  const deletePurchase = async (req, res) => {
    try {
      const { id } = req.params;
      const deletedRowCount = await Purchase.destroy({ where: { id } });
  
      if (deletedRowCount > 0) {
        return res.status(200).json({ message: 'Purchase deleted successfully.' });
      } else {
        return res.status(404).json({ error: 'Purchase not found.' });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  module.exports = {
    createPurchase,
    getAllPurchases,
    updatePurchase,
    deletePurchase
  }