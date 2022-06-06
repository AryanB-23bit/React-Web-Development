import React from "react";
import Header from "./components/Header";
import BookSearch from "./components/BookSearch";

function App() {
  return (
    <React.Fragment>
      <Header />
      <main>
        <BookSearch />
      </main>
    </React.Fragment>
  );
}

export default App;
