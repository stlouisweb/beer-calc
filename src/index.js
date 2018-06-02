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
