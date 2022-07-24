define(["jquery", "underscore", "backbone"], function ($, _, Backbone) {
  //Includes all historical variants, so the API response can be prettified
  var VariantLookup = {
    variants: {
      BROGUECEV111: {
        code: "BROGUECEV111",
        display: "BrogueCE 1.11.1",
        consoleColumns: 100,
        consoleRows: 34,
        remapGlyphs: true,
        tiles: true,
        default: true,
      },
    },
  };
  return VariantLookup;
});
