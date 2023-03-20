import * as wasm from "./rich_wasm_bg.wasm";
import { __wbg_set_wasm } from "./rich_wasm_bg.js";
__wbg_set_wasm(wasm);
export * from "./rich_wasm_bg.js";
