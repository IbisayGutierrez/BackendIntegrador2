const BranchModel = require("../models/branchModel");

class BranchService {
  async getAllBranch() {
    return await BranchModel.getAllBranch();
  }
  async getBranchById(id) {
    return await BranchModel.getBranchById(id);
  }
}
module.exports = new BranchService();