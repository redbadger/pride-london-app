// @flow
import type { Asset } from "./asset";
import type { FieldRef } from "./field-ref";

import locale from "../data/locale";

export type ImageSource = {
  uri: string,
  width: number,
  height: number
};

const cache: { [string]: ImageSource } = {};

export default (getAssetById: string => Asset) => (
  fieldRef: FieldRef
): ImageSource => {
  if (!cache[fieldRef.sys.id]) {
    const asset = getAssetById(fieldRef.sys.id);
    cache[fieldRef.sys.id] = {
      uri: `https:${asset.fields.file[locale].url}`,
      width: asset.fields.file[locale].details.image.width,
      height: asset.fields.file[locale].details.image.height
    };
  }

  return cache[fieldRef.sys.id];
};
