const findPageBySlug = (pages, slug) => {
  return pages.reduce((pagesArray, page) => (page.slug.replace('/', '') === slug)
    ? pagesArray.concat(page)
    : page.children.length > 0
      ? pagesArray.concat(findPageBySlug(page.children, slug))
      : pagesArray
  , [])
}

export {
  findPageBySlug
}