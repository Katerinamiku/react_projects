import React, {useEffect, useState} from 'react';
import './index.scss';
import Collection from "./Collection";

function App() {
    const [categoryId, setCategoryId] = useState(0);
    const [collections, setCollections] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(1);

    const categories = [
        {"name": "All"},
        {"name": "Sea"},
        {"name": "Mountains"},
        {"name": "Architecture"},
        {"name": "Cities"}
    ];

    useEffect(() => {
        setIsLoading(true);
        const category = categoryId ? `category=${categoryId}` : '';
        fetch(`https://6329d20d4c626ff832cb6556.mockapi.io/collections?page=${page}&limit=3&${category}`)
            .then(res => res.json())
            .then(json => {
                setCollections(json)
            })
            .catch(err => {
                console.warn(err)
                alert('error')
            })
            .finally(() => setIsLoading(false))
    }, [categoryId, page]);


    return (
        <div className="App">
            <h1>My photo collection</h1>
            <div className="top">
                <ul className="tags">
                    {categories.map((obj, i) =>
                        <li className={categoryId === i ? 'active' : ''}
                            key={obj.name}
                            onClick={() => setCategoryId(i)}>{obj.name}</li>)}
                </ul>
                <input onChange={(e) => {
                    setSearchValue(e.currentTarget.value)
                }}
                       className="search-input"
                       placeholder="Search"/>
            </div>
            <div className="content">
                {isLoading ? (<h2>Loading...</h2>) :
                    (collections.filter(obj => obj.name.toLowerCase().includes(searchValue.toLowerCase()))
                            .map((obj, index) => (
                                <Collection key={obj.index}
                                            name={obj.name}
                                            images={obj.photos}
                                />
                            ))
                    )
                }

            </div>
            <ul className="pagination">
                {
                    [...Array(5)].map((_, i) => <li
                        className={page === (i + 1) ? 'active' : ''}
                        key={i}
                        onClick={() => setPage(i + 1)}>
                        {i + 1}
                    </li>)
                }
            </ul>
        </div>
    );
}

export default App;
