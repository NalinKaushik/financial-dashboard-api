import * as TransactionService from '../services/transaction.service.js';

export const getTransactions = async (req, res, next) => {
  try {
    // Pass query parameters (like ?type=INCOME) to the service for filtering
    const transactions = await TransactionService.getAll(req.query);
    
    res.status(200).json({
      success: true,
      data: transactions
    });
  } catch (error) {
    next(error);
  }
};

export const createTransaction = async (req, res, next) => {
  try {
    const transactionData = req.body;
    const userId = req.user.id; // Pulled from the JWT Auth Middleware
    
    const newRecord = await TransactionService.create(transactionData, userId);
    
    res.status(201).json({
      success: true,
      message: "Record created",
      data: newRecord
    });
  } catch (error) {
    next(error);
  }
};

export const updateTransaction = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedRecord = await TransactionService.update(id, req.body);
    
    res.status(200).json({
      success: true,
      message: "Record updated",
      data: updatedRecord
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTransaction = async (req, res, next) => {
  try {
    const { id } = req.params;
    await TransactionService.softDelete(id);
    
    // 204 means "No Content" (successfully deleted, nothing to return)
    res.status(204).send(); 
  } catch (error) {
    next(error);
  }
};