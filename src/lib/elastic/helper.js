export const buildBody = (searchTerm, resultsPerPage, currentPage) => {
  const body = {
      method: 'POST',
      body: JSON.stringify({
        searchTerm: searchTerm,
        size: resultsPerPage,
        from: (currentPage - 1) * resultsPerPage
      }),
      headers: {
        "content-type": "application/json"
      }
    };
  return body
}

export const buildSearch = () => {
  
}