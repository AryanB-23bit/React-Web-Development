import React from "react";
import BookCover from "./BookCover";

const SearchResults = (props) => {
  return (
    <ul className="searchResults">
      {props.books.map((book) => (
        <BookCover key={book.id} book={book} />
      ))}
    </ul>
  );
};

export default SearchResults;
