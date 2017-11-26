export function authorSelector(authors) {
  const createFormattedAuthor = author => ({
    value: author.id,
    text: author.firstName + ' ' + author.lastName
  });

  const formattedAuthors = authors.map(createFormattedAuthor);

  return formattedAuthors;
}