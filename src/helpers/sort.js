const arraySort = (data, field, mode) =>
  mode === 'asc'
    ? data.sort((a, b) => (a[field] < b[field] ? 1 : -1))
    : data.sort((a, b) => (a[field] > b[field] ? 1 : -1));

export default arraySort;
