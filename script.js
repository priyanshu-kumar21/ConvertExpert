// Strip Drag Scroll
const strip = document.getElementById('strip');
let isDown = false;
let startX;
let scrollLeft;

// Mouse Events
strip.addEventListener('mousedown', (e) => {
    isDown = true;
    strip.classList.add('active');
    startX = e.pageX - strip.offsetLeft;
    scrollLeft = strip.scrollLeft;
});

strip.addEventListener('mouseleave', () => {
    isDown = false;
    strip.classList.remove('active');
});

strip.addEventListener('mouseup', () => {
    isDown = false;
    strip.classList.remove('active');
});

strip.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - strip.offsetLeft;
    const walk = (x - startX) * 2;
    strip.scrollLeft = scrollLeft - walk;
});

// Touch Events
strip.addEventListener('touchstart', (e) => {
    isDown = true;
    startX = e.touches[0].pageX - strip.offsetLeft;
    scrollLeft = strip.scrollLeft;
});

strip.addEventListener('touchend', () => {
    isDown = false;
});

strip.addEventListener('touchmove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.touches[0].pageX - strip.offsetLeft;
    const walk = (x - startX) * 2;
    strip.scrollLeft = scrollLeft - walk;
});

// Conversion Functions
function showConverter() {
    document.querySelector('.hero').style.display = 'none';
    document.getElementById('conversionSection').style.display = 'flex';
}

function showWelcome() {
    document.querySelector('.hero').style.display = 'flex';
    document.getElementById('conversionSection').style.display = 'none';
}

function convertNumber() {
    const numberInput = document.getElementById('numberInput').value.toUpperCase();
    const fromBase = parseInt(document.getElementById('fromBase').value);
    const toBase = parseInt(document.getElementById('toBase').value);
    
    try {
        if(fromBase === 16 && !/^[0-9A-F]+$/.test(numberInput)) {
            throw new Error('Invalid hex input');
        }

        const decimalValue = parseInt(numberInput, fromBase);
        if(isNaN(decimalValue)) throw new Error('Invalid input');
        
        document.getElementById('resultOutput').value = decimalValue.toString(toBase).toUpperCase();
    } catch(error) {
        document.getElementById('resultOutput').value = 'Invalid Input!';
    }
}

// Event Listeners
document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('click', function() {
        if(this.textContent.toLowerCase() === 'number system') {
            showConverter();
        }
    });
});

// Age Calculator Functions
function showAgeCalculator() {
    document.querySelector('.hero').style.display = 'none';
    document.getElementById('ageSection').style.display = 'flex';
    document.getElementById('birthDate').max = new Date().toISOString().split('T')[0];
}

function calculateAge() {
    const birthDate = new Date(document.getElementById('birthDate').value);
    const today = new Date();
    
    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    if (days < 0) {
        months--;
        days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }
    
    if (months < 0) {
        years--;
        months += 12;
    }

    document.getElementById('years').textContent = years;
    document.getElementById('months').textContent = months;
    document.getElementById('days').textContent = days;
}

// Event Listener Update
document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('click', function() {
        if(this.textContent.toLowerCase() === 'number system') {
            showConverter();
        }
        if(this.textContent.toLowerCase() === 'age') {
            showAgeCalculator();
        }
    });
});
// नया फंक्शन जोड़ें
function hideAllSections() {
    document.querySelector('.hero').style.display = 'none';
    document.getElementById('conversionSection').style.display = 'none';
    document.getElementById('ageSection').style.display = 'none';
    document.getElementById('tempSection').style.display = 'none'; 
}

// सभी show फंक्शन्स अपडेट करें
function showConverter() {
    hideAllSections();
    document.getElementById('conversionSection').style.display = 'flex';
}

function showAgeCalculator() {
    hideAllSections();
    document.getElementById('ageSection').style.display = 'flex';
    document.getElementById('birthDate').max = new Date().toISOString().split('T')[0];
}

function showWelcome() {
    hideAllSections();
    document.querySelector('.hero').style.display = 'flex';
}
// Temperature Conversion Functions
function showTempConverter() {
    hideAllSections();
    document.getElementById('tempSection').style.display = 'flex';
}

function convertTemperature(sourceUnit) {
    const celsius = document.getElementById('celsius');
    const fahrenheit = document.getElementById('fahrenheit');
    const kelvin = document.getElementById('kelvin');

    try {
        let c, f, k;
        
        switch(sourceUnit) {
            case 'celsius':
                c = parseFloat(celsius.value);
                f = (c * 9/5) + 32;
                k = c + 273.15;
                break;
                
            case 'fahrenheit':
                f = parseFloat(fahrenheit.value);
                c = (f - 32) * 5/9;
                k = c + 273.15;
                break;
                
            case 'kelvin':
                k = parseFloat(kelvin.value);
                c = k - 273.15;
                f = (c * 9/5) + 32;
                break;
        }

        if(isNaN(c)) throw new Error('Invalid input');
        
        celsius.value = c.toFixed(2);
        fahrenheit.value = f.toFixed(2);
        kelvin.value = k.toFixed(2);
    } catch {
        clearTemperatures();
    }
}

function clearTemperatures() {
    document.getElementById('celsius').value = '';
    document.getElementById('fahrenheit').value = '';
    document.getElementById('kelvin').value = '';
}

