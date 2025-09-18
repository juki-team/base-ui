export default globalThis.crypto;
export const webcrypto = globalThis.crypto;

export function randomFillSync(buffer) {
  return webcrypto.getRandomValues(buffer);
}
