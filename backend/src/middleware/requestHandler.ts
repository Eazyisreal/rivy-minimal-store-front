import { Response } from "express";

export const sendResponse = (
  res: Response, 
  statusCode: number, 
  data: any, 
  message: string = "Success", 
  errors?: any  
) => {
  const response: any = {
    success: statusCode < 400,
    statusCode,
    message,
    data,
  };

  if (errors) {
    response.errors = errors;
  }

  return res.status(statusCode).json(response);
};