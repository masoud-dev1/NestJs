import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { Discount } from '../discount/entities/discount.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectRepository(Discount)
    private discountRepository: Repository<Discount>,
  ) {}

  create(createProductDto: CreateProductDto) {
    return 'This action adds a new product';
  }

  findAll() {
    return `This action returns all product`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }

  async getPrice(id: number): Promise<number> {
    const product = await this.productRepository.findOne({
      where: { id: id },
      relations: ['category'], // 🔥 کلید اصلی: بارگذاری دسته‌بندی
    });

    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    // اگر محصول دسته‌بندی ندارد، تخفیف اعمال نمی‌شود
    if (!product.category) {
      return product.price;
    }

    const discount = await this.discountRepository.findOne({
      where: {
        category: {
          id: product.category.id,
        },
      },
    });

    // اگر تخفیفی برای این دسته‌بندی وجود نداشت، قیمت اصلی برگردانده شود
    if (!discount) {
      return product.price;
    }

    // محاسبه قیمت با تخفیف
    return product.price * (1 - discount.percent / 100);
  }
}
