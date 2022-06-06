import React from "react";

const BookCover = (props) => {
  const published = props.book.publishedDate
    ? new Date(props.book.publishedDate).getFullYear()
    : "";

  return (
    <React.Fragment>
      <div className="bookCover">
        <div className="bookImage">
          {props.book.thumbnail && (
            <img src={props.book.thumbnail} alt={props.title} />
          )}
          {!props.book.thumbnail && (
            <div className="coverPlaceholder">
              <i className="fas fa-book fa-5x"/>
              <p>No Cover</p>
            </div>
          )}
        </div>
        <div className="bookDescription">
          <h5 className="truncate">{props.book.title}</h5>
          <p className="truncate">
            {props.book.authors ? props.book.authors[0] : "unknown"}&nbsp;
          </p>
          <p className="truncate">{published && <em>{published}</em>}&nbsp;</p>
        </div>
      </div>
    </React.Fragment>
  );
};

export default BookCover;