// Event Listeners जोड़ें
document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('click', function() {
        if(this.textContent.toLowerCase() === 'temperature') {
            showTempConverter();
        }
    });
});

// Input Fields के लिए Real-time Conversion
document.getElementById('celsius').addEventListener('input', () => convertTemperature('celsius'));
document.getElementById('fahrenheit').addEventListener('input', () => convertTemperature('fahrenheit'));
document.getElementById('kelvin').addEventListener('input', () => convertTemperature('kelvin'));

function validateNumber(input) {
    // सिर्फ नंबर्स और दशमलव को ही रखें
    input.value = input.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
}

// Length Conversion Functions
function showLengthConverter() {
    hideAllSections();
    document.getElementById('lengthSection').style.display = 'flex';
}

// Conversion Factors (in meters)
const lengthFactors = {
    mm: 0.001,
    cm: 0.01,
    m: 1,
    km: 1000,
    miles: 1609.34,
    inches: 0.0254,
    feet: 0.3048
};

function convertLength() {
    const inputValue = parseFloat(document.getElementById('inputValue').value);
    const fromUnit = document.getElementById('fromUnit').value;
    const toUnit = document.getElementById('toUnit').value;

    try {
        if(isNaN(inputValue)) throw new Error('Invalid input');
        
        // Convert to meters first
        const meters = inputValue * lengthFactors[fromUnit];
        // Convert to target unit
        const result = meters / lengthFactors[toUnit];
        
        document.getElementById('resultValue').value = result.toFixed(2);
    } catch {
        document.getElementById('resultValue').value = 'Invalid Input!';
    }
}

// Real-time Conversion
document.getElementById('inputValue').addEventListener('input', convertLength);
document.getElementById('fromUnit').addEventListener('change', convertLength);
document.getElementById('toUnit').addEventListener('change', convertLength);

// Event Listener Update
document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('click', function() {
        if(this.textContent.toLowerCase() === 'length') {
            showLengthConverter();
        }
    });
});

// Hide All Sections Update
function hideAllSections() {
    document.querySelector('.hero').style.display = 'none';
    document.getElementById('conversionSection').style.display = 'none';
    document.getElementById('ageSection').style.display = 'none';
    document.getElementById('tempSection').style.display = 'none';
    document.getElementById('lengthSection').style.display = 'none';
}

// Area Conversion Functions
function showAreaConverter() {
    hideAllSections();
    document.getElementById('areaSection').style.display = 'flex';
}

// Conversion Factors (in square meters)
const areaFactors = {
    cm2: 0.0001,    // 1 cm² = 0.0001 m²
    ft2: 0.092903,  // 1 sq.ft = 0.092903 m²
    in2: 0.00064516,// 1 sq.in = 0.00064516 m²
    m2: 1           // Base unit
};

function convertArea() {
    const input = parseFloat(document.getElementById('areaInput').value);
    const fromUnit = document.getElementById('areaFrom').value;
    const toUnit = document.getElementById('areaTo').value;

    try {
        if(isNaN(input)) throw new Error('Invalid input');
        
        // Convert to square meters first
        const sqMeters = input * areaFactors[fromUnit];
        // Convert to target unit
        const result = sqMeters / areaFactors[toUnit];
        
        document.getElementById('areaResult').value = result.toFixed(4);
    } catch {
        document.getElementById('areaResult').value = 'Invalid Input!';
    }
}

// Real-time Conversion
document.getElementById('areaInput').addEventListener('input', convertArea);
document.getElementById('areaFrom').addEventListener('change', convertArea);
document.getElementById('areaTo').addEventListener('change', convertArea);

// Event Listener Update
document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('click', function() {
        if(this.textContent.toLowerCase() === 'area') {
            showAreaConverter();
        }
    });
});

// Hide All Sections Update
function hideAllSections() {
    document.querySelector('.hero').style.display = 'none';
    document.getElementById('conversionSection').style.display = 'none';
    document.getElementById('ageSection').style.display = 'none';
    document.getElementById('tempSection').style.display = 'none';
    document.getElementById('lengthSection').style.display = 'none';
    document.getElementById('areaSection').style.display = 'none'; // यह लाइन जोड़ें
}

// Volume Conversion Functions
function showVolumeConverter() {
    hideAllSections();
    document.getElementById('volumeSection').style.display = 'flex';
}

// Conversion Factors (in liters)
const volumeFactors = {
    ukgal: 4.54609,    // 1 UK gallon = 4.54609 L
    usgal: 3.78541,     // 1 US gallon = 3.78541 L
    l: 1,               // Base unit
    ml: 0.001           // 1 mL = 0.001 L
};

function convertVolume() {
    const input = parseFloat(document.getElementById('volInput').value);
    const fromUnit = document.getElementById('volFrom').value;
    const toUnit = document.getElementById('volTo').value;

    try {
        if(isNaN(input)) throw new Error('Invalid input');
        
        // Convert to liters first
        const liters = input * volumeFactors[fromUnit];
        // Convert to target unit
        const result = liters / volumeFactors[toUnit];
        
        document.getElementById('volResult').value = result.toFixed(4);
    } catch {
        document.getElementById('volResult').value = 'Invalid Input!';
    }
}

