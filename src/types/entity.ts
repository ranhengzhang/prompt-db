import {v4 as uuidv4} from "uuid";

export class Entity {
    date: number = Date.now()
    uuid: string = uuidv4()
    title: string = ""
    tags: string[] = []
    rate: number = 0
    imgs: string[] = []
    showImg: boolean = true
    words: string = ""
    dewords: string = ""
    unfolding: boolean = true
}