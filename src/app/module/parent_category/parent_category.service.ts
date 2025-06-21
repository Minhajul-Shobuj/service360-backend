import { Request } from 'express';

const createParentCategory = async (req: Request) => {
  console.log(req.body);
};

export const PCategoryService = {
  createParentCategory,
};
