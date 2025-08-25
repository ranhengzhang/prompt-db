import {Entity} from "./entity.ts";

export class Model extends Entity {
    type: number = 0
    labels: string[] = []
    versions: string[] = []

    constructor(title: string = "") {
        super()
        this.title = title
    }
}