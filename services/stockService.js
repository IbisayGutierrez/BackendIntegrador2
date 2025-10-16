const stockModel = require('../models/stockModel');

const stockService = {
  /**
   * Servicio para obtener el valor mínimo del stock.
   * @returns {Promise<number>} Valor mínimo del stock.
   */
  async getMinStock() {
    try {
      return await stockModel.getMinStock();
    } catch (error) {
      console.error('Service Error - getMinStock:', error);
      throw error;
    }
  },

  async getAllStock() {
    try {
      return await stockModel.getAllStock();
    } catch (error) {
      console.error('Service Error - getAllStock:', error);
      throw error;
    }
  },
};

module.exports = stockService;