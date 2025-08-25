// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
// 新增获取图片尺寸的命令
#[tauri::command]
fn get_image_size(path: String) -> Result<(u32, u32), String> {
    use image::ImageReader;

    match ImageReader::open(&path) {
        Ok(reader) => {
            match reader.with_guessed_format() {
                Ok(reader) => {
                    match reader.decode() {
                        Ok(img) => Ok((img.width(), img.height())),
                        Err(e) => Err(format!("图片解码失败: {}", e)),
                    }
                }
                Err(e) => Err(format!("图片格式检测失败: {}", e)),
            }
        }
        Err(e) => Err(format!("文件打开失败: {}", e)),
    }
}

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_window_state::Builder::new().build())
        .plugin(tauri_plugin_clipboard_manager::init())
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_os::init())
        .plugin(tauri_plugin_fs::init())
        .invoke_handler(tauri::generate_handler![
            greet,
            get_image_size
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
