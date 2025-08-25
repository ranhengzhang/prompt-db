import {Dexie, Table} from "dexie";
import {Command} from "../types/command.ts";
import {Model} from "../types/model.ts";
import {Templater} from "../types/templater.ts";

export class GistDatabase extends Dexie {
    commands!: Table<Command>;
    models!: Table<Model>;
    templaters!: Table<Templater>;

    constructor() {
        super('GistDatabase');

        // 定义数据库模式和索引
        this.version(7).stores({
            commands: '&uuid, &date',
            models: '&uuid, &date',
            templaters: '&uuid, &date'
        });
    }
}

export const db = new GistDatabase();