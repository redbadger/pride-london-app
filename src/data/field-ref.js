// @flow
import * as decode from "../lib/decode";
import type { Decoder } from "../lib/decode";

export type FieldRef = { sys: { id: string } };

const decodeFieldRef: Decoder<FieldRef> = decode.map(
  id => ({ sys: { id } }),
  decode.at(["sys", "id"], decode.string)
);

export default decodeFieldRef;
