import { PrimaryColumn } from "typeorm";
import { v4 as uuid} from "uuid";

class Model {
    constructor () {
        if (!this.id) {
            this.id = uuid();
        }
    }

    @PrimaryColumn()
    id: string;
}

export { Model }