import Product from "../models/product.model.js";
import mongoose from "mongoose";

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({success:true, data: products});
    } catch (error) {
        console.log("error in fetching products:", error.message);
        res.status(500).json({success: false, message: "Server Error"});
        
    }
};

export const createProduct = async(req, res) => {
    const product = req.body; //user will send this data

    if (!product.name || !product.price || !product.image){
        return res.status(400).json({success: false, message: "Please provide all fields"});
    }
    const newProduct = new Product(product);

    try{
        await newProduct.save();
        res.status(201).json({success: true, data: newProduct});
    }catch(error){
        console.error("Error in Create product:", error.message);
        res.status(500).json({success: false, message: "Server Error" });
    }
};

export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const product = req.body;

    console.log(`Received PUT request for ID: ${id}`);
    console.log(`Payload: ${JSON.stringify(product)}`);

    if (!mongoose.Types.ObjectId.isValid(id)) {
        console.error("Invalid Product ID");
        return res.status(404).json({ success: false, message: "Invalid Product Id" });
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true });
        if (!updatedProduct) {
            console.error("Product not found");
            return res.status(404).json({ success: false, message: "Product not found" });
        }
        console.log("Product updated successfully");
        res.status(200).json({ success: true, data: updatedProduct });
    } catch (error) {
        console.error("Server Error:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const deleteProduct = async (req, res) => {
    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        console.error("Invalid Product ID");
        return res.status(404).json({ success: false, message: "Invalid Product Id" });
    }
    
   try{
    await Product.findByIdAndDelete(id);
    res.status(200).json({success: true, message: "Product deleted!"});

   }catch(error){
    console.log("error in deleting product:", error.message);
    res.status(500).json({success: false, message: "Sever Error!"});
   }
};