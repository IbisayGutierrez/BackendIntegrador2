const BranchModel = require("../models/branchModel");

const branchService = {
  branchModel: new BranchModel(),

  getAllBranch: async function() {
    return await this.branchModel.getAllBranch();
  },

  getBranchById: async function(id) {
    return await this.branchModel.getBranchById(id);
  }
};

module.exports = branchService;
