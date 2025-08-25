import {Entity} from "./entity.ts";

export class Command extends Entity {
    adetailer: boolean = false
    adetailer_model: string = ""
    adetailer_lora: { uuid: string, version: string, weight: number }[] = []
    adetailer_words: string = ""
    adetailer_dewords: string = ""

    constructor(title: string = "") {
        super()
        this.title = title
    }
}