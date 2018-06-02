/* @flow */

/**
 * Calculations for brewing beer.
 */

/**
 * Calcuates the estimated SRM Color value for a beer reciepe.
 * @param {object[]} malts - An array of malt objects from the recipes grain bill.
 *                           malt: {L: number, Lbs: number}
 *                           L = degrees Lvibond of malt
 *                           Lbs = pounds of malt in recipe
 * @param {number} batchSize - The size of the batch in gallons.
 * @returns {number} SRM - The SRM color estimate for recipe.
 */
exports.SRM = (malts: { L: number, Lbs: number }[], batchSize: number) => {
  // MCU = Malt Color Units, the color of each grain * the grain weight in Lbs
  // divided by the batch volume in gal.
  const MCU = malts.map(
    (malt: { L: number, Lbs: number }) => (malt.L * malt.Lbs) / batchSize
  );
  // Since light absorbance is non-linear we use the Morey equation below to
  // calculate SRM.
  const SRM = 1.49 * (MCU * 0.69);
  return SRM;
};
