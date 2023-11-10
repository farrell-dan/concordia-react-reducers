import { createContext, useContext, useReducer, useCallback } from "react";

export const BookingContext = createContext();

const initialState = {
  status: "idle",
  error: null,
  selectedSeatId: null,
  price: null,
};

const bookingReducer = (state, action) => {
  switch (action.type) {
    case "begin-booking-process":
      return {
        ...state,
        status: "seat-selected",
        selectedSeatId: action.payload.selectedSeatId,
        price: action.payload.price,
      };
    // Add other cases as needed

    default:
      return state;
  }
};

const BookingProvider = ({ children }) => {
  const [state, dispatch] = useReducer(bookingReducer, initialState);

  const beginBookingProcess = useCallback(
    (selectedSeatId, price) => {
      dispatch({
        type: "begin-booking-process",
        payload: { selectedSeatId, price },
      });
    },
    [dispatch]
  );

  return (
    <BookingContext.Provider value={{ state, beginBookingProcess }}>
      {children}
    </BookingContext.Provider>
  );
};

const useBookingContext = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useBookingContext must be used within a BookingProvider");
  }
  return context;
};

export { BookingProvider, useBookingContext };
