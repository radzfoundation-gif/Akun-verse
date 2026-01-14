import { Order } from './order.entity';
import { Cart } from './cart.entity';
export declare enum UserRole {
    USER = "user",
    ADMIN = "admin"
}
export declare class User {
    id: string;
    email: string;
    password: string;
    role: UserRole;
    refreshToken: string | null;
    orders: Order[];
    carts: Cart[];
    createdAt: Date;
    updatedAt: Date;
}
