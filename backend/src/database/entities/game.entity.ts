import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
} from 'typeorm';
import { GameKey } from './game-key.entity';

export enum DiscountType {
    PERCENTAGE = 'percentage',
    FIXED = 'fixed',
}

@Entity('games')
export class Game {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column({ default: 'Steam' })
    platform: string;

    @Column('decimal', { precision: 10, scale: 2 })
    originalPrice: number;

    @Column('decimal', { precision: 5, scale: 2, default: 0 })
    discount: number;

    @Column({ type: 'enum', enum: DiscountType, default: DiscountType.PERCENTAGE })
    discountType: DiscountType;

    @Column('decimal', { precision: 10, scale: 2 })
    finalPrice: number;

    @Column({ default: 0 })
    stock: number;

    @Column({ nullable: true })
    imageUrl: string;

    @Column({ nullable: true })
    category: string;

    @Column({ nullable: true })
    description: string;

    @Column({ default: true })
    isActive: boolean;

    @OneToMany(() => GameKey, (key) => key.game)
    keys: GameKey[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
