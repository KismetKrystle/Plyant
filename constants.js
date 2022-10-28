export const USER_ROLES = {
  farmer: 'farmer',
  distributor: 'distributor',
};

export const CROPS = [
  { id: 1, name: 'Lettuce' },
  { id: 2, name: 'Kale' },
  { id: 3, name: 'Rainbow Chard' },
  { id: 4, name: 'Mustard' },
  { id: 5, name: 'Spinach' },
  { id: 6, name: 'Tomato' },
  { id: 7, name: 'Cucumber' },
  { id: 8, name: 'Pepper' },
  { id: 9, name: 'Strawberries' },
  { id: 10, name: 'Melons' },
  { id: 11, name: 'Radish' },
  { id: 12, name: 'Potatoes' },
  { id: 13, name: 'Onions' },
  { id: 14, name: 'Garlic' },
  { id: 15, name: 'Basil' },
  { id: 16, name: 'Thyme' },
  { id: 17, name: 'Cilantro' },
  { id: 18, name: 'Peppermint' },
  { id: 19, name: 'Oregano' },
  { id: 20, name: 'Sage' },
];

export const CERTIFICATES = [
  { id: 1, name: 'Rainforest Alliance (RA)' },
  { id: 2, name: 'Food Alliance (FA)' },
  { id: 3, name: 'Whole Foods Responsibly Grown (WFRG)' },
  { id: 4, name: 'United States Department of Agriculture Organic (USDA-O)' },
  {
    id: 5,
    name: 'United States Department of Agriculture Good Agricultural Practices (USDA GAP)',
  },
  { id: 6, name: 'Fair Trade USA (FTU)' },
  { id: 7, name: 'Certified Greenhouse Farmers (CGF)' },
  { id: 8, name: 'Nursery and Greenhouse Standard (FA-GN)' },
  { id: 9, name: 'LEED' },
  { id: 10, name: 'Energy Star' },
  { id: 11, name: 'BREEAM' },
  { id: 12, name: 'Living Building Challenge' },
];

export const FARM_TYPES = [
  { id: 1, name: 'Aquaponic' },
  { id: 2, name: 'Hydroponic' },
  { id: 3, name: 'Traditional' },
];

export const PESTICIDES = [
  { id: 1, name: 'Organic' },
  { id: 2, name: 'Chemical-Based' },
  { id: 3, name: 'None' },
];

export const CROPS_FOR_SALE = [
  {
    type: 'Lettuce',
    dateHarvested: '10/01/22',
    datePlanted: '09/01/22',
    weight: '50',
    cost: '53',
    pesticides: 'Organic',
    specialTreatments: 'I played Mozart to them.',
  },
  {
    type: 'Kale',
    dateHarvested: '10/02/22',
    datePlanted: '09/02/22',
    weight: '15',
    cost: '34',
    pesticides: 'Chemical-Based',
    specialTreatments: '',
  },
  {
    type: 'Radish',
    dateHarvested: '10/04/22',
    datePlanted: '09/09/22',
    weight: '23',
    cost: '49',
    pesticides: 'None',
    specialTreatments: 'I kept them in darkness.',
  },
  {
    type: 'Potatoes',
    dateHarvested: '10/06/22',
    datePlanted: '09/17/22',
    weight: '18',
    cost: '70',
    pesticides: 'Chemical-Based',
    specialTreatments: '',
  },
  {
    type: 'Mustard',
    dateHarvested: '10/08/22',
    datePlanted: '09/18/22',
    weight: '58',
    cost: '80',
    pesticides: 'Chemical-Based',
    specialTreatments: '',
  },
  {
    type: 'Basil',
    dateHarvested: '10/18/22',
    datePlanted: '09/14/22',
    weight: '62',
    cost: '93',
    pesticides: 'Organic',
    specialTreatments: '',
  },
  {
    type: 'Onions',
    dateHarvested: '10/20/22',
    datePlanted: '09/16/22',
    weight: '35',
    cost: '87',
    pesticides: 'Organic',
    specialTreatments: 'I kept the temperature at freezing.',
  },
  {
    type: 'Garlic',
    dateHarvested: '10/22/22',
    datePlanted: '09/02/22',
    weight: '19',
    cost: '78',
    pesticides: 'None',
    specialTreatments: '',
  },
  {
    type: 'Potatoes',
    dateHarvested: '10/23/22',
    datePlanted: '09/18/22',
    weight: '45',
    cost: '96',
    pesticides: 'None',
    specialTreatments: '',
  },
  {
    type: 'Peppermint',
    dateHarvested: '10/24/22',
    datePlanted: '09/06/22',
    weight: '29',
    cost: '67',
    pesticides: 'Organic',
    specialTreatments: 'I shone purple light on them.',
  },
];
