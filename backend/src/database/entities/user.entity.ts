import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
} from 'typeorm';
import { Order } from './order.entity';
import { Cart } from './cart.entity';

export enum UserRole {
    USER = 'user',
    ADMIN = 'admin',
}

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
    role: UserRole;

    @Column({ nullable: true })
    refreshToken: string | null;

    @OneToMany(() => Order, (order) => order.user)
    orders: Order[];

    @OneToMany(() => Cart, (cart) => cart.user)
    carts: Cart[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
