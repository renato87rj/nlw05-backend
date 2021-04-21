import { Column, CreateDateColumn, Entity } from "typeorm";
import { Model } from "./Model";

@Entity('users')
class User extends Model {
    @Column()
    email: string;

    @CreateDateColumn()
    created_at: Date;
}

export { User }