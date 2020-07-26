export const sort = (items, key, direction) => {
  switch(key) {
    case('byDate'):
      return items.sort((a, b) => new Date(a.createdAt) > new Date(b.createdAt) ? direction : -direction);
    case('byRating'):
      return items.sort((a, b) => a.rating > b.rating ? direction : -direction);

    default:
      return items;
  }
};
