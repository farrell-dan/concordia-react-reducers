import { useContext, useEffect } from "react";
import GlobalStyles from "./GlobalStyles";
import { SeatContext } from "./SeatContext";
import TicketWidget from "./TicketWidget";

const App = () => {
  const {
    state: { numOfRows },
    actions: { receiveSeatInfoFromServer },
  } = useContext(SeatContext);

  useEffect(() => {
    fetch("/api/seat-availability")
      .then((res) => res.json())
      .then((data) => receiveSeatInfoFromServer(data));
  }, []);

  return (
    <>
      <GlobalStyles />
      This vanue has {numOfRows} rows!
      <TicketWidget />
    </>
  );
};

export default App;
