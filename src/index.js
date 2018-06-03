/* @flow */

/**
 * Calculations for brewing beer.
 */

/**
 * Calcuates the estimated SRM Color value for a beer reciepe.
 * @param {object[]} malts - An array of malt objects from the recipes grain bill.
 *                           malt: {L: number, Lbs: number}
 *                           L = degrees Lovibond of malt
 *                           Lbs = pounds of malt in recipe
 * @param {number} batchSize - The size of the batch in gallons.
 * @returns {number} SRM - The SRM color estimate for recipe.
 */
exports.SRM = (malts: { L: number, Lbs: number }[], batchSize: number) => {
  // cohersing the malts param into an array, so that a single object
  // can be passed in the case of a single grain recipe.
  let maltsArray;
  if (!(malts instanceof Array)) {
    maltsArray = [malts];
  } else {
    maltsArray = malts;
  }

  // mC = maltColor, the weighted average Lovibond of all the malt in a recipe.
  const mC = maltsArray.reduce(
    (total: number, malt: { L: number, Lbs: number }) =>
      total + malt.L * malt.Lbs,
    0
  );

  // MCU = Malt Color Units, the color of each grain * the grain weight in Lbs
  // divided by the batch volume in gal.
  const MCU = mC / batchSize;

  // Since light absorbance is non-linear we use the Morey equation below to
  // calculate SRM.
  const SRM = 1.49 * (MCU * 0.69);
  if (isNaN(SRM) || SRM <= 0) {
    throw new TypeError('SRM value is invalid, check your arguments.');
  }
  return SRM;
};

exports.IBU = (hops: { boilTime: number, AAU: number }[], OG: number) => {
  const utilizationChart = {
    '51030': 0.055,
    '51040': 0.05,
    '51050': 0.046,
    '51060': 0.042,
    '51070': 0.038,
    '51080': 0.035,
    '51090': 0.032,
    '51100': 0.029,
    '51110': 0.027,
    '51120': 0.025,
    '101030': 0.1,
    '101040': 0.091,
    '101050': 0.084,
    '101060': 0.76,
    '101070': 0.07,
    '101080': 0.064,
    '101090': 0.032,
    '101100': 0.029,
    '101110': 0.027
  };
  const utilization = hops.reduce(
    (total: number, hop: { boilTime: number, AAU: number }) => {
      const uKey = `${hop.boilTime}${OG * 1000}`;
      // split the diff if OG is precise to thousandths range.
      if (!isNaN(utilizationChart[uKey])) {
        const lowerBound = Math.floor(OG / 0.01) * 0.01 * 1000;
        const upperBound = Math.ceil(OG / 0.01) * 0.01 * 1000;
      }
      return total + utilizationChart[uKey];
    },
    0
  );

  return utilization;
};
