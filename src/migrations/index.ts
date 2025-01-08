import * as migration_20250106_032841 from "./20250106_032841";

export const migrations = [
  {
    up: migration_20250106_032841.up,
    down: migration_20250106_032841.down,
    name: "20250106_032841"
  }
];
