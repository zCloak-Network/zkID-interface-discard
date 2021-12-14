import * as wasm from './starks_proofgen_bg.wasm';

const heap = new Array(32).fill(undefined);

heap.push(undefined, null, true, false);

function getObject(idx) {
  return heap[idx];
}

let heap_next = heap.length;

function dropObject(idx) {
  if (idx < 36) return;
  heap[idx] = heap_next;
  heap_next = idx;
}

function takeObject(idx) {
  const ret = getObject(idx);
  dropObject(idx);
  return ret;
}

function addHeapObject(obj) {
  if (heap_next === heap.length) heap.push(heap.length + 1);
  const idx = heap_next;
  heap_next = heap[idx];

  heap[idx] = obj;
  return idx;
}

let WASM_VECTOR_LEN = 0;

let cachegetUint8Memory0 = null;
function getUint8Memory0() {
  if (cachegetUint8Memory0 === null || cachegetUint8Memory0.buffer !== wasm.memory.buffer) {
    cachegetUint8Memory0 = new Uint8Array(wasm.memory.buffer);
  }
  return cachegetUint8Memory0;
}

const lTextEncoder = typeof TextEncoder === 'undefined' ? (0, module.require)('util').TextEncoder : TextEncoder;

let cachedTextEncoder = new lTextEncoder('utf-8');

const encodeString =
  typeof cachedTextEncoder.encodeInto === 'function'
    ? function (arg, view) {
        return cachedTextEncoder.encodeInto(arg, view);
      }
    : function (arg, view) {
        const buf = cachedTextEncoder.encode(arg);
        view.set(buf);
        return {
          read: arg.length,
          written: buf.length,
        };
      };

function passStringToWasm0(arg, malloc, realloc) {
  if (realloc === undefined) {
    const buf = cachedTextEncoder.encode(arg);
    const ptr = malloc(buf.length);
    getUint8Memory0()
      .subarray(ptr, ptr + buf.length)
      .set(buf);
    WASM_VECTOR_LEN = buf.length;
    return ptr;
  }

  let len = arg.length;
  let ptr = malloc(len);

  const mem = getUint8Memory0();

  let offset = 0;

  for (; offset < len; offset++) {
    const code = arg.charCodeAt(offset);
    if (code > 0x7f) break;
    mem[ptr + offset] = code;
  }

  if (offset !== len) {
    if (offset !== 0) {
      arg = arg.slice(offset);
    }
    ptr = realloc(ptr, len, (len = offset + arg.length * 3));
    const view = getUint8Memory0().subarray(ptr + offset, ptr + len);
    const ret = encodeString(arg, view);

    offset += ret.written;
  }

  WASM_VECTOR_LEN = offset;
  return ptr;
}

function isLikeNone(x) {
  return x === undefined || x === null;
}

let cachegetInt32Memory0 = null;
function getInt32Memory0() {
  if (cachegetInt32Memory0 === null || cachegetInt32Memory0.buffer !== wasm.memory.buffer) {
    cachegetInt32Memory0 = new Int32Array(wasm.memory.buffer);
  }
  return cachegetInt32Memory0;
}

const lTextDecoder = typeof TextDecoder === 'undefined' ? (0, module.require)('util').TextDecoder : TextDecoder;

let cachedTextDecoder = new lTextDecoder('utf-8', { ignoreBOM: true, fatal: true });

cachedTextDecoder.decode();

function getStringFromWasm0(ptr, len) {
  return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
}

function makeMutClosure(arg0, arg1, dtor, f) {
  const state = { a: arg0, b: arg1, cnt: 1, dtor };
  const real = (...args) => {
    // First up with a closure we increment the internal reference
    // count. This ensures that the Rust closure environment won't
    // be deallocated while we're invoking it.
    state.cnt++;
    const a = state.a;
    state.a = 0;
    try {
      return f(a, state.b, ...args);
    } finally {
      if (--state.cnt === 0) {
        wasm.__wbindgen_export_2.get(state.dtor)(a, state.b);
      } else {
        state.a = a;
      }
    }
  };
  real.original = state;

  return real;
}
function __wbg_adapter_18(arg0, arg1, arg2) {
  wasm._dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__hfd99f327452ea447(
    arg0,
    arg1,
    addHeapObject(arg2)
  );
}

