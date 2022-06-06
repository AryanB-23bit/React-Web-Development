import React, {useCallback, useEffect, useState} from "react";
import SearchResults from "./SearchResults";

const BookSearch = () => {
    const [books, setBooks] = useState([]);
    const [error, setError] = useState(null);
    const [load, setLoad] = useState(false);
    const [name, setName] = useState('');

    const handler = useCallback(async (userInput) => {
        setLoad(true);
        setError(null);

        if (userInput.length === 0) {
            setLoad(false);
            setError('1');
            return;
        }
        try {
            const response = await fetch('https://www.googleapis.com/books/v1/volumes?q='+userInput+'&maxResults=20&key=AIzaSyAcIJd77KwdvSJpQIZJQLN2r7UD8bluKDk');
            const data = await response.json();
            const results = [];

            for (let i = 0; i < data.items.length; i++) {
                console.log(data.items[i].volumeInfo.title)
                if (data.items[i].volumeInfo.imageLinks != null) {
                    results.push({
                        id: data.items[i].id,
                        title: data.items[i].volumeInfo.title,
                        authors: data.items[i].volumeInfo.authors,
                        publishedDate: data.items[i].volumeInfo.publishedDate,
                        thumbnail: data.items[i].volumeInfo.imageLinks.thumbnail,
                    });
                } else {
                    results.push({
                        id: data.items[i].id,
                        title: data.items[i].volumeInfo.title,
                        authors: data.items[i].volumeInfo.authors,
                        publishedDate: data.items[i].volumeInfo.publishedDate,
                        thumbnail: null,
                    });
                }
            }
            setBooks(results);
        } catch (error) {
            setBooks([]);
            setError(error.message);
        }
        setLoad(false);

    }, [])

    useEffect(() => {
        const timeout = setTimeout(() => handler(name), 500);
        return () => clearTimeout(timeout);
    }, [name]);

    function showResults() {
        if(load) {
            return (<div/>)
        }
        else if (error === '1') {
            return (<p>Found nothing to read.</p>)
        }
        else if (error) {
            return (<p>Something went wrong.</p>)
        }
        else {
            return (<SearchResults
                books = {books}
            />)
        }
    }

    return (
        <section className="bookSearch">
            <div className="container">
                <div className="control">
                    <input
                        type="search"
                        placeholder="Search the Books!"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </div>
                {showResults()}
            </div>
        </section>
    );
};

export default BookSearch;




