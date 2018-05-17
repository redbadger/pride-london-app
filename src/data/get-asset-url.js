// @flow
import type { Asset, LocalizedFieldRef } from "./event";

import locale from "../data/locale";

export default (getAssetById: string => Asset) => (
  fieldRef: LocalizedFieldRef
) => `https:${getAssetById(fieldRef[locale].sys.id).fields.file[locale].url}`;
