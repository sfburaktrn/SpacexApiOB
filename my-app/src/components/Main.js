import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import ReactPlayer from "react-player";
import Rocket from "./rocket.gif";

import Logo from "./spacex-logo-black-and-white.png";

export default function Main() {
  const [launchData, setLaunchData] = useState({});
  const [launchpadData, setLaunchpadData] = useState({});
  const [crewData, setCrewData] = useState([]);
  const carouselRef = useRef(null);
  const [youtubeVideoUrl, setYoutubeVideoUrl] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const fetchLaunchData = async () => {
      try {
        const response = await axios.get(
          "https://api.spacexdata.com/v4/launches/latest"
        );
        setLaunchData(response.data);

        const launchpadId = response.data.launchpad;
        const launchpadResponse = await axios.get(
          `https://api.spacexdata.com/v4/launchpads/${launchpadId}`
        );
        setLaunchpadData(launchpadResponse.data);

        const crewIds = response.data.crew;
        const crewResponse = await axios.get(
          "https://api.spacexdata.com/v4/crew"
        );
        const filteredCrewData = crewResponse.data.filter((crew) =>
          crewIds.includes(crew.id)
        );
        setCrewData(filteredCrewData);

        const youtubeVideoResponse = await axios.get(
          "https://api.spacexdata.com/v4/launches/latest"
        );
        const youtubeVideo = youtubeVideoResponse.data.links.youtube_id;
        setYoutubeVideoUrl(`https://www.youtube.com/watch?v=${youtubeVideo}`);
      } catch (error) {
        console.log(error);
      }
    };

    fetchLaunchData();
  }, []);

  const { name, date_utc, success, details, links } = launchData;
  const patch = links && links.patch ? links.patch : null;

  const {
    name: launchpadName,
    full_name: launchpadFullName,
    locality,
    region,
    latitude,
    longitude,
    launch_attempts,
    launch_successes,
    details: launchpadDetails,
    images: launchpadImages,
  } = launchpadData;
  const prevSlide = () => {
    setCurrentSlide((prevSlide) => prevSlide - 1);
  };

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => prevSlide + 1);
  };

  const formattedDate = date_utc ? new Date(date_utc).toLocaleDateString() : "";

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex bg-black  p-4 rounded-lg shadow-lg mb-4">
        <div
          className="bg-black p-4 rounded-lg shadow-lg mb-4 font-bold text-white"
          style={{ flex: 1 }}
        >
          <h3>SPACEX</h3>
          <br />
          <p>
            The Space Exploration Technologies Corporation, commonly referred to
            as SpaceX[7] is an American spacecraft manufacturer, launcher, and
            satellite communications company headquartered in Hawthorne,
            California. It was founded in 2002 by Elon Musk with the goal of
            reducing space transportation costs to colonization of Mars. The
            company manufactures the Falcon 9, Falcon Heavy, and Starship
            heavy-lift launch vehicles as well as rocket engines, the Cargo
            Dragon and Crew Dragon spacecraft; and the Starlink
            mega-constellation satellite.
          </p>
        </div>
        <div style={{ flex: 1 }}>
          <img src={Rocket} alt="GIF" />
        </div>
      </div>
      <h2 className="text-2xl font-bold mb-4 text-center">
        En Son Fırlatma Detayları
      </h2>
      <div className="bg-black text-white p-4 rounded-lg shadow-lg mb-4">
        <div className="flex">
          <div className="w-1/2">
            <h3 className="text-xl mb-2 font-bold">{name}</h3>
            <p className="mb-1 font-bold">Tarih: {formattedDate}</p>
            <p className="mb-1 font-bold">
              Başarı: {success ? "Evet" : "Hayır"}
            </p>
            <p className="mb-4 font-bold">Detaylar: {details || "Bilgi yok"}</p>
            {patch && (
              <img
                src={patch.large}
                alt="Fırlatma Yaması"
                className="w-48 mb-4 font-bold"
              />
            )}
          </div>
          <div className="w-1/2">
            {youtubeVideoUrl && (
              <div className="mt-4">
                <ReactPlayer
                  url={youtubeVideoUrl}
                  controls
                  width="500px"
                  height="400px"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-black p-4 rounded-lg shadow-lg mb-4 text-white">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Mürettebat Detayları
        </h2>
        <div className="relative">
          <div className="overflow-hidden">
            {/* Carousel başlangıcı */}
            <Carousel
              ref={carouselRef}
              selectedItem={currentSlide}
              onChange={(index) => setCurrentSlide(index)}
              showArrows={false}
              showStatus={false}
              showIndicators={crewData.length > 1} // Yalnızca birden fazla fotoğraf varsa
              showThumbs={false}
            >
              {crewData.map((crewMember) => (
                <div key={crewMember.id} className="mb-4">
                  <h3 className="text-xl">{crewMember.name}</h3>
                  <p className="mb-1">Ajans: {crewMember.agency}</p>
                  <p className="mb-1">Durum: {crewMember.status}</p>
                  {crewMember.image && (
                    <img
                      src={crewMember.image}
                      alt={crewMember.name}
                      className="w-auto h-96 object-contain mr-4 mb-4"
                    />
                  )}
                </div>
              ))}
            </Carousel>
            {/* Carousel bitiyor */}
          </div>
          <div className="absolute inset-y-1/2 left-0 flex items-center">
            <button
              className="bg-gray-500 text-white p-2 rounded-l"
              onClick={prevSlide}
              disabled={currentSlide === 0}
            >
              <FaChevronLeft />
            </button>
          </div>
          <div className="absolute inset-y-1/2 right-0 flex items-center">
            <button
              className="bg-gray-500 text-white p-2 rounded-r"
              onClick={nextSlide}
              disabled={currentSlide === crewData.length - 1}
            >
              <FaChevronRight />
            </button>
          </div>
        </div>
      </div>
      <div className="bg-black text-white p-4 rounded-lg shadow-lg mb-4">
        <h2 className="text-2xl font-bold mb-4">Fırlatma Alanı Detayları</h2>
        <h3 className="text-xl mb-2 font-bold">{launchpadName}</h3>
        <p className="mb-1 font-bold">Tam Adı: {launchpadFullName}</p>
        <p className="mb-1 font-bold">Yer: {locality}</p>
        <p className="mb-1 font-bold">Bölge: {region}</p>
        <p className="mb-1 font-bold">Enlem: {latitude}</p>
        <p className="mb-1 font-bold">Boylam: {longitude}</p>
        <p className="mb-1 font-bold">Fırlatma Denemeleri: {launch_attempts}</p>
        <p className="mb-4 font-bold">
          Başarılı Fırlatmalar: {launch_successes}
        </p>
        <p className="mb-4 font-bold">
          Detaylar: {launchpadDetails || "Bilgi yok"}
        </p>

        {launchpadImages && launchpadImages.large && (
          <div>
            <h3 className="text-2xl font-bold mb-4">
              Fırlatma Alanı Resimleri
            </h3>
            <div className="flex flex-wrap">
              {launchpadImages.large.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Fırlatma Alanı Resmi ${index + 1}`}
                  className="w-48 h-48 object-cover mr-4 mb-4"
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
