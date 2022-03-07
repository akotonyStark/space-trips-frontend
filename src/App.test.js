import { render, screen } from "@testing-library/react";
import renderer from "react-test-renderer";

import App from "./App";
import TripCard from "./components/TripCard";

//component rendering test
test("renders the main App component", () => {
  render(<App />);
  const appTitle = screen.getByText(/SPACE TRIPS/i);
  expect(appTitle).toBeInTheDocument();
});

// test("if Space Centers render and shows space center details", () => {
//   render(
//     <TripCard
//       spaceCenter={{
//         id: 1,
//         name: "Accra Space Center",
//         planet: { name: "Earth" },
//       }}
//       marker={{ id: "", isBouncing: false }}
//     />
//   );
//   expect(screen.getByText(/Accra Space Center/i)).toBeInTheDocument();
//   expect(screen.getByText(/Earth/i)).toBeInTheDocument();
// });

// //user interaction test
// test("if hover effect works correctly", () => {
//   const setHovered = (obj) => {
//     return {
//       ...obj,
//       state: !obj.state,
//     };
//   };

//   const component = renderer.create(
//     <TripCard
//       spaceCenter={{
//         id: 1,
//         name: "Accra Space Center",
//         planet: { name: "Earth" },
//       }}
//       marker={{ id: "", isBouncing: false }}
//       setHovered={setHovered}
//     />
//   );
//   let tree = component.toJSON();
//   expect(tree).toMatchSnapshot();
//   //console.log(tree.children[0].props);
//   //manually trigger the callback
//   tree.children[0].props.onMouseEnter();
//   // re-rendering
//   tree = component.toJSON();
//   expect(tree).toMatchSnapshot();

//   // manually trigger the callback
//   tree.children[0].props.onMouseLeave();
//   // re-rendering
//   tree = component.toJSON();
//   expect(tree).toMatchSnapshot();
// });
