import React, {useState} from 'react';
import '../App.css'

function Buttons() {
    const [images, setImages] = useState([]);

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
        <div className="row">
          
            <button className="btnn" onClick={() => fetchImage('orion')}>
              Option 1
            </button>
            <button className="btnn" onClick={() => fetchImage('sun')}>
              Option 2
            </button>
            <button className="btnn" onClick={() => fetchImage('milky-way')}>
              Option 3 
            </button>
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

export default Buttons;