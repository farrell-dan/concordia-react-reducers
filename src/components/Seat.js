import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

import seatAvailable from "../assets/seat-available.svg";
import styled from "styled-components";
import PropTypes from "prop-types";

const Seat = ({ rowIndex, seatIndex, width, height, price, status }) => {
  const availableSeat = (
    <img
      alt="seats layout"
      src={seatAvailable}
      style={{ filter: status === "unavailable" ? "grayscale(100%)" : "none" }}
    />
  );

  return (
    <Tippy content={`Row ${rowIndex}, Seat ${seatIndex} - $${price}`}>
      <SeatWrapper
        isBooked={status === "unavailable"}
        disabled={status === "unavailable"}
        className="seat-button"
      >
        {availableSeat}
      </SeatWrapper>
    </Tippy>
  );
};

Seat.propTypes = {
  rowIndex: PropTypes.number.isRequired,
  seatIndex: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  status: PropTypes.oneOf(["available", "unavailable"]).isRequired,
};

export default Seat;

const SeatWrapper = styled.button`
  padding: 5px;
`;
