const departmentsList = [
  { id: 1, name: 'Multilingual' },
  { id: 2, name: 'Engineering' },
  { id: 3, name: 'Information' },
  { id: 4, name: 'Technology' },
  { id: 5, name: 'Talent Acquisition' },
  { id: 6, name: 'Finance' },
  { id: 7, name: 'Backoffice' },
  { id: 8, name: 'Human Resources' },
  { id: 9, name: 'Marketing' },
];

const Query = {
  departments: async () => {
    return departmentsList;
  },
};

export { Query };
