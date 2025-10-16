
//@ts-check

const BranchService = require("../services/branchService");

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */

const getAllBranch = async (req, res) => {
  try {
    const branches = await BranchService.getAllBranch();
    return res.status(200).json({ success: true, data: branches });
  } catch (error) {
    console.error("Controller Error - getAllBranch:", error);
    return res.status(500).json({ success: false, message: "Failed to retrieve branches" });
  }
};

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
const getBranchById = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ success: false, message: "Invalid branch ID" });
    }
    const branch = await BranchService.getBranchById(id);
    if (!branch) {
      return res.status(404).json({ success: false, message: "Branch not found" });
    }
    return res.status(200).json({ success: true, data: branch });
  } catch (error) {
    console.error("Controller Error - getBranchById:", error);
    return res.status(500).json({ success: false, message: "Failed to retrieve branch" });
  }
};

module.exports = {
  getAllBranch,
  getBranchById
};




