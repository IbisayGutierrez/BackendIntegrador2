
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

module.exports = {
  getAllBranch,
};



