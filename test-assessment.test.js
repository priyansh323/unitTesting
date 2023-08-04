
const {fuelUnitConversion,currencyConversion,convertToUSMpg,ratesObj,KMPL_TO_MPG_CONVERSION_FACTOR,L100_TO_MPG_CONVERSION_FACTOR} = require('./test-assessment')

describe('TEST CASES --> Fuel Unit Conversion' ,() => {

//***************** Fuel Unit  CONVERSION *****************

  //CHECKING IF fuelUnitConversion is a Function
try {
      test('Check if fuelUnitConversion is a function',function isValidFunction(){
        expect(fuelUnitConversion).toEqual(expect.any(Function))
        console.log("FuelUnitConversion is Valid Function")
    });
} catch (err) {
    console.log(err) 
} 

//Checking If output recieved from "If" Statement is in valid JSON Format or NOT
test('Check if Output is Valid', function isIfOutputCorrect(){
    const result = fuelUnitConversion('litre','gallon',14);
    const json = JSON.stringify(result);
    const result1=JSON.parse(json);
    expect(isValidJson(result1.convertedValue)).toBe(true);
    expect(result1.fuelUnit).toMatch(/gallon/)
})

//Checking If output recieved from " Else If" Statement is in valid JSON or NOT
test('result is in Valid format or Not In else If statement', function isElseIfOutputCorrect(){
    const output = fuelUnitConversion('gallon','litre',14);
    const json = JSON.stringify(output);
    const result=JSON.parse(json);
    expect(isValidJson(result.convertedValue)).toBe(true);
    expect(result.fuelUnit).toMatch(/litre/)
})

//Checking IF Output Value is Correct or NOT
test('result is in Valid format or Not In IF statement', function isIfOutputCorrect(){
    const result = fuelUnitConversion('litre','gallon',14);
     expect(result.convertedValue).toEqual(3.698408)
})
 
function isValidJson(jObject) {
    try {
        JSON.parse(jObject);
        return true;
    } catch {
        return false;
    }
}
});


describe('TEST CASES --> Currency Conversion',()=>{

//*****************CURRENCY CONVERSION *****************

//CHECKING IF currencyConversion is a Function
test('currencyConversion is a function',function isValidFunction(){
    expect(currencyConversion).toEqual(expect.any(Function))
})

//Check if output recieved from "IF" Statmenet is working Properly

test('result is in Valid format or Not In IF statement', function isIfOutputCorrect(){
    const result = currencyConversion(ratesObj,100,'USD','INR');
    const json = JSON.stringify(result);
    const result1=JSON.parse(json);
    expect(isValidJson(result1.convertedValue)).toBe(true);
})

// CHeck if output recieved from "Else IF" Statmenet is working Properly

test('Result is in Valid ', function isIfElseOutputCorrect(){
    const result = currencyConversion(ratesObj,100,'INR','USD');
    const json = JSON.stringify(result);
    const result1=JSON.parse(json);
    expect(isValidJson(result1.convertedValue)).toBe(true);
})

// CHeck if output recieved from "Else" Statmenet is working Properly

test('Result is in Valid ', function isElseOutputCorrect(){
    const result = currencyConversion(ratesObj,100,'INR','AUD');
    const json = JSON.stringify(result);
    const result1=JSON.parse(json);
    expect(isValidJson(result1.convertedValue)).toBe(true);
})

//Check If Formula is Correct In "IF" Statement

test('Converted Price is Correct', function isIfFormulaCorrect(){
    const result = currencyConversion(ratesObj,100,'USD','INR');
    expect(result.convertedValue).toBeCloseTo(7416.2012)
})

//Check If Formula is Correct In "ElseIF" Statement

test('Converted Price is Correct', function isElseIfFormulaCorrect(){
    const result = currencyConversion(ratesObj,100,'INR','USD');
    expect(result.convertedValue).toBeCloseTo(1.3484)
})

 
//Check If Formula is Correct In "Else" Statement

test('Converted Price is Correct', function isElseFormulaCorrect(){
    const result = currencyConversion(ratesObj,100,'INR','CAD');
    expect(result.convertedValue).toBeCloseTo(1.7038)
})

function isValidJson(jObject) {
    try {
        JSON.parse(jObject);
        return true;
    } catch {
        return false;
    }
}

})

describe('TEST CASES --> Converting Fuel Efficiency Conversion', ()=>{

    //*****************CONVERT To US Mpg *****************
   
 //CHECKING IF convertToUSMpg is a Function
test('convertToUSMpg is a function', function isValidFunction(){
    expect(convertToUSMpg).toEqual(expect.any(Function))
})


// Checks if the function return Desired Format Output or not
test('Converting FE into mpg',function isOutputValid(){
    const result =convertToUSMpg({city: 12, hwy: 8, units: 'kmpl'}, 'IND');
    const json = JSON.stringify(result);
    const result1=JSON.parse(json);
    expect(isValidJson(result1.city)).toBe(true);
})

//Checking if in function if Statement are working Properly{ units --> mpg  &  Country --> GBR}

test('If statement working Properly',function isIfWorking(){
    const result = convertToUSMpg({city: 12, hwy: 8, units: 'mpg'}, 'GBR')
    expect(result).not.toBeNull();
    expect(result.city).toBeCloseTo(9.9924)
    expect(result.hwy).toBeCloseTo(6.6616)
    expect(result.units).toEqual('mpg')
})

//Checking if in function Parameters { units --> mpg  &  Country --> INR} send working Properly

test('If statement working Properly',function mpgToMpgConversion(){
    const result = convertToUSMpg({city: 12, hwy: 8, units: 'mpg'}, 'INR')
    expect(result).not.toBeNull();
    expect(result.city).toEqual(12)
    expect(result.hwy).toEqual(8)
    expect(result.units).toEqual('mpg')
})


//Checking if in function when in ElseIf  loop "if"  Statement is working Properly

test('ElseIf (IF) statement working Properly',function isElse_IfWorking(){
     const result = convertToUSMpg({city: 12, hwy: 8, units: 'l100'}, 'IND');
     expect(result.city).toBeCloseTo(19.6012)
     expect(result.hwy).toBeCloseTo(29.4018)
     expect(result.units).toEqual('mpg')   
     //Conversion Formula is Incorrect   
  })


//Checking if in function when in ElseIf  loop "Else"  Statement is working Properly

test('ElseIf (Else)statement working Properly',function isElseIf_ElseWorking(){
    const result = convertToUSMpg({city: 12, hwy: 8, units: 'ukMpg'}, 'ENG')
    expect(result.city).toBeCloseTo(9.9924)
    expect(result.hwy).toBeCloseTo(6.6616)
    expect(result.units).toEqual('mpg')
})


function isValidJson(jObject) {
    try {
        JSON.parse(jObject);
        return true;
    } catch {
        return false;
    }
}
});




























