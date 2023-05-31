import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Slide from "./Slide";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import ReactPlayer from "react-player";
import Rocket from "./rocket.gif";

export default function Main() {
  const [launchData, setLaunchData] = useState({});
  const [launchpadData, setLaunchpadData] = useState({});
  const [crewData, setCrewData] = useState([]);
  const carouselRef = useRef(null);
  const [youtubeVideoUrl, setYoutubeVideoUrl] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);

  const latestLaunchRef = useRef(null);

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
      <h2 className="text-2xl font-bold mb-4 text-center">SPACEX INFO</h2>
      <div className="flex flex-col md:flex-row bg-black p-4 rounded-lg shadow-lg mb-4">
        <div className="md:w-1/2 bg-black p-4 rounded-lg shadow-lg mb-4 font-bold text-white">
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
        <div className="md:w-1/2 flex justify-center items-center">
          <img src={Rocket} alt="GIF" className="w-auto h-auto" />
        </div>
      </div>
      <h2 className="text-2xl font-bold mb-4 text-center">Launch Photos</h2>
      <Slide />
      <h2
        id="latestLaunchSection"
        className="text-2xl font-bold mb-4 text-center"
      >
        Latest Launch Details
      </h2>
      <div className="bg-black text-white p-4 rounded-lg shadow-lg mb-4">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/3 text-center">
            <h3 className="text-3xl mb-2 font-bold">{name}</h3>
            <p className="mb-1 font-bold pt-3">Date: {formattedDate}</p>
            <p className="mb-1 font-bold pt-3">
              Success: {success ? "Yes" : "No"}
            </p>

            {patch && (
              <img
                src={patch.large}
                alt="Fırlatma Yaması"
                className="w-52 mb-4 font-bold pt-3 mx-auto"
              />
            )}
          </div>

          <div className="md:w-2/3">
            {youtubeVideoUrl && (
              <div className="aspect-w-16 aspect-h-9">
                <ReactPlayer
                  url={youtubeVideoUrl}
                  controls
                  className="rounded-lg"
                  width="auto"
                  height="500px"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-4 text-center">Crew Details</h2>

      <div className="bg-black p-4 rounded-lg shadow-lg mb-4 text-white">
        <div className="relative">
          <div className="overflow-hidden">
            <Carousel
              ref={carouselRef}
              selectedItem={currentSlide}
              onChange={(index) => setCurrentSlide(index)}
              showArrows={false}
              showStatus={false}
              showIndicators={crewData.length > 1}
              showThumbs={false}
            >
              {crewData.map((crewMember) => (
                <div key={crewMember.id} className="mb-4">
                  <h3 className="text-xl">{crewMember.name}</h3>
                  <p className="mb-1">Agency: {crewMember.agency}</p>
                  <p className="mb-1">Situation: {crewMember.status}</p>
                  {crewMember.image && (
                    <img
                      src={crewMember.image}
                      alt={crewMember.name}
                      className="w-auto h-96 object-contain mx-auto mb-4 rounded-4"
                    />
                  )}
                </div>
              ))}
            </Carousel>
          </div>
          <div className="absolute inset-y-1/2 left-0 flex items-center">
            <button
              className="bg-black text-3xl text-white p-2 rounded-l"
              onClick={prevSlide}
              disabled={currentSlide === 0}
            >
              <FaChevronLeft />
            </button>
          </div>
          <div className="absolute inset-y-1/2 right-0 flex items-center">
            <button
              className="bg-black text-3xl text-white p-2 rounded-r"
              onClick={nextSlide}
              disabled={currentSlide === crewData.length - 1}
            >
              <FaChevronRight />
            </button>
          </div>
        </div>
      </div>
      <h2 className="text-2xl font-bold mb-4 text-center">
        Launch Area Details
      </h2>
      <div className="bg-black text-white p-4 rounded-lg shadow-lg mb-4 flex flex-col md:flex-row">
        <div className="flex-1">
          <h3 className="text-xl mb-2 font-bold">{launchpadName}</h3>
          <p className="mb-1 font-bold">Full name: {launchpadFullName}</p>
          <p className="mb-1 font-bold">Place: {locality}</p>
          <p className="mb-1 font-bold">Area: {region}</p>
          <p className="mb-1 font-bold">Latitude: {latitude}</p>
          <p className="mb-1 font-bold">Longitude: {longitude}</p>
          <p className="mb-1 font-bold">Launch Attempts: {launch_attempts}</p>
          <p className="mb-4 font-bold">
            Successful Launches: {launch_successes}
          </p>
          <p className="mb-4 font-bold">
            Detail: {launchpadDetails || "Bilgi yok"}
          </p>
        </div>

        {launchpadImages && launchpadImages.large && (
          <div className="flex-1">
            <div className="flex flex-wrap">
              {launchpadImages.large.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Fırlatma Alanı Resmi ${index + 1}`}
                  className="w-auto h-auto object-cover mx-auto mb-4 rounded-4"
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
