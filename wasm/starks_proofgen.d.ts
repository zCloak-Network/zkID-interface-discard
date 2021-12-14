/* tslint:disable */
/* eslint-disable */
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
export function starks_proofgen(
  program_string: string,
  inputs_string: string,
  num_outputs: number,
  options_string: string
): string;
/**
 * @param {string} program_name
 * @param {string} inputs_string
 * @param {number} num_outputs
 * @param {string} options_string
 * @returns {string}
 */
export function starks_proofgen_with_program_name(
  program_name: string,
  inputs_string: string,
  num_outputs: number,
  options_string: string
): string;
/**
 * @param {string} program_in_assembly
 * @returns {string}
 */
export function generate_program(program_in_assembly: string): string;
/**
 * @returns {string}
 */
export function output_program_string(): string;
/**
 * @param {number} value
 * @returns {string}
 */
export function output_inputs_string(value: number): string;
/**
 * @returns {string}
 */
export function output_option_string(): string;
/**
 */
export function init_panic_hook(): void;
/**
 * Handler for `console.log` invocations.
 *
 * If a test is currently running it takes the `args` array and stringifies
 * it and appends it to the current output of the test. Otherwise it passes
 * the arguments to the original `console.log` function, psased as
 * `original`.
 * @param {Array<any>} args
 */
export function __wbgtest_console_log(args: Array<any>): void;
/**
 * Handler for `console.debug` invocations. See above.
 * @param {Array<any>} args
 */
export function __wbgtest_console_debug(args: Array<any>): void;
/**
 * Handler for `console.info` invocations. See above.
 * @param {Array<any>} args
 */
export function __wbgtest_console_info(args: Array<any>): void;
/**
 * Handler for `console.warn` invocations. See above.
 * @param {Array<any>} args
 */
export function __wbgtest_console_warn(args: Array<any>): void;
/**
 * Handler for `console.error` invocations. See above.
 * @param {Array<any>} args
 */
export function __wbgtest_console_error(args: Array<any>): void;
/**
 * Runtime test harness support instantiated in JS.
 *
 * The node.js entry script instantiates a `Context` here which is used to
 * drive test execution.
 */
export class WasmBindgenTestContext {
  free(): void;
  /**
   * Creates a new context ready to run tests.
   *
   * A `Context` is the main structure through which test execution is
   * coordinated, and this will collect output and results for all executed
   * tests.
   */
  constructor();
  /**
   * Inform this context about runtime arguments passed to the test
   * harness.
   *
   * Eventually this will be used to support flags, but for now it's just
   * used to support test filters.
   * @param {any[]} args
   */
  args(args: any[]): void;
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
  run(tests: any[]): Promise<any>;
}
