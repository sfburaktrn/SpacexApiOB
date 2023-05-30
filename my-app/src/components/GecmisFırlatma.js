import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { NavLink } from "react-router-dom";
import Logo from "./spacex-logo-black-and-white.png";
import Header from "./Header";
import {
  Accordion,
  AccordionItem,
  FormGroup,
  Label,
  Input,
  Pagination,
  PaginationItem,
  PaginationLink,
  Button,
} from "reactstrap";
import { AccordionHeader } from "reactstrap";

export default function GecmisFirlatma() {
  const [search, setSearch] = useState("");
  const [launches, setLaunches] = useState([]);
  const [open, setOpen] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const history = useHistory();

  const toggle = (id) => {
    if (open === id) {
      setOpen(null);
    } else {
      setOpen(id);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://api.spacexdata.com/v4/launches/past?page=${page}`
      );
      const data = response.data;
      setLaunches(data);
      const totalLaunches = response.headers["spacex-api-count"];
      const calculatedTotalPages = Math.ceil(totalLaunches / data.length);
      setTotalPages(calculatedTotalPages);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  return (
    <div className="App">
      <div className="bg-black text-white p-6 flex justify-between items-center">
        <div>
          <img src={Logo} alt="SpaceX Logo" className="h-8 w-56" />
        </div>

        <div className="ml-2 space-x-2">
          <NavLink to="/GelecekFirlatma">
            <button className="text-[12px] font-bold py-2 px-4 rounded-2xl border-white border-2 hover:bg-white hover:text-black">
              Gelecek Fırlatma
            </button>
          </NavLink>
          <NavLink to="/">
            <button className="text-[12px] font-bold py-2 px-4 rounded-2xl border-white border-2 hover:bg-white hover:text-black">
              ANASAYFA
            </button>
          </NavLink>
        </div>
      </div>
      <h1 className="text-center font-bold text-black pt-4 text-3xl">
        Geçmiş Fırlatmalar
      </h1>

      <FormGroup>
        <Label className="text-black font-bold" for="exampleSearch">
          Arama Yapabilirsin
        </Label>
        <Input
          onChange={handleSearch}
          id="exampleSearch"
          name="search"
          placeholder="Aramak İstediğiniz Fırlatmanın İsmini Yazın"
          type="search"
        />
      </FormGroup>
      <Accordion open={open} toggle={toggle}>
        {launches
          .filter((launch) =>
            launch.name.toLowerCase().includes(search.toLowerCase())
          )
          .map((launch) => (
            <AccordionItem key={launch.id}>
              <AccordionHeader onClick={() => toggle(launch.id)}>
                {launch.name}
              </AccordionHeader>
              {open === launch.id && (
                <div className="AccordionPanel  bg-black text-white">
                  <p>Tarih: {launch.date_utc}</p>
                  <p>Başarılı: {launch.success ? "Evet" : "Hayır"}</p>
                  <p>Detaylar: {launch.details || "N/A"}</p>
                  <img src={launch.links.patch.small} alt="Fırlatma Logosu" />
                </div>
              )}
            </AccordionItem>
          ))}
      </Accordion>
      <Pagination>
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (pageNumber) => (
            <PaginationItem
              key={pageNumber}
              active={pageNumber === page}
              onClick={() => handlePageChange(pageNumber)}
            >
              <PaginationLink>{pageNumber}</PaginationLink>
            </PaginationItem>
          )
        )}
      </Pagination>
    </div>
  );
}
