// @flow
import type { Asset } from "./asset";
import type { LocalizedFieldRef } from "./localized-field-ref";

import locale from "../data/locale";

export default (getAssetById: string => Asset) => (
  fieldRef: LocalizedFieldRef
) => getAssetById(fieldRef[locale].sys.id).fields.file[locale].details.image;
