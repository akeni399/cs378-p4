import React, {useState} from 'react';

const SearchBar = ({ onSearch }) => {

    const [images, setImages] = useState([]);
    const [searchTerm, setSearchTerm] = useState('')

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        fetchImage(searchTerm);
    }

    const fetchImage = (keywords) => {
        fetch(`https://images-api.nasa.gov/search?q=${keywords}`)
            .then(response => response.json())
            .then(data=> {
                const items = data.collection.items.slice(0,10);
                setImages(items);
            })
            .catch(error => console.error(error))
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
        <button type="submit">Search</button>
        </form>
        <div className="image-container">
                {images.map((image, index) => (
                <div key={index} className="image-item">
                    <img src={image.links[0].href} alt={image.data[0].title} />
                    <div className="image-info">
                    <h2>{image.data[0].title}</h2>
                    <p>{image.data[0].description}</p>
                    </div>
                </div>
                ))}
            </div>
    </div>
    );
}

export default SearchBar;