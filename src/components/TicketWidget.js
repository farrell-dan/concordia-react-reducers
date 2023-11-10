import styled from 'styled-components';
import CircularProgress from '@material-ui/core/CircularProgress';

import { getRowName, getSeatNum } from '../helpers';
import { range } from '../utils';

import seatAvailable from "../assets/seat-available.svg"
import { SeatContext } from './SeatContext';
import { useContext } from 'react';

const availableSeat =  <img alt="seats layout" src={seatAvailable} />

const TicketWidget = () => {

const { state } = useContext(SeatContext);
const { hasLoaded, seats, numOfRows, seatsPerRow} = state

console.log(seats);
console.log(numOfRows);
console.log(seatsPerRow)


  if (!hasLoaded) {
    return <CircularProgress/>  
  }


  return (
    <Wrapper>
      {range(numOfRows).map(rowIndex => {
        const rowName = getRowName(rowIndex);

        return (
          <Row key={rowIndex}>
            <RowLabel>Row {rowName}</RowLabel>
            {range(seatsPerRow).map(seatIndex => {
              const seatId = `${rowName}-${getSeatNum(seatIndex)}`;

              return (
                <SeatWrapper key={seatId}>
                 {availableSeat}
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
