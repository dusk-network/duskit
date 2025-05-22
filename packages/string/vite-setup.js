import crypto from "node:crypto";

/*
 * Need to set it this way for Node 20, otherwise
 * it fails saying that it can't assign to `crypto`
 * which only has a getter.
 */
Object.defineProperty(global, "crypto", {
  get() {
    return crypto;
  },
});
