const Lead = require("../models/Lead");

const getAllLeads = async (req, res) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 });
    res.status(200).json(leads);
  } catch (error) {
    console.error("Get leads error:", error);
    res.status(500).json({ message: "Failed to fetch leads" });
  }
};

const createLead = async (req, res) => {
  try {
    const { name, email, company, phone, status, source } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: "Name and email are required" });
    }

    const lead = await Lead.create({
      name,
      email,
      company,
      phone,
      status,
      source,
    });

    res.status(201).json(lead);
  } catch (error) {
    console.error("Create lead error:", error);
    res.status(500).json({ message: "Failed to create lead" });
  }
};

const updateLead = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedLead = await Lead.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedLead) {
      return res.status(404).json({ message: "Lead not found" });
    }

    res.status(200).json(updatedLead);
  } catch (error) {
    console.error("Update lead error:", error);
    res.status(500).json({ message: "Failed to update lead" });
  }
};

const deleteLead = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedLead = await Lead.findByIdAndDelete(id);

    if (!deletedLead) {
      return res.status(404).json({ message: "Lead not found" });
    }

    res.status(200).json({ message: "Lead deleted successfully" });
  } catch (error) {
    console.error("Delete lead error:", error);
    res.status(500).json({ message: "Failed to delete lead" });
  }
};

module.exports = {
  getAllLeads,
  createLead,
  updateLead,
  deleteLead,
};
