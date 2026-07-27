const Customer = require("../models/Customer");

const getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.find().sort({ createdAt: -1 });
    res.status(200).json(customers);
  } catch (error) {
    console.error("Get customers error:", error);
    res.status(500).json({ message: "Failed to fetch customers" });
  }
};

const createCustomer = async (req, res) => {
  try {
    const { name, email, company, phone, industry } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: "Name and email are required" });
    }

    const customer = await Customer.create({
      name,
      email,
      company,
      phone,
      industry,
      createdBy: req.user._id,
    });

    res.status(201).json(customer);
  } catch (error) {
    console.error("Create customer error:", error);
    res.status(500).json({ message: "Failed to create customer" });
  }
};

module.exports = {
  getAllCustomers,
  createCustomer,
};
