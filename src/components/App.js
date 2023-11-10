import { useContext, useEffect } from "react";
import GlobalStyles from "./GlobalStyles";
import { SeatContext } from "./SeatContext";

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
    </>
  );
};

export default App;