/**
 * Executes the specicied `program` and returns the result together with a STARK-based proof of execution.
 *
 * * `inputs` specifies the initial stack state and provides secret input tapes;
 * * `num_outputs` specifies the number of elements from the top of the stack to be returned;
 * @param {string} program_string
 * @param {string} inputs_string
 * @param {number} num_outputs
 * @param {string} options_string
 * @returns {string}
 */
export function starks_proofgen(program_string, inputs_string, num_outputs, options_string) {
  try {
    const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
    var ptr0 = passStringToWasm0(program_string, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len0 = WASM_VECTOR_LEN;
    var ptr1 = passStringToWasm0(inputs_string, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len1 = WASM_VECTOR_LEN;
    var ptr2 = passStringToWasm0(options_string, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len2 = WASM_VECTOR_LEN;
    wasm.starks_proofgen(retptr, ptr0, len0, ptr1, len1, num_outputs, ptr2, len2);
    var r0 = getInt32Memory0()[retptr / 4 + 0];
    var r1 = getInt32Memory0()[retptr / 4 + 1];
    return getStringFromWasm0(r0, r1);
  } finally {
    wasm.__wbindgen_add_to_stack_pointer(16);
    wasm.__wbindgen_free(r0, r1);
  }
}

/**
 * @param {string} program_name
 * @param {string} inputs_string
 * @param {number} num_outputs
 * @param {string} options_string
 * @returns {string}
 */
export function starks_proofgen_with_program_name(program_name, inputs_string, num_outputs, options_string) {
  try {
    const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
    var ptr0 = passStringToWasm0(program_name, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len0 = WASM_VECTOR_LEN;
    var ptr1 = passStringToWasm0(inputs_string, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len1 = WASM_VECTOR_LEN;
    var ptr2 = passStringToWasm0(options_string, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len2 = WASM_VECTOR_LEN;
    wasm.starks_proofgen_with_program_name(retptr, ptr0, len0, ptr1, len1, num_outputs, ptr2, len2);
    var r0 = getInt32Memory0()[retptr / 4 + 0];
    var r1 = getInt32Memory0()[retptr / 4 + 1];
    return getStringFromWasm0(r0, r1);
  } finally {
    wasm.__wbindgen_add_to_stack_pointer(16);
    wasm.__wbindgen_free(r0, r1);
  }
}

/**
 * @param {string} program_in_assembly
 * @returns {string}
 */
export function generate_program(program_in_assembly) {
  try {
    const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
    var ptr0 = passStringToWasm0(program_in_assembly, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.generate_program(retptr, ptr0, len0);
    var r0 = getInt32Memory0()[retptr / 4 + 0];
    var r1 = getInt32Memory0()[retptr / 4 + 1];
    return getStringFromWasm0(r0, r1);
  } finally {
    wasm.__wbindgen_add_to_stack_pointer(16);
    wasm.__wbindgen_free(r0, r1);
  }
}

/**
 * @returns {string}
 */
export function output_program_string() {
  try {
    const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
    wasm.output_program_string(retptr);
    var r0 = getInt32Memory0()[retptr / 4 + 0];
    var r1 = getInt32Memory0()[retptr / 4 + 1];
    return getStringFromWasm0(r0, r1);
  } finally {
    wasm.__wbindgen_add_to_stack_pointer(16);
    wasm.__wbindgen_free(r0, r1);
  }
}

/**
 * @param {number} value
 * @returns {string}
 */
export function output_inputs_string(value) {
  try {
    const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
    wasm.output_inputs_string(retptr, value);
    var r0 = getInt32Memory0()[retptr / 4 + 0];
    var r1 = getInt32Memory0()[retptr / 4 + 1];
    return getStringFromWasm0(r0, r1);
  } finally {
    wasm.__wbindgen_add_to_stack_pointer(16);
    wasm.__wbindgen_free(r0, r1);
  }
}

/**
 * @returns {string}
 */
export function output_option_string() {
  try {
    const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
    wasm.output_option_string(retptr);
    var r0 = getInt32Memory0()[retptr / 4 + 0];
    var r1 = getInt32Memory0()[retptr / 4 + 1];
    return getStringFromWasm0(r0, r1);
  } finally {
    wasm.__wbindgen_add_to_stack_pointer(16);
    wasm.__wbindgen_free(r0, r1);
  }
}

/**
 */
export function init_panic_hook() {
  wasm.init_panic_hook();
}

let cachegetUint32Memory0 = null;
function getUint32Memory0() {
  if (cachegetUint32Memory0 === null || cachegetUint32Memory0.buffer !== wasm.memory.buffer) {
    cachegetUint32Memory0 = new Uint32Array(wasm.memory.buffer);
  }
  return cachegetUint32Memory0;
}

function passArrayJsValueToWasm0(array, malloc) {
  const ptr = malloc(array.length * 4);
  const mem = getUint32Memory0();
  for (let i = 0; i < array.length; i++) {
    mem[ptr / 4 + i] = addHeapObject(array[i]);
  }
  WASM_VECTOR_LEN = array.length;
  return ptr;
}

let stack_pointer = 32;

function addBorrowedObject(obj) {
  if (stack_pointer == 1) throw new Error('out of js stack');
  heap[--stack_pointer] = obj;
  return stack_pointer;
}
/**
 * Handler for `console.log` invocations.
 *
 * If a test is currently running it takes the `args` array and stringifies
 * it and appends it to the current output of the test. Otherwise it passes
 * the arguments to the original `console.log` function, psased as
 * `original`.
 * @param {Array<any>} args
 */
export function __wbgtest_console_log(args) {
  try {
    wasm.__wbgtest_console_log(addBorrowedObject(args));
  } finally {
    heap[stack_pointer++] = undefined;
  }
}

/**
 * Handler for `console.debug` invocations. See above.
 * @param {Array<any>} args
 */
export function __wbgtest_console_debug(args) {
  try {
    wasm.__wbgtest_console_debug(addBorrowedObject(args));
  } finally {
    heap[stack_pointer++] = undefined;
  }
}

/**
 * Handler for `console.info` invocations. See above.
 * @param {Array<any>} args
 */
export function __wbgtest_console_info(args) {
  try {
    wasm.__wbgtest_console_info(addBorrowedObject(args));
  } finally {
    heap[stack_pointer++] = undefined;
  }
}

/**
 * Handler for `console.warn` invocations. See above.
 * @param {Array<any>} args
 */
export function __wbgtest_console_warn(args) {
  try {
    wasm.__wbgtest_console_warn(addBorrowedObject(args));
  } finally {
    heap[stack_pointer++] = undefined;
  }
}

/**
 * Handler for `console.error` invocations. See above.
 * @param {Array<any>} args
 */
export function __wbgtest_console_error(args) {
  try {
    wasm.__wbgtest_console_error(addBorrowedObject(args));
  } finally {
    heap[stack_pointer++] = undefined;
  }
}

function __wbg_adapter_52(arg0, arg1, arg2, arg3, arg4) {
  wasm.wasm_bindgen__convert__closures__invoke3_mut__h017241fd686f2360(
    arg0,
    arg1,
    addHeapObject(arg2),
    arg3,
    addHeapObject(arg4)
  );
}

function handleError(f, args) {
  try {
    return f.apply(this, args);
  } catch (e) {
    wasm.__wbindgen_exn_store(addHeapObject(e));
  }
}
function __wbg_adapter_65(arg0, arg1, arg2, arg3) {
  wasm.wasm_bindgen__convert__closures__invoke2_mut__h09b2d1aedff1ab01(
    arg0,
    arg1,
    addHeapObject(arg2),
    addHeapObject(arg3)
  );
}

/**
 * Runtime test harness support instantiated in JS.
 *
 * The node.js entry script instantiates a `Context` here which is used to
 * drive test execution.
 */
export class WasmBindgenTestContext {
  static __wrap(ptr) {
    const obj = Object.create(WasmBindgenTestContext.prototype);
    obj.ptr = ptr;

    return obj;
  }

  __destroy_into_raw() {
    const ptr = this.ptr;
    this.ptr = 0;

    return ptr;
  }

  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_wasmbindgentestcontext_free(ptr);
  }
  /**
   * Creates a new context ready to run tests.
   *
   * A `Context` is the main structure through which test execution is
   * coordinated, and this will collect output and results for all executed
   * tests.
   */
  constructor() {
    var ret = wasm.wasmbindgentestcontext_new();
    return WasmBindgenTestContext.__wrap(ret);
  }
  /**
   * Inform this context about runtime arguments passed to the test
   * harness.
   *
   * Eventually this will be used to support flags, but for now it's just
   * used to support test filters.
   * @param {any[]} args
   */
  args(args) {
    var ptr0 = passArrayJsValueToWasm0(args, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.wasmbindgentestcontext_args(this.ptr, ptr0, len0);
  }
  /**
   * Executes a list of tests, returning a promise representing their
   * eventual completion.
   *
   * This is the main entry point for executing tests. All the tests passed
   * in are the JS `Function` object that was plucked off the
   * `WebAssembly.Instance` exports list.
   *
   * The promise returned resolves to either `true` if all tests passed or
   * `false` if at least one test failed.
   * @param {any[]} tests
   * @returns {Promise<any>}
   */
  run(tests) {
    var ptr0 = passArrayJsValueToWasm0(tests, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    var ret = wasm.wasmbindgentestcontext_run(this.ptr, ptr0, len0);
    return takeObject(ret);
  }
}

export function __wbindgen_object_drop_ref(arg0) {
  takeObject(arg0);
}

export function __wbg_log_6ff9ee264f59aa64(arg0, arg1) {
  console.log(getStringFromWasm0(arg0, arg1));
}

export function __wbg_String_1a35e90822a6c517(arg0, arg1) {
  var ret = String(getObject(arg1));
  var ptr0 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
  var len0 = WASM_VECTOR_LEN;
  getInt32Memory0()[arg0 / 4 + 1] = len0;
  getInt32Memory0()[arg0 / 4 + 0] = ptr0;
}

export function __wbg_getElementById_517c114c7bf28945(arg0, arg1, arg2) {
  var ret = getObject(arg0).getElementById(getStringFromWasm0(arg1, arg2));
  return addHeapObject(ret);
}

export function __wbg_settextcontent_7b6f0be9c42d3f07(arg0, arg1, arg2) {
  getObject(arg0).textContent = getStringFromWasm0(arg1, arg2);
}

export function __wbindgen_number_new(arg0) {
  var ret = arg0;
  return addHeapObject(ret);
}

export function __wbg_self_e7daaedfa6841b20(arg0) {
  var ret = getObject(arg0).self;
  return addHeapObject(ret);
}

export function __wbindgen_jsval_eq(arg0, arg1) {
  var ret = getObject(arg0) === getObject(arg1);
  return ret;
}

export function __wbg_static_accessor_document_89dc7621332d4f08() {
  var ret = document;
  return addHeapObject(ret);
}

export function __wbg_textcontent_a96acd0b5f4c0a6e(arg0, arg1) {
  var ret = getObject(arg1).textContent;
  var ptr0 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
  var len0 = WASM_VECTOR_LEN;
  getInt32Memory0()[arg0 / 4 + 1] = len0;
  getInt32Memory0()[arg0 / 4 + 0] = ptr0;
}

export function __wbindgen_object_clone_ref(arg0) {
  var ret = getObject(arg0);
  return addHeapObject(ret);
}

export function __wbg_stack_e83cea0490e06f86(arg0) {
  var ret = getObject(arg0).stack;
  return addHeapObject(ret);
}

export function __wbg_stack_8bf6fcfe52efe4d4(arg0, arg1) {
  var ret = getObject(arg1).stack;
  var ptr0 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
  var len0 = WASM_VECTOR_LEN;
  getInt32Memory0()[arg0 / 4 + 1] = len0;
  getInt32Memory0()[arg0 / 4 + 0] = ptr0;
}

export function __wbindgen_cb_drop(arg0) {
  const obj = takeObject(arg0).original;
  if (obj.cnt-- == 1) {
    obj.a = 0;
    return true;
  }
  var ret = false;
  return ret;
}

export function __wbg_call_ba36642bd901572b() {
  return handleError(function (arg0, arg1) {
    var ret = getObject(arg0).call(getObject(arg1));
    return addHeapObject(ret);
  }, arguments);
}

export function __wbg_forEach_1a5b277b2faed858(arg0, arg1, arg2) {
  try {
    var state0 = { a: arg1, b: arg2 };
    var cb0 = (arg0, arg1, arg2) => {
      const a = state0.a;
      state0.a = 0;
      try {
        return __wbg_adapter_52(a, state0.b, arg0, arg1, arg2);
      } finally {
        state0.a = a;
      }
    };
    getObject(arg0).forEach(cb0);
  } finally {
    state0.a = state0.b = 0;
  }
}

export function __wbg_message_e440fbd911a845a2(arg0) {
  var ret = getObject(arg0).message;
  return addHeapObject(ret);
}

export function __wbg_name_966f168ad0e59c92(arg0) {
  var ret = getObject(arg0).name;
  return addHeapObject(ret);
}

export function __wbg_newnoargs_9fdd8f3961dd1bee(arg0, arg1) {
  var ret = new Function(getStringFromWasm0(arg0, arg1));
  return addHeapObject(ret);
}

export function __wbg_call_3fc07b7d5fc9022d() {
  return handleError(function (arg0, arg1, arg2) {
    var ret = getObject(arg0).call(getObject(arg1), getObject(arg2));
    return addHeapObject(ret);
  }, arguments);
}

export function __wbg_new_c143a4f563f78c4e(arg0, arg1) {
  try {
    var state0 = { a: arg0, b: arg1 };
    var cb0 = (arg0, arg1) => {
      const a = state0.a;
      state0.a = 0;
      try {
        return __wbg_adapter_65(a, state0.b, arg0, arg1);
      } finally {
        state0.a = a;
      }
    };
    var ret = new Promise(cb0);
    return addHeapObject(ret);
  } finally {
    state0.a = state0.b = 0;
  }
}

export function __wbg_resolve_cae3d8f752f5db88(arg0) {
  var ret = Promise.resolve(getObject(arg0));
  return addHeapObject(ret);
}

export function __wbg_then_c2361a9d5c9a4fcb(arg0, arg1) {
  var ret = getObject(arg0).then(getObject(arg1));
  return addHeapObject(ret);
}

export function __wbg_self_bb69a836a72ec6e9() {
  return handleError(function () {
    var ret = self.self;
    return addHeapObject(ret);
  }, arguments);
}

export function __wbg_window_3304fc4b414c9693() {
  return handleError(function () {
    var ret = window.window;
    return addHeapObject(ret);
  }, arguments);
}

export function __wbg_globalThis_e0d21cabc6630763() {
  return handleError(function () {
    var ret = globalThis.globalThis;
    return addHeapObject(ret);
  }, arguments);
}

export function __wbg_global_8463719227271676() {
  return handleError(function () {
    var ret = global.global;
    return addHeapObject(ret);
  }, arguments);
}

export function __wbindgen_is_undefined(arg0) {
  var ret = getObject(arg0) === undefined;
  return ret;
}

export function __wbg_new_59cb74e423758ede() {
  var ret = new Error();
  return addHeapObject(ret);
}

export function __wbg_stack_558ba5917b466edd(arg0, arg1) {
  var ret = getObject(arg1).stack;
  var ptr0 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
  var len0 = WASM_VECTOR_LEN;
  getInt32Memory0()[arg0 / 4 + 1] = len0;
  getInt32Memory0()[arg0 / 4 + 0] = ptr0;
}

export function __wbg_error_4bb6c2a97407129a(arg0, arg1) {
  try {
    console.error(getStringFromWasm0(arg0, arg1));
  } finally {
    wasm.__wbindgen_free(arg0, arg1);
  }
}

export function __wbindgen_string_get(arg0, arg1) {
  const obj = getObject(arg1);
  var ret = typeof obj === 'string' ? obj : undefined;
  var ptr0 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
  var len0 = WASM_VECTOR_LEN;
  getInt32Memory0()[arg0 / 4 + 1] = len0;
  getInt32Memory0()[arg0 / 4 + 0] = ptr0;
}

export function __wbindgen_throw(arg0, arg1) {
  throw new Error(getStringFromWasm0(arg0, arg1));
}

export function __wbindgen_closure_wrapper522(arg0, arg1, arg2) {
  var ret = makeMutClosure(arg0, arg1, 124, __wbg_adapter_18);
  return addHeapObject(ret);
}
