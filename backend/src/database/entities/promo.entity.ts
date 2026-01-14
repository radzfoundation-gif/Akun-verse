import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
} from 'typeorm';

@Entity('promos')
export class Promo {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    code: string;

    @Column('decimal', { precision: 5, scale: 2 })
    discountPercent: number;

    @Column({ nullable: true })
    maxDiscount: number; // maximum discount amount in IDR

    @Column({ default: 0 })
    minPurchase: number; // minimum purchase to use promo

    @Column({ default: 100 })
    maxUsage: number;

    @Column({ default: 0 })
    usedCount: number;

    @Column({ nullable: true })
    expiresAt: Date;

    @Column({ default: true })
    isActive: boolean;

    @Column({ nullable: true })
    description: string;

    @CreateDateColumn()
    createdAt: Date;
}
