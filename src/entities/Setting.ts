import { 
    Entity, 
    Column, 
    CreateDateColumn, 
    UpdateDateColumn, 
} from 'typeorm';
import { Model } from './Model';

@Entity('settings')
class Setting extends Model {
    @Column()
    username: string;

    @Column()
    chat: boolean;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export { Setting }