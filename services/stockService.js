const stockModel = require('../models/stockModel');

const stockService = {
  /**
   * 
   * @returns {Promise<number>} 
   */
  async getMinStock() {
    try {
      return await stockModel.getMinStock();
    } catch (error) {
      console.error('Service Error - getMinStock:', error);
      throw error;
    }
  },
  /**
   *
   * @returns {Promise<Array>} 
   */
  async getAllStock() {
    try {
      return await stockModel.getAllStock();
    } catch (error) {
      console.error('Service Error - getAllStock:', error);
      throw error;
    }
  }
};

module.exports = stockService;