// Real-time Conversion
document.getElementById('volInput').addEventListener('input', convertVolume);
document.getElementById('volFrom').addEventListener('change', convertVolume);
document.getElementById('volTo').addEventListener('change', convertVolume);

// Event Listener Update
document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('click', function() {
        if(this.textContent.toLowerCase() === 'volume') {
            showVolumeConverter();
        }
    });
});

// Hide All Sections Update
function hideAllSections() {
    document.querySelector('.hero').style.display = 'none';
    document.getElementById('conversionSection').style.display = 'none';
    document.getElementById('ageSection').style.display = 'none';
    document.getElementById('tempSection').style.display = 'none';
    document.getElementById('lengthSection').style.display = 'none';
    document.getElementById('areaSection').style.display = 'none';
    document.getElementById('volumeSection').style.display = 'none'; // यह लाइन जोड़ें
}
// Mass Conversion Functions
function showMassConverter() {
    hideAllSections();
    document.getElementById('massSection').style.display = 'flex';
}

// Conversion Factors (in kilograms)
const massFactors = {
    g: 0.001,       // 1 gram = 0.001 kg
    kg: 1,          // Base unit
    lb: 0.453592,   // 1 pound = 0.453592 kg
    t: 1000         // 1 metric ton = 1000 kg
};

function convertMass() {
    const input = parseFloat(document.getElementById('massInput').value);
    const fromUnit = document.getElementById('massFrom').value;
    const toUnit = document.getElementById('massTo').value;

    try {
        if(isNaN(input)) throw new Error('Invalid input');
        
        // Convert to kilograms first
        const kg = input * massFactors[fromUnit];
        // Convert to target unit
        const result = kg / massFactors[toUnit];
        
        document.getElementById('massResult').value = result.toFixed(4);
    } catch {
        document.getElementById('massResult').value = 'Invalid Input!';
    }
}

// Real-time Conversion
document.getElementById('massInput').addEventListener('input', convertMass);
document.getElementById('massFrom').addEventListener('change', convertMass);
document.getElementById('massTo').addEventListener('change', convertMass);

// Event Listener Update
document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('click', function() {
        if(this.textContent.toLowerCase() === 'mass') {
            showMassConverter();
        }
    });
});

// Hide All Sections Update
function hideAllSections() {
    document.querySelector('.hero').style.display = 'none';
    document.getElementById('conversionSection').style.display = 'none';
    document.getElementById('ageSection').style.display = 'none';
    document.getElementById('tempSection').style.display = 'none';
    document.getElementById('lengthSection').style.display = 'none';
    document.getElementById('areaSection').style.display = 'none';
    document.getElementById('volumeSection').style.display = 'none';
    document.getElementById('massSection').style.display = 'none'; // यह लाइन जोड़ें
}
// Data Conversion Functions
function showDataConverter() {
    hideAllSections();
    document.getElementById('dataSection').style.display = 'flex';
}

// Conversion Factors (in bytes)
const dataFactors = {
    bit: 0.125,         // 1 bit = 0.125 bytes
    B: 1,               // 1 byte = 1 byte
    KB: 1024,           // 1 kilobyte = 1024 bytes
    MB: 1024 * 1024,    // 1 megabyte
    GB: 1024 ** 3,      // 1 gigabyte
    TB: 1024 ** 4       // 1 terabyte
};

function convertData() {
    const input = parseFloat(document.getElementById('dataInput').value);
    const fromUnit = document.getElementById('dataFrom').value;
    const toUnit = document.getElementById('dataTo').value;

    try {
        if(isNaN(input)) throw new Error('Invalid input');
        
        // Convert to bytes first
        const bytes = input * dataFactors[fromUnit];
        // Convert to target unit
        const result = bytes / dataFactors[toUnit];
        
        document.getElementById('dataResult').value = result.toFixed(6);
    } catch {
        document.getElementById('dataResult').value = 'Invalid Input!';
    }
}

// Real-time Conversion
document.getElementById('dataInput').addEventListener('input', convertData);
document.getElementById('dataFrom').addEventListener('change', convertData);
document.getElementById('dataTo').addEventListener('change', convertData);

// Event Listener Update
document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('click', function() {
        if(this.textContent.toLowerCase() === 'data') {
            showDataConverter();
        }
    });
});

// Hide All Sections Update
function hideAllSections() {
    document.querySelector('.hero').style.display = 'none';
    document.getElementById('conversionSection').style.display = 'none';
    document.getElementById('ageSection').style.display = 'none';
    document.getElementById('tempSection').style.display = 'none';
    document.getElementById('lengthSection').style.display = 'none';
    document.getElementById('areaSection').style.display = 'none';
    document.getElementById('volumeSection').style.display = 'none';
    document.getElementById('massSection').style.display = 'none';
    document.getElementById('dataSection').style.display = 'none'; // यह लाइन जोड़ें
}
// Speed Conversion Functions
function showSpeedConverter() {
    hideAllSections();
    document.getElementById('speedSection').style.display = 'flex';
}

