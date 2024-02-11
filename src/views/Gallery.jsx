import { useState, useEffect }  from 'react';
import './gallery.css';


function Gallery() {
  const [galleryInfo, setGalleryInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);
  // const { id } = useParams();

  useEffect(() => {
    getGalleryInfo();
  }, []);

  async function getGalleryInfo() {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:8000/gallery`);
      const galleryData = await response.json();
      setGalleryInfo(galleryData);
      console.log(galleryData);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  const clickPrev = () => {
    if (index === 0) {
      setIndex(galleryInfo.length - 1);
    } else {
      setIndex(index - 1);
    }
  }

  const clickNext = () => {
    if (index === galleryInfo.length - 1) {
      setIndex(0);
    } else {
      setIndex(index + 1);
    }
  }

  return (
    <>
    <div className='gallery-header'>
      <h1>Oh, Hello There!</h1>
    </div>
    {loading ? <h3>Loading...</h3> :
    <section>
        <div className='gallery'>
        <button onClick={clickPrev}>&lt;</button>
      {galleryInfo && galleryInfo.length > 0 ? (
        <div key={galleryInfo[index].id} className="gallery-card">
          <img src={galleryInfo[index].image_path} alt="" />
          <h3>{galleryInfo[index].name}</h3>
        </div>
      ) : (
        <p>No photos available.</p>
      )}
      <button onClick={clickNext}>&gt;</button>
    </div>
      </section>
            }
    </>

  )
}

export default Gallery