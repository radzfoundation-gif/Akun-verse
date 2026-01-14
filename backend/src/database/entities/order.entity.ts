import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

export enum OrderStatus {
    PENDING = 'pending',
    PAID = 'paid',
    FAILED = 'failed',
    REFUNDED = 'refunded',
}

export enum PaymentMethod {
    DANA = 'dana',
    GOPAY = 'gopay',
    OVO = 'ovo',
    BCA = 'bca',
    MANDIRI = 'mandiri',
    CARD = 'card',
}

@Entity('orders')
export class Order {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    orderNumber: string;

    @ManyToOne(() => User, (user) => user.orders)
    user: User;

    @Column()
    userId: string;

    @Column('jsonb')
    items: OrderItem[];

    @Column('decimal', { precision: 10, scale: 2 })
    subtotal: number;

    @Column('decimal', { precision: 10, scale: 2, default: 0 })
    discountAmount: number;

    @Column({ nullable: true })
    promoCode: string | null;

    @Column('decimal', { precision: 10, scale: 2 })
    totalPrice: number;

    @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.PENDING })
    status: OrderStatus;

    @Column({ type: 'enum', enum: PaymentMethod, nullable: true })
    paymentMethod: PaymentMethod;

    @Column({ nullable: true })
    paymentId: string; // external payment ID

    @Column('jsonb', { nullable: true })
    deliveredKeys: DeliveredKey[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}

export interface OrderItem {
    gameId: string;
    gameTitle: string;
    quantity: number;
    price: number;
    isFreeGame: boolean;
}

export interface DeliveredKey {
    gameId: string;
    gameTitle: string;
    key: string;
}
