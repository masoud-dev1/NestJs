import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Discount } from '../../discount/entities/discount.entity';
import { Product } from '../../product/entities/product.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @OneToMany(() => Discount, (discount) => discount.category)
  discounts: Discount[];
  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}
