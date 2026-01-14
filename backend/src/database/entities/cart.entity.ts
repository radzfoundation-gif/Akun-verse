import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('carts')
export class Cart {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => User, (user) => user.carts)
    user: User;

    @Column()
    userId: string;

    @Column('jsonb', { default: [] })
    items: CartItem[];

    @Column({ nullable: true })
    appliedPromoId: string | null;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}

export interface CartItem {
    gameId: string;
    quantity: number;
    price: number;
    isFreeGame?: boolean;
}
