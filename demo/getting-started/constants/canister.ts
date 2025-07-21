// SIWB canister ID for Sign-In With Bitcoin
export const SIWB_CANISTER_ID = 'bcxqa-kqaaa-aaaak-qotba-cai';

// Internet Computer host URLs
export const IC_HOST = {
  mainnet: 'https://ic0.app',
  local: 'http://localhost:4943',
} as const;

// Default IC host
export const DEFAULT_IC_HOST = IC_HOST.mainnet;

// Odin Trading Canister IDs by environment
export const ODIN_CANISTER_IDS = {
  development: 'w5cxm-6iaaa-aaaaj-az4jq-cai',
  staging: 'z2vm5-gaaaa-aaaaj-azw6q-cai',
  production: 'z2vm5-gaaaa-aaaaj-azw6q-cai',
} as const;

// Default canister ID (can be overridden by environment)
export const ODIN_CANISTER_ID = process.env.ODIN_CANISTER_ID || ODIN_CANISTER_IDS.development;