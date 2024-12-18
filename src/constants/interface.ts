import { CheckStatusTypes, PartKeyTypes } from "./types";

export interface QueryResponse {
  text: string | null;
  check_status: CheckStatusTypes;
  part_key: PartKeyTypes;
}
