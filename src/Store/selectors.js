// #region SELECTORS
// Get categories
export const selectCategory = (state) => state.movies.category;
export const selectCategories = (state) => {
  let movies = state.movies.movies;

  const groupByCategory = movies.reduce((group, movie) => {
    let { category } = movie;
    group[category] = group[category] ?? [];
    group[category].push(movie);
    return group;
  }, {});

  return Object.keys(groupByCategory);
};
// CurrentPage
export const selectCurrentPage = (state) => state.movies.page;
// Get Movies
export const selectMovies = (state) => state.movies.moviesFiltered;
// Get Movies status
export const selectMoviesStatus = (state) => state.movies.status;
// Get nb page
export const selectPageCount = (state) => state.movies.pageCount;
// Get Number by page
export const selectNumberByPage = (state) => state.movies.numberByPage;
// #endregion