// Conversion Factors (m/s में)
const speedFactors = {
    ms: 1,          // 1 m/s = 1 m/s
    mh: 0.000277778,// 1 m/h = 1/3600 m/s
    kms: 1000,      // 1 km/s = 1000 m/s
    kmh: 0.277778,  // 1 km/h = 1000m/3600s
    ins: 0.0254,    // 1 in/s = 0.0254 m/s
    inh: 0.00000705556, // 1 in/h = 0.0254m/3600s
    fts: 0.3048,    // 1 ft/s = 0.3048 m/s
    fth: 0.0000846667, // 1 ft/h = 0.3048m/3600s
    mis: 1609.34,   // 1 mi/s = 1609.34 m/s
    mih: 0.44704    // 1 mph = 1609.34m/3600s
};

function convertSpeed() {
    const input = parseFloat(document.getElementById('speedInput').value);
    const fromUnit = document.getElementById('speedFrom').value;
    const toUnit = document.getElementById('speedTo').value;

    try {
        if(isNaN(input)) throw new Error('Invalid input');
        
        // Convert to m/s first
        const msVal = input * speedFactors[fromUnit];
        // Convert to target unit
        const result = msVal / speedFactors[toUnit];
        
        document.getElementById('speedResult').value = result.toFixed(6);
    } catch {
        document.getElementById('speedResult').value = 'Invalid Input!';
    }
}

// Real-time Conversion
document.getElementById('speedInput').addEventListener('input', convertSpeed);
document.getElementById('speedFrom').addEventListener('change', convertSpeed);
document.getElementById('speedTo').addEventListener('change', convertSpeed);

// Event Listener Update
document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('click', function() {
        if(this.textContent.toLowerCase() === 'speed') {
            showSpeedConverter();
        }
    });
});

// Hide All Sections Update
function hideAllSections() {
    document.querySelector('.hero').style.display = 'none';
    document.getElementById('conversionSection').style.display = 'none';
    document.getElementById('ageSection').style.display = 'none';
    document.getElementById('tempSection').style.display = 'none';
    document.getElementById('lengthSection').style.display = 'none';
    document.getElementById('areaSection').style.display = 'none';
    document.getElementById('volumeSection').style.display = 'none';
    document.getElementById('massSection').style.display = 'none';
    document.getElementById('dataSection').style.display = 'none'; 
    document.getElementById('speedSection').style.display = 'none'; // यह लाइन जोड़ें
}
// Time Conversion Functions
function showTimeConverter() {
    hideAllSections();
    document.getElementById('timeSection').style.display = 'flex';
}

// Conversion Factors (in seconds)
const timeFactors = {
    ms: 0.001,      // 1 millisecond = 0.001 seconds
    s: 1,           // Base unit
    min: 60,        // 1 minute = 60 seconds
    h: 3600,        // 1 hour = 3600 seconds
    d: 86400,       // 1 day = 86400 seconds
    wk: 604800      // 1 week = 604800 seconds
};

function convertTime() {
    const input = parseFloat(document.getElementById('timeInput').value);
    const fromUnit = document.getElementById('timeFrom').value;
    const toUnit = document.getElementById('timeTo').value;

    try {
        if(isNaN(input)) throw new Error('Invalid input');
        
        // Convert to seconds first
        const seconds = input * timeFactors[fromUnit];
        // Convert to target unit
        const result = seconds / timeFactors[toUnit];
        
        document.getElementById('timeResult').value = result.toFixed(4);
    } catch {
        document.getElementById('timeResult').value = 'Invalid Input!';
    }
}

// Real-time Conversion
document.getElementById('timeInput').addEventListener('input', convertTime);
document.getElementById('timeFrom').addEventListener('change', convertTime);
document.getElementById('timeTo').addEventListener('change', convertTime);

// Event Listener Update
document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('click', function() {
        if(this.textContent.toLowerCase() === 'time') {
            showTimeConverter();
        }
    });
});

// Hide All Sections Update
function hideAllSections() {
    document.querySelector('.hero').style.display = 'none';
    document.getElementById('conversionSection').style.display = 'none';
    document.getElementById('ageSection').style.display = 'none';
    document.getElementById('tempSection').style.display = 'none';
    document.getElementById('lengthSection').style.display = 'none';
    document.getElementById('areaSection').style.display = 'none';
    document.getElementById('volumeSection').style.display = 'none';
    document.getElementById('massSection').style.display = 'none';
    document.getElementById('dataSection').style.display = 'none'; 
    document.getElementById('speedSection').style.display = 'none'; 
    document.getElementById('timeSection').style.display = 'none'; 
}
// Angle Conversion Functions
function showAngleConverter() {
    hideAllSections();
    document.getElementById('angleSection').style.display = 'flex';
}

// Conversion Factors (in degrees)
const angleFactors = {
    degree: 1,          // Base unit
    radian: 57.2957795, // 1 radian = 180/π ≈ 57.2958°
    minute: 1/60,       // 1 minute = 1/60°
    second: 1/3600,     // 1 second = 1/3600°
    octant: 45,         // 1 octant = 45° (360/8)
    quadrant: 90,       // 1 quadrant = 90° (360/4)
    circle: 360         // 1 circle = 360°
};

