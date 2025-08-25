import {Version} from "./version.ts";
import {v4 as uuidv4} from "uuid";

export class Templater {
    date: number = Date.now()
    uuid: string = uuidv4()
    title: string = ""
    versions: Version[] = []

    constructor(title: string = "") {
        this.title = title
    }
}