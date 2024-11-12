import { PartKeyTypes } from "./types";

export interface QueryResponse {
  text: string | null;
  check_status: 0 | 1 | 2;
  part_key: PartKeyTypes;
}
