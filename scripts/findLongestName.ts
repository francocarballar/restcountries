import countriesData from '@/data/countriesV3.1.json' with { type: 'json' };

let maxLength = 0;
let longestName = '';
let longestNameType = ''; 
let longestNameLang = ''; 
let countryOfLongest = '';

// Helper to check and update the longest name found
const checkName = (countryName: string, name: string | undefined | null, type: string, langCode = '') => {
    if (name && name.length > maxLength) {
        maxLength = name.length;
        longestName = name;
        longestNameType = type;
        longestNameLang = langCode;
        countryOfLongest = countryName;
    }
};

// Iterate through all countries
countriesData.forEach((country: any) => { // Use 'any' for simplicity in this one-off script
    const commonName = country.name?.common;
    if (!commonName) return; // Skip if country has no common name

    checkName(commonName, country.name?.common, 'common');
    checkName(commonName, country.name?.official, 'official');

    // Check native names
    if (country.name?.nativeName) {
        Object.entries(country.name.nativeName).forEach(([lang, native]: [string, any]) => {
            checkName(commonName, native?.common, 'native common', lang);
            checkName(commonName, native?.official, 'native official', lang);
        });
    }

    // Check translations
    if (country.translations) {
        Object.entries(country.translations).forEach(([lang, translation]: [string, any]) => {
            checkName(commonName, translation?.common, 'translation common', lang);
            checkName(commonName, translation?.official, 'translation official', lang);
        });
    }
});

console.log(`--- Longest Name Analysis ---`);
console.log(`Country: ${countryOfLongest}`);
console.log(`Type: ${longestNameType}${longestNameLang ? ` (${longestNameLang})` : ''}`);
console.log(`Name: "${longestName}"`);
console.log(`Length: ${maxLength}`);
console.log(`-----------------------------`); 