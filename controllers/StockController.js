//@ts-check
const stockService = require('../services/stockService');
/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */

const getMinStock = async (req, res) => {
  try {
    const minStock = await stockService.getMinStock();
    return res.status(200).json({
      success: true,
      message: 'Valor mínimo del stock obtenido correctamente.',
      data: minStock,
    });
  } catch (error) {
    console.error('Controller Error - getMinStock:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al obtener el valor mínimo del stock.',
    });
  }
};
const getAllStock = async (req, res) => {
  try {
    const stock = await stockService.getAllStock();
    return res.status(200).json({
      success: true,
      message: 'Stock obtenido correctamente.',
      data: stock,
    });
  } catch (error) {
    console.error('Controller Error - getAllStock:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al obtener el stock.',
    });
  }
};

module.exports = { 
    getMinStock,
    getAllStock
};