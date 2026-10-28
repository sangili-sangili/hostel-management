export const mockLocations = {
  countries: [
    { id: 'c_1', name: 'United States', code: 'US', currency: 'USD', status: 'Active' },
    { id: 'c_2', name: 'India', code: 'IN', currency: 'INR', status: 'Active' },
    { id: 'c_3', name: 'United Kingdom', code: 'GB', currency: 'GBP', status: 'Active' },
  ],
  states: [
    { id: 's_1', countryId: 'c_1', name: 'California', code: 'CA', status: 'Active' },
    { id: 's_2', countryId: 'c_1', name: 'Texas', code: 'TX', status: 'Active' },
    { id: 's_3', countryId: 'c_2', name: 'Karnataka', code: 'KA', status: 'Active' },
    { id: 's_4', countryId: 'c_2', name: 'Maharashtra', code: 'MH', status: 'Active' },
    { id: 's_5', countryId: 'c_3', name: 'Greater London', code: 'LDN', status: 'Active' },
  ],
  districts: [
    { id: 'd_1', stateId: 's_1', name: 'San Francisco County', status: 'Active' },
    { id: 'd_2', stateId: 's_2', name: 'Travis County', status: 'Active' },
    { id: 'd_3', stateId: 's_3', name: 'Bangalore Urban', status: 'Active' },
  ],
  cities: [
    { id: 'ci_1', districtId: 'd_1', name: 'San Francisco', postalCode: '94102', status: 'Active' },
    { id: 'ci_2', districtId: 'd_2', name: 'Austin', postalCode: '78701', status: 'Active' },
    { id: 'ci_3', districtId: 'd_3', name: 'Bengaluru', postalCode: '560001', status: 'Active' },
  ],
};
