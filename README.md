# Leaflet Map TSP Solver

This project is a React-based web application that solves the Travelling Salesman Problem (TSP) using a set of predefined cities. It uses the Leaflet library for map rendering and the Leaflet Routing Machine for route visualization. The application allows users to generate cities, solve the TSP, and display the route directions.

## Features

- Generate a set of predefined cities on the map.
- Solve the Travelling Salesman Problem (TSP) to find the shortest route visiting all cities.
- Display the calculated route on the map.
- Show and hide detailed route directions in a container.
- Show a loading screen while the TSP solution is being calculated.

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/tsp-visualizer.git
   ```
2. Navigate to the project directory:
   ```sh
   cd travelling_salesman
   ```
3. Install the dependencies:
   ```sh
   npm install
   ```

## Usage

1. Start the development server:
   ```sh
   npm run dev
   ```
2. Open your browser and navigate to `http://localhost:5137`.

## File Structure

- `src/`
  - `components/`
    - `LeafletMap.jsx`: Main component for the map and TSP solver.
    - `RouteTable.jsx`: Component to display the route directions.
    - `LoadingScreen.jsx`: Component to display a loading screen.
  - `LeafletMap.css`: CSS file for styling the map and related components.
  - `index.js`: Entry point of the application.

## Dependencies

- React: JavaScript library for building user interfaces.
- Leaflet: JavaScript library for interactive maps.
- Leaflet Routing Machine: Routing control for Leaflet.

## How to Use

1. When the application starts, you will be prompted with a question: "Are you ready to solve the Travelling Salesman Problem?". Click the button to start.
2. Use the "Generate Cities" button to place the predefined cities on the map.
3. Click the "Solve TSP" button to calculate the shortest route visiting all cities.
4. Use the "Show Directions" button to toggle the visibility of the route directions.

## Customization

- You can customize the list of cities in the `cityData` array inside `LeafletMap.jsx`.
- Adjust the map's center and zoom level by modifying the `MapContainer` component's `center` and `zoom` props.

## License

This project is licensed under the MIT License. See the `LICENSE` file for more details.

---

Feel free to modify and enhance this project as per your requirements. Contributions and feedback are welcome!

---

## Author

- Eshwanth Karti T R - [GitHub](https://github.com/eshwanthkartitr)

---

Happy coding! 😊
