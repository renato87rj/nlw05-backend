import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, UpdateDateColumn } from "typeorm";
import { Model } from "./Model";
import { User } from "./User";

@Entity('connections')
class Connection extends Model {
    @JoinColumn({name: 'user_id'})
    @ManyToOne(() => User)
    user: User
    
    @Column()
    user_id: string

    @Column()
    admin_id: string;

    @Column()
    socket_id: string;

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date
}

export { Connection }