function convertAngle() {
    const input = parseFloat(document.getElementById('angleInput').value);
    const fromUnit = document.getElementById('angleFrom').value;
    const toUnit = document.getElementById('angleTo').value;

    try {
        if(isNaN(input)) throw new Error('Invalid input');
        
        // Convert to degrees first
        const degrees = input * angleFactors[fromUnit];
        // Convert to target unit
        const result = degrees / angleFactors[toUnit];
        
        document.getElementById('angleResult').value = result.toFixed(6);
    } catch {
        document.getElementById('angleResult').value = 'Invalid Input!';
    }
}

// Real-time Conversion
document.getElementById('angleInput').addEventListener('input', convertAngle);
document.getElementById('angleFrom').addEventListener('change', convertAngle);
document.getElementById('angleTo').addEventListener('change', convertAngle);

// Event Listener Update
document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('click', function() {
        if(this.textContent.toLowerCase() === 'angle') {
            showAngleConverter();
        }
    });
});

// Hide All Sections Update
function hideAllSections() {
    document.querySelector('.hero').style.display = 'none';
    document.getElementById('conversionSection').style.display = 'none';
    document.getElementById('ageSection').style.display = 'none';
    document.getElementById('tempSection').style.display = 'none';
    document.getElementById('lengthSection').style.display = 'none';
    document.getElementById('areaSection').style.display = 'none';
    document.getElementById('volumeSection').style.display = 'none';
    document.getElementById('massSection').style.display = 'none';
    document.getElementById('dataSection').style.display = 'none'; 
    document.getElementById('speedSection').style.display = 'none'; 
    document.getElementById('timeSection').style.display = 'none'; 

    document.getElementById('angleSection').style.display = 'none';
    
}
// Complement Conversion Functions
function showCompConverter() {
    hideAllSections();
    document.getElementById('compSection').style.display = 'flex';
}

function validateBinary(binary) {
    return /^[01]+$/.test(binary);
}

function calculate1sComplement(binary) {
    return binary.split('').map(bit => bit === '0' ? '1' : '0').join('');
}

function calculate2sComplement(binary) {
    const onesComp = calculate1sComplement(binary);
    let twosComp = '';
    let carry = 1;
    
    for(let i = onesComp.length-1; i >= 0; i--) {
        const bit = onesComp[i];
        if(carry) {
            if(bit === '1') {
                twosComp = '0' + twosComp;
            } else {
                twosComp = '1' + twosComp;
                carry = 0;
            }
        } else {
            twosComp = bit + twosComp;
        }
    }
    
    return twosComp;
}

function convertComplement() {
    const input = document.getElementById('binaryInput').value.replace(/\s/g, '');
    const compType = document.getElementById('compType').value;
    const resultType = document.getElementById('resultType').value;
    
    try {
        if(!validateBinary(input)) throw new Error('Invalid binary number');
        if(input === '') throw new Error('Empty input');
        
        let result;
        // Calculate complement
        if(compType === '1s') {
            result = calculate1sComplement(input);
        } else {
            result = calculate2sComplement(input);
        }
        
        // Convert to decimal if needed
        if(resultType === 'decimal') {
            result = parseInt(result, 2).toString(10);
        }
        
        document.getElementById('compResult').value = result;
    } catch(error) {
        document.getElementById('compResult').value = error.message;
    }
}

// Event Listeners
document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('click', function() {
        if(this.textContent.toLowerCase() === 'complement') {
            showCompConverter();
        }
    });
});

// Hide All Sections Update
function hideAllSections() {
    document.querySelector('.hero').style.display = 'none';
    document.getElementById('conversionSection').style.display = 'none';
    document.getElementById('ageSection').style.display = 'none';
    document.getElementById('tempSection').style.display = 'none';
    document.getElementById('lengthSection').style.display = 'none';
    document.getElementById('areaSection').style.display = 'none';
    document.getElementById('volumeSection').style.display = 'none';
    document.getElementById('massSection').style.display = 'none';
    document.getElementById('dataSection').style.display = 'none'; 
    document.getElementById('speedSection').style.display = 'none'; 
    document.getElementById('timeSection').style.display = 'none'; 
    document.getElementById('angleSection').style.display = 'none';
    document.getElementById('compSection').style.display = 'none';
}// यह लाइन जोड़ें

// Energy Conversion Functions
function showEnergyConverter() {
    hideAllSections();
    document.getElementById('energySection').style.display = 'flex';
}

// Conversion Factors (in Joules)
const energyFactors = {
    J: 1,
    KJ: 1000,
    MJ: 1e6,
    cal: 4.184,          // 1 thermochemical calorie
    eV: 1.60218e-19,     // 1 electronvolt
    BTU: 1055.06,        // 1 International Table BTU
    hph: 2.68452e6,     // 1 mechanical horsepower-hour
    kWh: 3.6e6          // 1 kilowatt-hour
};

function convertEnergy() {
    const input = parseFloat(document.getElementById('energyInput').value);
    const fromUnit = document.getElementById('energyFrom').value;
    const toUnit = document.getElementById('energyTo').value;

    try {
        if(isNaN(input)) throw new Error('Invalid input');
        
        const joules = input * energyFactors[fromUnit];
        const result = joules / energyFactors[toUnit];
        
        const formattedResult = Math.abs(result) < 1e-6 || Math.abs(result) > 1e6 
            ? result.toExponential(4) 
            : result.toFixed(4);
        
        document.getElementById('energyResult').value = formattedResult;
    } catch {
        document.getElementById('energyResult').value = 'Invalid Input!';
    }
}

