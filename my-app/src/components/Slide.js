import React, { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function Slide() {
  const [photoUrls, setPhotoUrls] = useState([]);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  useEffect(() => {
    fetch(
      "https://api.unsplash.com/search/photos?query=spacex&per_page=10&client_id=FOCj7ZL12cqT4IxqDq_EMJE0wwFW3Fqa9PTxt4G2wXU"
    )
      .then((response) => response.json())
      .then((data) => {
        const urls = data.results.map((result) => result.urls.regular);
        setPhotoUrls(urls);
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentPhotoIndex((prevIndex) => (prevIndex + 1) % photoUrls.length);
    }, 3000);

    return () => {
      clearInterval(intervalId);
    };
  }, [photoUrls]);

  const goToPreviousSlide = () => {
    setCurrentPhotoIndex((prevIndex) =>
      prevIndex === 0 ? photoUrls.length - 1 : prevIndex - 1
    );
  };

  const goToNextSlide = () => {
    setCurrentPhotoIndex((prevIndex) =>
      prevIndex === photoUrls.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="bg-black p-4 rounded-lg shadow-lg mb-4 text-white">
      <div className="relative">
        <div className="overflow-hidden">
          <Carousel
            selectedItem={currentPhotoIndex}
            onChange={setCurrentPhotoIndex}
            showArrows={false}
            showStatus={false}
            showIndicators={photoUrls.length > 1}
            showThumbs={false}
          >
            {photoUrls.map((url, index) => (
              <div key={index}>
                <img
                  src={url}
                  alt="SpaceX Slideshow"
                  className="w-auto h-96 object-contain mr-4 mb-4 rounded-4"
                />
              </div>
            ))}
          </Carousel>
        </div>
        <div className="absolute inset-y-1/2 left-0 flex items-center">
          <button
            className="bg-black text-3xl text-white p-2 rounded-l"
            onClick={goToPreviousSlide}
            disabled={photoUrls.length <= 1}
          >
            <FaChevronLeft />
          </button>
        </div>
        <div className="absolute inset-y-1/2 right-0 flex items-center">
          <button
            className="bg-black text-3xl text-white p-2 rounded-r"
            onClick={goToNextSlide}
            disabled={photoUrls.length <= 1}
          >
            <FaChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
}
