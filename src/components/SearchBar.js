import React, {useState} from 'react';

const SearchBar = ({ onSearch }) => {

    const [images, setImages] = useState([]);
    const [searchTerm, setSearchTerm] = useState('')
    const [error, setError] = useState(null);

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        fetchImage(searchTerm);
    }

    const fetchImage = (keywords) => {
        fetch(`https://images-api.nasa.gov/search?q=${keywords}`)
            .then(response => {
                if(!response.ok) {
                    throw new Error('Failed to fetch');
                }
                return response.json();
            })
            .then(data=> {
                const items = data.collection.items.slice(0,10);
                if(items.length===0) {
                    setError('No results found:(');
                } else {
                    setImages(items);
                    setError(null)
                }
            })
            .catch(error => {
                console.error(error);
                setError('Failed to fetch data');
            });
    }

    return (
    <div className="searchbar">
        <form onSubmit={handleSubmit}>
        <input
            type="text"
            placeholder="enter a keyword"
            value={searchTerm}
            onChange={handleChange}
        />
        <button className="btn-search" type="submit">Search</button>
        </form>
        {error && <p>{error}</p>}
        <div className="image-container">
                {images.map((image, index) => (
                <div key={index} className="image-item">
                    <img src={image.links[0].href} alt={image.data[0].title} />
                    <div className="image-info">
                    <h2 className="title">{image.data[0].title}</h2>
                    <p className="description">{image.data[0].description}</p>
                    </div>
                </div>
                ))}
            </div>
    </div>
    );
}

export default SearchBar;