document.getElementById('energyInput').addEventListener('input', convertEnergy);
document.getElementById('energyFrom').addEventListener('change', convertEnergy);
document.getElementById('energyTo').addEventListener('change', convertEnergy);

document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('click', function() {
        if(this.textContent.toLowerCase() === 'energy') {
            showEnergyConverter();
        }
    });
});

function hideAllSections() {
    document.querySelector('.hero').style.display = 'none';
    document.getElementById('conversionSection').style.display = 'none';
    document.getElementById('ageSection').style.display = 'none';
    document.getElementById('tempSection').style.display = 'none';
    document.getElementById('lengthSection').style.display = 'none';
    document.getElementById('areaSection').style.display = 'none';
    document.getElementById('volumeSection').style.display = 'none';
    document.getElementById('massSection').style.display = 'none';
    document.getElementById('dataSection').style.display = 'none'; 
    document.getElementById('speedSection').style.display = 'none'; 
    document.getElementById('timeSection').style.display = 'none'; 
    document.getElementById('angleSection').style.display = 'none';
    document.getElementById('compSection').style.display = 'none';  
    document.getElementById('powerSection').style.display = 'none';
}
function showPressureConverter() {
    hideAllSections();
    document.getElementById('pressureSection').style.display = 'flex';
}

const pressureFactors = {
    Pa: 1,
    kPa: 1000,
    psi: 6894.76,
    ksi: 6894760,
    bar: 100000,
    torr: 133.322,
    atm: 101325
};

function convertPressure() {
    const input = parseFloat(document.getElementById('pressureInput').value);
    const fromUnit = document.getElementById('pressureFrom').value;
    const toUnit = document.getElementById('pressureTo').value;

    try {
        if(isNaN(input)) throw new Error('Invalid input');
        
        
        const pascals = input * pressureFactors[fromUnit];
        
        const result = pascals / pressureFactors[toUnit];
        
        document.getElementById('pressureResult').value = result.toFixed(4);
    } catch {
        document.getElementById('pressureResult').value = 'Invalid Input!';
    }
}


document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('click', function() {
        if(this.textContent.toLowerCase() === 'pressure') {
            showPressureConverter();
        }
    });
});


function hideAllSections() {
    document.querySelector('.hero').style.display = 'none';
    document.getElementById('conversionSection').style.display = 'none';
    document.getElementById('ageSection').style.display = 'none';
    document.getElementById('tempSection').style.display = 'none';
    document.getElementById('lengthSection').style.display = 'none';
    document.getElementById('areaSection').style.display = 'none';
    document.getElementById('volumeSection').style.display = 'none';
    document.getElementById('massSection').style.display = 'none';
    document.getElementById('dataSection').style.display = 'none'; 
    document.getElementById('speedSection').style.display = 'none'; 
    document.getElementById('timeSection').style.display = 'none'; 
    document.getElementById('angleSection').style.display = 'none';
    document.getElementById('compSection').style.display = 'none';  
    document.getElementById('powerSection').style.display = 'none';
    document.getElementById('pressureSection').style.display = 'none';
}

function showPowerConverter() {
    hideAllSections();
    document.getElementById('powerSection').style.display = 'flex';
}


const powerFactors = {
    W: 1,
    kW: 1000,
    MW: 1000000,
    hp: 745.7,          
    MBH: 293.071         
};

function convertPower() {
    const input = parseFloat(document.getElementById('powerInput').value);
    const fromUnit = document.getElementById('powerFrom').value;
    const toUnit = document.getElementById('powerTo').value;

    try {
        if(isNaN(input)) throw new Error('Invalid input');
        
       
        const watts = input * powerFactors[fromUnit];
       
        const result = watts / powerFactors[toUnit];
        
        document.getElementById('powerResult').value = result.toFixed(4);
    } catch {
        document.getElementById('powerResult').value = 'Invalid Input!';
    }
}


document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('click', function() {
        const text = this.textContent.toLowerCase();
        if(text === 'energy') showEnergyConverter(); 
        if(text === 'power') showPowerConverter();   
    });
});



function hideAllSections() {
    document.querySelector('.hero').style.display = 'none';
    document.getElementById('conversionSection').style.display = 'none';
    document.getElementById('ageSection').style.display = 'none';
    document.getElementById('tempSection').style.display = 'none';
    document.getElementById('lengthSection').style.display = 'none';
    document.getElementById('areaSection').style.display = 'none';
    document.getElementById('volumeSection').style.display = 'none';
    document.getElementById('massSection').style.display = 'none';
    document.getElementById('dataSection').style.display = 'none'; 
    document.getElementById('speedSection').style.display = 'none'; 
    document.getElementById('timeSection').style.display = 'none'; 
    document.getElementById('angleSection').style.display = 'none';
    document.getElementById('compSection').style.display = 'none';  
    document.getElementById('powerSection').style.display = 'none';
    document.getElementById('pressureSection').style.display = 'none';
    document.getElementById('powerSection').style.display = 'none';
    document.getElementById('energySection').style.display = 'none';
    document.getElementById('powerSection').style.display = 'none';
}


