 /**
  * PUBLIC_INTERFACE
  */
export function newId() {
  /** Generate a simple unique id using timestamp and random base36 suffix. */
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}
