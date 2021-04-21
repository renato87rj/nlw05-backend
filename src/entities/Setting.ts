import { 
    Entity, 
    Column, 
    CreateDateColumn, 
    UpdateDateColumn, 
    PrimaryColumn 
} from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity('settings')
class Setting {
    
    constructor() {
        if (!this.id) {
            this.id = uuid();
        }
    }
    
    @PrimaryColumn()
    id: string;

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