function showWeightConverter() {
    hideAllSections();
    document.getElementById('weightSection').style.display = 'flex';
}


const weightFactors = {
    mg: 0.001,
    g: 1,
    kg: 1000,
    oz: 28.3495,        
    st: 6350.29,       
    ct: 0.2,           
    dwt: 1.55517,       
    gr: 0.0647989      
};

function convertWeight() {
    const input = parseFloat(document.getElementById('weightInput').value);
    const fromUnit = document.getElementById('weightFrom').value;
    const toUnit = document.getElementById('weightTo').value;

    try {
        if(isNaN(input)) throw new Error('Invalid input');
        
        const grams = input * weightFactors[fromUnit];
        const result = grams / weightFactors[toUnit];
        
        document.getElementById('weightResult').value = result.toFixed(6);
    } catch {
        document.getElementById('weightResult').value = 'Invalid Input!';
    }
}

document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('click', function() {
        if(this.textContent.toLowerCase() === 'weight') {
            showWeightConverter();
        }
    });
});

function hideAllSections() {
    document.querySelector('.hero').style.display = 'none';
    document.getElementById('conversionSection').style.display = 'none';
    document.getElementById('ageSection').style.display = 'none';
    document.getElementById('tempSection').style.display = 'none';
    document.getElementById('lengthSection').style.display = 'none';
    document.getElementById('areaSection').style.display = 'none';
    document.getElementById('volumeSection').style.display = 'none';
    document.getElementById('massSection').style.display = 'none';
    document.getElementById('dataSection').style.display = 'none'; 
    document.getElementById('speedSection').style.display = 'none'; 
    document.getElementById('timeSection').style.display = 'none'; 
    document.getElementById('angleSection').style.display = 'none';
    document.getElementById('compSection').style.display = 'none';  
    document.getElementById('powerSection').style.display = 'none';
    document.getElementById('pressureSection').style.display = 'none';
    document.getElementById('powerSection').style.display = 'none';
    document.getElementById('energySection').style.display = 'none';
    document.getElementById('powerSection').style.display = 'none';
    document.getElementById('weightSection').style.display = 'none';
}

function showForcesConverter() {
    hideAllSections();
    document.getElementById('forcesSection').style.display = 'flex';
}

const forcesFactors = {
    N: 1,
    kN: 1000,
    gf: 0.00980665,    // 1 gram-force
    kgf: 9.80665,      // 1 kilogram-force
    
    dyn: 0.00001,      // 1 dyne = 1e-5 N
    p: 0.00980665,     // 1 pond = 1 gram-force
    
    pdl: 0.138255,     // 1 poundal
    lbf: 4.44822,      // 1 pound-force
    tf: 9806.65,       // 1 ton-force (metric)
    ozf: 0.278014      // 1 ounce-force
};

function convertForces() {
    const input = parseFloat(document.getElementById('forceInput').value);
    const fromUnit = document.getElementById('forceFrom').value;
    const toUnit = document.getElementById('forceTo').value;

    try {
        if(isNaN(input)) throw new Error('Invalid input');
        
        const newtons = input * forcesFactors[fromUnit];
        const result = newtons / forcesFactors[toUnit];
        
        document.getElementById('forceResult').value = result.toFixed(6);
    } catch {
        document.getElementById('forceResult').value = 'Invalid Input!';
    }
}

document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('click', function() {
        if(this.textContent.toLowerCase() === 'forces') {
            showForcesConverter();
        }
    });
});

function hideAllSections() {
    document.querySelector('.hero').style.display = 'none';
    document.getElementById('conversionSection').style.display = 'none';
    document.getElementById('ageSection').style.display = 'none';
    document.getElementById('tempSection').style.display = 'none';
    document.getElementById('lengthSection').style.display = 'none';
    document.getElementById('areaSection').style.display = 'none';
    document.getElementById('volumeSection').style.display = 'none';
    document.getElementById('massSection').style.display = 'none';
    document.getElementById('dataSection').style.display = 'none'; 
    document.getElementById('speedSection').style.display = 'none'; 
    document.getElementById('timeSection').style.display = 'none'; 
    document.getElementById('angleSection').style.display = 'none';
    document.getElementById('compSection').style.display = 'none';  
    document.getElementById('powerSection').style.display = 'none';
    document.getElementById('pressureSection').style.display = 'none';
    document.getElementById('powerSection').style.display = 'none';
    document.getElementById('energySection').style.display = 'none';
    document.getElementById('powerSection').style.display = 'none';
    document.getElementById('weightSection').style.display = 'none';
    document.getElementById('forcesSection').style.display = 'none';
}

function showChargeConverter() {
    hideAllSections();
    document.getElementById('chargeSection').style.display = 'flex';
}

const chargeFactors = {
    C: 1,
    Ah: 3600,           // 1 Ah = 1A × 3600s = 3600 C
    mAh: 3.6,           // 1 mAh = 0.001Ah × 3600 = 3.6 C
    F: 96485.332,       // 1 Faraday = Avogadro × e ≈ 96485.332 C
    
    statC: 3.3356e-10,  // 1 statcoulomb ≈ 3.3356×10^-10 C
    e: 1.602176634e-19, // 1 elementary charge (exact value)
    
    Fr: 3.3356e-10,     
    esu: 3.3356e-10     
};

