import { getCustomRepository } from 'typeorm';

import AppError from '../errors/AppError';

import Category from '../models/Category';
import CategoriesRepository from '../repositories/CategoriesRepository';

interface Request {
  title: string;
}

class CreateTransactionService {
  public async execute({ title }: Request): Promise<Category> {
    const categoriesRepository = getCustomRepository(CategoriesRepository);

    const findCategory = await categoriesRepository.findByTitle(title);

    if (findCategory) {
      throw new AppError('This category is already booked');
    }

    const category = await categoriesRepository.create({
      title,
    });

    return category;
  }
}

export default CreateTransactionService;
