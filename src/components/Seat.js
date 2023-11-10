import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

import seatAvailable from "../assets/seat-available.svg";
import styled from "styled-components";
import PropTypes from "prop-types";
import { useBookingContext } from "./BookingContext";

const Seat = ({ rowIndex, seatIndex, width, height, price, isBooked }) => {
  const availableSeat = (
    <img
      alt="seats layout"
      src={seatAvailable}
      style={{ filter: isBooked ? "grayscale(100%)" : "none" }}
    />
  );

  const { beginBookingProcess } = useBookingContext();

  const handleSeatClick = () => {
    if (!isBooked) {
      beginBookingProcess(`${rowIndex}-${seatIndex}`, price);
    }
  };

  return (
    <Tippy content={`Row ${rowIndex}, Seat ${seatIndex} - $${price}`}>
      <SeatWrapper
        disabled={isBooked}
        className="seat-button"
        onClick={handleSeatClick}
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
  isBooked: PropTypes.bool,
};

export default Seat;

const SeatWrapper = styled.button`
  padding: 5px;
`;
