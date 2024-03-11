import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css'

function Buttons() {
    const [images, setImages] = useState([]);
    const [error, setError] = useState(null);

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


    useEffect(() => {
        fetchImage('Galaxy Evolution Explorer GALEX');
    }, [])

    return (
        <div className="row">
            <div className="btn-container">
            <div className="col-4">
                <button className="btnn" onClick={() => fetchImage('Comet')}>
                Comets
                </button>
            </div>
            <div className="col-4">
                <button className="btnn" onClick={() => fetchImage('Nebula')}>
                Nebulae
                </button>
            </div>
            <div className="col-4">
                <button className="btnn" onClick={() => fetchImage('galaxy')}>
                Galaxies
                </button>
            </div>
            </div>
            <div className="container">
                {error ? (
                    <div className="alert alert-danger" role="alert">
                        {error}
                    </div>
                ) : (
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
                )}
            </div>
        </div>
      );
    }

export default Buttons;