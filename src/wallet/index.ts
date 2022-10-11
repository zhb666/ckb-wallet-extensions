import { getCells } from "../rpc";
import type { ScriptObject } from "../type";
import { getUnlockableAmountsFromCells } from "./dao";
import { generateAccountFromPrivateKey } from "./hd";
import { BI } from "@ckb-lumos/lumos";

async function capacityOf(lockScript: ScriptObject): Promise<BI> {
  // Convert to bi object
  let balance = BI.from(0);

  let cells = await getCells(lockScript);

  for await (const cell of cells.objects) {
    balance = balance.add(cell.cell_output.capacity);
  }
  return balance;
}

function hexDataOccupiedBytes(hex_string: string) {
  // Exclude 0x prefix, and every 2 hex digits are one byte
  return (hex_string.length - 2) / 2;
}

function scriptOccupiedBytes(script: ScriptObject) {
  if (script !== undefined && script !== null) {
    return hexDataOccupiedBytes(script.args);
  }
  return 0;
}

function cellOccupiedBytes(script: ScriptObject) {
  return 8 + 32 + 1 + 0 + 0 + scriptOccupiedBytes(script);
}

export {
  capacityOf,
  generateAccountFromPrivateKey,
  getUnlockableAmountsFromCells,
  cellOccupiedBytes
};
