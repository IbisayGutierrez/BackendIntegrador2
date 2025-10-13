const BranchModel = require("../models/branchModel");

class BranchService {
  async getAllBranch() {
    return await BranchModel.getAllBranch();
  }
}
module.exports = new BranchService();