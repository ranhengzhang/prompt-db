import {Entity} from "./entity.ts";

export class Version extends Entity {
    a1111: boolean = false
    ella: boolean = false
    base_model: { uuid: string, version: string } | null = null
    sdxl_refiner: boolean = false
    lora_models: { uuid: string, version: string, weight: number }[] = []
    embedding_models: { uuid: string, version: string, weight: number }[] = []
    vae: string = "Automatic"
    size: string = "Square"
    width: number = 0
    height: number = 0
    senior: boolean = false
    algorithm: string = "Euler a"
    sampler: string = "euler"
    scheduler: string = "normal"
    times: number = 25
    relevance: number = 7
    seed: string = ""
    clip_skip: number = 2
    ensd: number = 31337
    high_resolution: boolean = false
    multiple: string = "2x"
    re_width: number = 0
    re_height: number = 0
    fix_type: string = "None"
    fix_times: number = 20
    noise: number = 0.5
    adetailer: boolean = false
    adetailer_model: string = "face_yolov8s.pt"
    adetailer_lora: { uuid: string, version: string, weight: number }[] = []
    adetailer_words: string = ""
    adetailer_dewords: string = ""
    use_adetailer_steps: boolean = false
    adetailer_steps: number = 25
    confidence: number = 0.5
    mask_blur: number = 4
    repaint_noise: number = 0.5
    mask_only: boolean = true
    layerdiffusion: boolean = false
    weighting: number = 1

    constructor(title: string = "default") {
        super()
        this.title = title
    }
}