import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne } from "typeorm";
import { Model } from "./Model";
import { User } from "./User";

@Entity('messages')
class Message extends Model {
    @JoinColumn({name: 'user_id'})
    @ManyToOne(() => User)
    user: User
    
    @Column()
    user_id: string

    @Column()
    admin_id: string;

    @Column()
    text: string;

    @CreateDateColumn()
    created_at: Date
}

export { Message }