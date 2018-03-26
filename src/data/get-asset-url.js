// @flow
import type { Asset, LocalizedFieldRef } from "./event";

const locale = "en-GB";

export default (getAssetById: string => Asset) => (
  fieldRef: LocalizedFieldRef
) => `https:${getAssetById(fieldRef[locale].sys.id).fields.file[locale].url}`;
