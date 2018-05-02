// @flow
import type { Asset } from "./asset";
import type { LocalizedFieldRef } from "./localized-field-ref";

import locale from "../data/locale";

export default (getAssetById: string => Asset) => (
  fieldRef: LocalizedFieldRef
) => `https:${getAssetById(fieldRef[locale].sys.id).fields.file[locale].url}`;
