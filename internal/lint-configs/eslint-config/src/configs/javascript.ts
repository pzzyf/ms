import type { Linter } from "eslint";
import js from '@eslint/js';

export async function javascript(): Promise<Linter.Config[]>{
  return [
    {
      rules:{
        ...js.configs.recommended.rules,
      }
    }
  ]
}
