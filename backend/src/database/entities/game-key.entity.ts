import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
} from 'typeorm';
import { Game } from './game.entity';
import { Order } from './order.entity';

@Entity('game_keys')
export class GameKey {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Game, (game) => game.keys)
    game: Game;

    @Column()
    gameId: string;

    @Column()
    key: string; // encrypted key

    @Column({ default: false })
    isUsed: boolean;

    @ManyToOne(() => Order, { nullable: true })
    order: Order;

    @Column({ nullable: true })
    orderId: string;

    @CreateDateColumn()
    createdAt: Date;
}
