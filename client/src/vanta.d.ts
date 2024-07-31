declare module 'vanta/src/vanta.waves' {
  interface VantaEffect {
    destroy: () => void;
  }

  interface VantaConfig {
    el: HTMLElement | null;
    // Add other configuration options if needed
  }

  const WAVES: (config: VantaConfig) => VantaEffect;
  export default WAVES;
}
