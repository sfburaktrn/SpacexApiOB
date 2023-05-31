import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { NavLink } from "react-router-dom";
import Logo from "./spacex-logo-black-and-white.png";
import axios from "axios";
import {
  Accordion,
  AccordionItem,
  FormGroup,
  Label,
  Input,
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";
import { AccordionHeader } from "reactstrap";

export default function FutureLaunch() {
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
        `https://api.spacexdata.com/v4/launches/upcoming?page=${page}`
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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <div className="App">
      <div className="bg-black text-white p-6 flex flex-col sm:flex-row justify-between items-center hover:text-black">
        <a href="/">
          <div>
            <img src={Logo} alt="SpaceX Logo" className="h-8 w-56" />
          </div>
        </a>
        <div className="mt-4 sm:mt-0 sm:ml-2 space-x-2">
          <NavLink to="/FutureLaunch">
            <button className="text-[12px] font-bold py-2 px-4 rounded-2xl border-white border-2 hover:bg-white hover:text-black">
              Future Launch
            </button>
          </NavLink>
          <NavLink to="/PastLaunch">
            <button className="text-[12px] font-bold py-2 px-4 rounded-2xl border-white border-2 hover:bg-white hover:text-black">
              Past Launch
            </button>
          </NavLink>
        </div>
      </div>
      <h1 className="text-center font-bold text-black pt-4 text-3xl">
        Future Launches
      </h1>

      <FormGroup>
        <Label className="text-black font-bold pt-3" for="exampleSearch">
          Search
        </Label>
        <Input
          onChange={handleSearch}
          id="exampleSearch"
          name="search"
          placeholder="Type the Name of the Launch You Want to Search"
          type="search"
        />
      </FormGroup>
      <Accordion open={open} toggle={toggle}>
        {launches
          .filter((launch) =>
            launch.name.toLowerCase().includes(search.toLowerCase())
          )
          .map((launch) => (
            <AccordionItem key={launch.id} className="">
              <AccordionHeader onClick={() => toggle(launch.id)}>
                {launch.name}
              </AccordionHeader>

              {open === launch.id && (
                <div className="AccordionPanel bg-black text-white">
                  <p>Date: {formatDate(launch.date_utc)}</p>
                  <p>Success: {launch.success ? "Yes" : "No"}</p>
                  <p>Details: {launch.details || "N/A"}</p>
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
