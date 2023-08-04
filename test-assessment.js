const LITERS_TO_GALLONS = 0.264172;
const GALLONS_TO_LITERS = 3.78541;
const L100_TO_MPG_CONVERSION_FACTOR = 235.215;
const KMPL_TO_MPG_CONVERSION_FACTOR = 2.352145833;

const ratesObj = {
  "USD": 1,
  "CAD": 1.26352,
  "MXN": 20.395199,
  "INR": 74.162012,
  "AUD": 1.3897,
  "GBP": 0.736085,
  "EUR": 0.88295,
  "NOK": 8.83066,
  "SEK": 9.076297,
  "DKK": 6.568406,
  "PEN": 6.568406,
  "COP": 6.568406,
  "ARS": 6.568406,
  "CLF": 6.568406,
  "CLP": 6.568406,
  "HUF": 316.914949,
  "BAM": 1.723138,
  "HRK": 6.646499,
  "ISK": 129.120168,
  "PLN": 4.01575,
  "RON": 4.365701,
  "RSD": 103.492607,
  "CHF": 0.92113,
  "ALL": 107.035875,
  "BYN": 2.578235,
  "BGN": 1.72529,
  "CZK": 21.546983,
  "MDL": 17.812498,
  "MKD": 54.365377,
  "RUB": 74.961971,
  "SOL": 6.568406,
  "BRL": 5.67,
  "TRY": 8.6
}
/*  
    @Description: converting fuelUnit i.e liter/litre to gallon OR vice-versa 
    @input
      -source: litre, gallon
      -target: litre, gallon
      -amount: number
    output: { fuelUnit: 'gallon', convertedValue: 3.698408 } / { fuelUnit: 'liter', convertedValue: 52.995740000000005 }
 */
const fuelUnitConversion = (source='liter', target='gallon', amount=14) => {
  let output = amount;
  if (['liter', 'litre'].includes(source.toLowerCase()) && target === 'gallon') {
    output = amount * LITERS_TO_GALLONS;
  } else if (source === 'gallon' && target === 'liter') {
    output = amount * GALLONS_TO_LITERS;
  }
  return {
    fuelUnit: target,
    convertedValue: parseFloat(output)
  }
};


/* 
  @Description: Currency conversion
  @input
    -Convert into requested currency 
    -rates: Object as described above
    -cost: Number
    -baseCurrency, currencyUnit: Three letter currency code // USD, INR, EUR, etc (values in rates object)
  @output: { currencyUnit: 'INR', convertedValue: 74.162012 }
*/
const currencyConversion = (rates = ratesObj, cost = 1, baseCurrency = 'USD', currencyUnit = 'INR') => {
  let convertedPrice;
  if (baseCurrency === 'USD') {
    convertedPrice = (cost * (rates[currencyUnit])) / rates.USD;
  } else if (currencyUnit === 'USD') {
    convertedPrice = cost / rates[baseCurrency];
  } else {
    const convertedPriceInUSD = cost / rates[baseCurrency];
    convertedPrice = (rates[currencyUnit] * convertedPriceInUSD);
  }
  return {
    currencyUnit,
    convertedValue: parseFloat(convertedPrice),
  };
};
/* 
  @Description: converting fuelEfficiency into US standard mpg
  @input
    -providedFuelEff: {
      city: 12,
      hwy: 8,
      units: kmpl   // Can be mpg, kmpl, l100
    }
    -country: USA, IND // Three letter country codes
  @output: { city: 28.2257, hwy: 18.817166664, units: 'mpg' }  
*/
const convertToUSMpg = (providedFuelEff, country) => {
  const mpgConversions = {
    l100: L100_TO_MPG_CONVERSION_FACTOR,
    kmpl: KMPL_TO_MPG_CONVERSION_FACTOR,
    ukMpg: 0.8327,
    mpg: 1,
  };
  const filterUnitObject = { ...providedFuelEff };
  // Converting UK mpg to US mpg
  if (filterUnitObject.units === 'mpg' && country === 'GBR') {
    filterUnitObject.city *= mpgConversions.ukMpg;
    filterUnitObject.hwy *= mpgConversions.ukMpg;
  } else if (Object.keys(mpgConversions).includes(filterUnitObject.units)) {
    if (filterUnitObject.units === 'l100') {
      filterUnitObject.city = mpgConversions[filterUnitObject.units] * filterUnitObject.city;
      filterUnitObject.hwy = mpgConversions[filterUnitObject.units] * filterUnitObject.hwy;
    } else {
      filterUnitObject.city *= mpgConversions[filterUnitObject.units];
      filterUnitObject.hwy *= mpgConversions[filterUnitObject.units];
    }
  }
  return {
    city: parseFloat((filterUnitObject.city)),
    hwy: parseFloat((filterUnitObject.hwy)),
    units: 'mpg',
  };
}

module.exports = {
  fuelUnitConversion,
  currencyConversion,
  convertToUSMpg,
  ratesObj,
  L100_TO_MPG_CONVERSION_FACTOR,
  KMPL_TO_MPG_CONVERSION_FACTOR
};
