import { render, screen } from "@testing-library/react";
import renderer from "react-test-renderer";
import App from "./App";
import TripCard from "./components/TripCard";
import Map from "./components/Map";
import { AppContext } from "./App";

//app context values needed for testing some components

const marker = { id: "", isBouncing: false };
const hovered = { id: "", state: false };
const setHovered = (obj) => {
  return { ...obj, state: true };
};

const overrideStateArray = (state) => {
  let newState = [];
  state = newState;
  return state;
};
const overrideBooleanState = (state) => {
  let newState = true;
  state = newState;
  return state;
};
const overrideObjectState = (state) => {
  let newState = {};
  state = newState;
  return state;
};
const setResponse = (response) => {
  let newState = "some response";
  response = newState;
  return response;
};

const departureDate = new Date("2022-12-07");
const trips = [];
const mapCenter = [];
const viewState = {
  width: "100%",
  height: 900,
  latitude: 41.579606918652054,
  longitude: 4.244298260567439,
  zoom: 3.5,
  bearing: 0,
  pitch: 0,
  transitionDuration: 1000,
};

//component rendering test
test("renders the main App component", () => {
  render(<App />);
  const appTitle = screen.getByText(/SPACE TRIPS/i);
  expect(appTitle).toBeInTheDocument();
});

test("if Space Centers render and shows space center details", () => {
  render(
    <AppContext.Provider
      value={{
        setHovered,
        marker,
        setMapCenter: overrideStateArray,
        departureDate,
        setFlights: overrideStateArray,
        setShowFlightsList: overrideBooleanState,
        setshowSearching: overrideBooleanState,
        showNotification: overrideBooleanState,
        setResponse,
      }}
    >
      <TripCard
        spaceCenter={{
          id: 1,
          name: "Accra Space Center",
          planet: { name: "Earth" },
        }}
        marker={{ id: "", isBouncing: false }}
      />
    </AppContext.Provider>
  );
  expect(screen.getByText(/Accra Space Center/i)).toBeInTheDocument();
  expect(screen.getByText(/Earth/i)).toBeInTheDocument();
});

test("if map component renders", () => {
  render(
    <AppContext.Provider
      value={{
        trips,
        viewState,
        setViewState: overrideObjectState,
        hovered,
        setMarker: overrideObjectState,
        mapCenter,
      }}
    >
      <Map />
    </AppContext.Provider>
  );
});

//user interaction test
test("if hover effect works correctly", () => {
  const component = renderer.create(
    <AppContext.Provider
      value={{
        setHovered,
        marker,
        setMapCenter: overrideStateArray,
        departureDate,
        setFlights: overrideStateArray,
        setShowFlightsList: overrideBooleanState,
        setshowSearching: overrideBooleanState,
        showNotification: overrideBooleanState,
        setResponse,
      }}
    >
      <TripCard
        spaceCenter={{
          id: 1,
          name: "Accra Space Center",
          planet: { name: "Earth" },
        }}
        marker={{ id: "", isBouncing: false }}
        setHovered={setHovered}
      />
    </AppContext.Provider>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
  //console.log(tree.children[0].props);
  //manually trigger the callback
  tree.children[0].props.onMouseEnter();
  // re-rendering
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  // manually trigger the callback
  tree.children[0].props.onMouseLeave();
  // re-rendering
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
