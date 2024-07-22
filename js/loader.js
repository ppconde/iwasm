class WasmLoader {
  constructor() {
    this._imports = {
      env: {
        abort() {
          throw new Error("Abort called from wasm file");
        },
      },
      index: {
        log(n) {
          console.log(n);
        },
      },
    };
  }

  async wasm(path, imports = this._imports) {
    console.log(`Fetching ${path}`);

    if (!loader.instantiateStreaming) {
      return await this.wasmFallback(path, imports);
    }

    const instance = await loader.instantiateStreaming(fetch(path), imports);

    return instance?.exports;
  }

  async wasmFallback(path, imports = this._imports) {
    console.log(`Using fallback ${path}`);
    const response = await fetch(path);
    const buffer = await response?.arrayBuffer();
    const instance = await loader.instantiate(buffer, imports);

    return instance?.exports;
  }
}
