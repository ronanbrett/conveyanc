import json from "../../ext-data/ppr.json";
import md5 from "md5";
import { PropertyRegistry } from "../../models/property-registry";
import { format, formatDistance, formatRelative, subDays } from "date-fns";

const data = json.map((property) => {
  const dateParts = property.dateOfSale.split("/");
  const price = Number(property.price.replace(/,/g, ""));
  const notFullMarketPrice =
    property.notFullMarketPrice === "Yes" ? true : false;

  const id = md5(`${property.dateOfSale}${property.address.trim()}${price}`);
  const VATExclusive = property.VATExclusive === "Yes" ? true : false;
  return {
    ...property,
    propertyListingId: id,
    dateOfSale: new Date(dateParts[2], dateParts[1] - 1, dateParts[0]),
    price,
    notFullMarketPrice,
    VATExclusive,
  };
});

export = data;
