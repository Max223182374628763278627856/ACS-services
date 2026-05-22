// Shared scroll state — updated every frame from inside the Canvas (R3F),
// read by HTML overlay components via requestAnimationFrame polling.
const scrollStore = { offset: 0 }
export default scrollStore
