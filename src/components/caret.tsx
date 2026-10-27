/** Terminal-style block caret. Blinks three times, then stays solid (see .caret in globals.css). */
export function Caret() {
  return <span aria-hidden="true" className="caret" />;
}
