import styled from "styled-components";
import CircularProgress from "@material-ui/core/CircularProgress";

import { getRowName, getSeatNum } from "../helpers";
import { range } from "../utils";

import { SeatContext } from "./SeatContext";
import { useContext } from "react";

import Seat from "./Seat";

const TicketWidget = () => {
  const { state } = useContext(SeatContext);
  const { hasLoaded, seats, numOfRows, seatsPerRow } = state;

  if (!hasLoaded) {
    return <CircularProgress />;
  }

  return (
    <Wrapper>
      {range(numOfRows).map((rowIndex) => {
        const rowName = getRowName(rowIndex);

        return (
          <Row key={rowIndex}>
            <RowLabel>Row {rowName}</RowLabel>
            {range(seatsPerRow).map((seatIndex) => {
              const seatId = `${rowName}-${getSeatNum(seatIndex)}`;
              const seat = seats[seatId];

              return (
                <SeatWrapper key={seatIndex}>
                  <Seat
                    rowIndex={rowIndex}
                    seatIndex={seatIndex}
                    width={36}
                    height={36}
                    price={seat.price}
                    status={seat.isBooked ? "unavailable" : "available"}
                  />
                </SeatWrapper>
              );
            })}
          </Row>
        );
      })}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background: #eee;
  border: 1px solid #ccc;
  border-radius: 3px;
  padding: 8px;
`;

const Row = styled.div`
  display: flex;
  position: relative;

  &:not(:last-of-type) {
    border-bottom: 1px solid #ddd;
  }
`;

const RowLabel = styled.div`
  font-weight: bold;
`;

const SeatWrapper = styled.div`
  padding: 5px;
`;

export default TicketWidget;
