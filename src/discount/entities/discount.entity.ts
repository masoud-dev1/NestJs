import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Category } from '../../category/entities/category.entity';

@Entity()
export class Discount {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  percent: number;
  @ManyToOne(() => Category, (category) => category.discounts)
  category: Category;
}
