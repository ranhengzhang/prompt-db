import {Entity} from "./entity.ts";

export class Version extends Entity {
    a1111: boolean = false
    ella: boolean = false
    base_model: { uuid: string, version: string } | null = null
    sdxl_refiner: boolean = false
    lora_models: { uuid: string, version: string, weight: number }[] = []
    embedding_models: { uuid: string, version: string, weight: number }[] = []
    vae: string = "Automatic"
    size: string = ""
    width: number = 0
    height: number = 0
    senior: boolean = false
    algorithm: string = ""
    sampler: string = ""
    scheduler: string = ""
    times: number = 0
    relevance: number = 0
    seed: string = ""
    clip_skip: number = 0
    ensd: number = 0
    high_resolution: boolean = false
    multiple: string = ""
    re_width: number = 0
    re_height: number = 0
    fix_type: string = ""
    fix_times: number = 0
    noise: number = 0
    adetailer: boolean = false
    adetailer_model: string = ""
    adetailer_lora: { uuid: string, version: string, weight: number }[] = []
    adetailer_words: string = ""
    adetailer_dewords: string = ""
    use_adetailer_steps: boolean = false
    adetailer_steps: number = 0
    confidence: number = 0
    mask_blur: number = 0
    repaint_noise: number = 0
    mask_only: boolean = false
    layerdiffusion: boolean = false
    weighting: number = 0

    constructor(title: string = "default") {
        super()
        this.title = title
    }
}