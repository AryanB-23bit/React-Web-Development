import { createContext, useState } from "react";
import { useEffect } from "react/cjs/react.development";

const FavoritesContext = createContext({
  getFavorites: () => {},
  addFavorite: () => {},
  removeFavorite: () => {},
  isFavorite: () => {},
});

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const addFavorite = async (book) => {
    let b = {...book};
    let newFav = null;
    let response = await fetch("https://csc-443-project-3-default-rtdb.firebaseio.com/favorites.json", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({book: b})
    });
    let result = await response.json();
    let id= result.name
    if(result){
      newFav = {id: id, book: b };
      setFavorites((prevFavorites)=>
      {
        return [...prevFavorites, newFav];
      });
    }
  };
  const removeFavorite = async (book) => {
    for(let b in favorites){
      if(favorites[b].book.id === book.id){
        await fetch(`https://csc-443-project-3-default-rtdb.firebaseio.com/favorites/${favorites[b].id}.json`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        setFavorites((prevFavorites)=>
        {
          let books_favs = [];
          for(let d in prevFavorites){
            if(b !== d){
              books_favs.push(prevFavorites[d]);
            }
          }
          return books_favs;
        });
      }
    }
  };
  const isFavorite = (book) => {
    for(let b in favorites){
      if(book.id === favorites[b].book.id){
        return true;
      }
    }
    return false;
  };
  const getFavorites = () => {
    let favBooks = []
    for(let b in favorites){
      favBooks.push(favorites[b].book);
    }
    return favBooks;
  };
  useEffect(() => {
    async function fetchFavorites(){
      let response = await fetch("https://csc-443-project-3-default-rtdb.firebaseio.com/favorites.json");
      let data = await response.json();
      let favBooks = [];
      if(data){
        for(let book in data){
          favBooks.push({id:book, book: data[book].book});
        }
      }
      setFavorites(favBooks);
    }
    fetchFavorites();
  }, []);
  const context = {
    getFavorites,
    addFavorite,
    removeFavorite,
    isFavorite,
  };
  return (
      <FavoritesContext.Provider value={context}>
        {children}
      </FavoritesContext.Provider>
  );
};
export default FavoritesContext;