// @flow

export type Asset = {
  fields: {
    title: { [string]: string },
    file: {
      [string]: {
        contentType: string,
        fileName: string,
        url: string,
        details: {
          size: number,
          image: {
            height: number,
            width: number
          }
        }
      }
    }
  },
  sys: {
    id: string,
    type: "Asset",
    revision: number
  }
};