function convertCharge() {
    const input = parseFloat(document.getElementById('chargeInput').value);
    const fromUnit = document.getElementById('chargeFrom').value;
    const toUnit = document.getElementById('chargeTo').value;

    try {
        if(isNaN(input)) throw new Error('Invalid input');
        
        const coulombs = input * chargeFactors[fromUnit];
        const result = coulombs / chargeFactors[toUnit];
        
        document.getElementById('chargeResult').value = result.toExponential(4);
    } catch {
        document.getElementById('chargeResult').value = 'Invalid Input!';
    }
}

document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('click', function() {
        if(this.textContent.toLowerCase() === 'charge') {
            showChargeConverter();
        }
    });
});

// HideAllSections में जोड़ें
function hideAllSections() {
    document.querySelector('.hero').style.display = 'none';
    document.getElementById('conversionSection').style.display = 'none';
    document.getElementById('ageSection').style.display = 'none';
    document.getElementById('tempSection').style.display = 'none';
    document.getElementById('lengthSection').style.display = 'none';
    document.getElementById('areaSection').style.display = 'none';
    document.getElementById('volumeSection').style.display = 'none';
    document.getElementById('massSection').style.display = 'none';
    document.getElementById('dataSection').style.display = 'none'; 
    document.getElementById('speedSection').style.display = 'none'; 
    document.getElementById('timeSection').style.display = 'none'; 
    document.getElementById('angleSection').style.display = 'none';
    document.getElementById('compSection').style.display = 'none';  
    document.getElementById('powerSection').style.display = 'none';
    document.getElementById('pressureSection').style.display = 'none';
    document.getElementById('powerSection').style.display = 'none';
    document.getElementById('energySection').style.display = 'none';
    document.getElementById('powerSection').style.display = 'none';
    document.getElementById('weightSection').style.display = 'none';
    document.getElementById('forcesSection').style.display = 'none';
    document.getElementById('chargeSection').style.display = 'none';
}

function showCurrentConverter() {
    hideAllSections();
    document.getElementById('currentSection').style.display = 'flex';
}

const currentFactors = {
    A: 1,
    mA: 0.001,
    µA: 1e-6,
    kA: 1000,
    
    Bi: 10,          
    abA: 10,         
    EMU: 10          
};

function convertCurrent() {
    const input = parseFloat(document.getElementById('currentInput').value);
    const fromUnit = document.getElementById('currentFrom').value;
    const toUnit = document.getElementById('currentTo').value;

    try {
        if(isNaN(input)) throw new Error('Invalid input');
        
        const ampere = input * currentFactors[fromUnit];
        const result = ampere / currentFactors[toUnit];
        
        document.getElementById('currentResult').value = result.toExponential(4);
    } catch {
        document.getElementById('currentResult').value = 'Invalid Input!';
    }
}

document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('click', function() {
        if(this.textContent.toLowerCase() === 'current') {
            showCurrentConverter();
        }
    });
});

function hideAllSections() {
    document.querySelector('.hero').style.display = 'none';
    document.getElementById('conversionSection').style.display = 'none';
    document.getElementById('ageSection').style.display = 'none';
    document.getElementById('tempSection').style.display = 'none';
    document.getElementById('lengthSection').style.display = 'none';
    document.getElementById('areaSection').style.display = 'none';
    document.getElementById('volumeSection').style.display = 'none';
    document.getElementById('massSection').style.display = 'none';
    document.getElementById('dataSection').style.display = 'none'; 
    document.getElementById('speedSection').style.display = 'none'; 
    document.getElementById('timeSection').style.display = 'none'; 
    document.getElementById('angleSection').style.display = 'none';
    document.getElementById('compSection').style.display = 'none';  
    document.getElementById('powerSection').style.display = 'none';
    document.getElementById('pressureSection').style.display = 'none';
    document.getElementById('powerSection').style.display = 'none';
    document.getElementById('energySection').style.display = 'none';
    document.getElementById('powerSection').style.display = 'none';
    document.getElementById('weightSection').style.display = 'none';
    document.getElementById('forcesSection').style.display = 'none';
    document.getElementById('chargeSection').style.display = 'none';
    document.getElementById('currentSection').style.display = 'none';
}
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode);
}

document.getElementById('themeToggle').addEventListener('click', toggleDarkMode);

function loadTheme() {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if(isDarkMode) document.body.classList.add('dark-mode');
}

window.addEventListener('load', loadTheme);

document.addEventListener('DOMContentLoaded', function() {
    if(localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
    }
});

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

function loadTheme() {
    const isDark = localStorage.getItem('darkMode') === 'true';
    document.body.classList.toggle('dark-mode', isDark);
}
window.addEventListener('load', loadTheme);


document.querySelector('.hamburger').addEventListener('click', function() {
    document.querySelector('.nav-links').classList.toggle('active');
});

document.addEventListener('click', function(e) {
    if (!e.target.closest('.nav-right')) {
        document.querySelector('.nav-links').classList.remove('active');
    }
});

window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
        document.querySelector('.nav-links').classList.remove('active');
    }
});



