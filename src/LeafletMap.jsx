import React, { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";
import "./LeafletMap.css"; // Updated CSS file for layout
import RouteTable from "./RouteTable.jsx";
import LoadingScreen from "./LoadingScreen.jsx"; // Import LoadingScreen component

const LeafletMap = () => {
  const [cities, setCities] = useState([]);
  const [sortedCities, setSortedCities] = useState([]);
  const [routingControl, setRoutingControl] = useState(null);
  const [route, setRoute] = useState([]);
  const [loading, setLoading] = useState(false); // State for loading screen
  const [startTSP, setStartTSP] = useState(false); // State to track user consent
  const [hoveredPoint, setHoveredPoint] = useState(null); // State for hovered point
  const mapRef = useRef();

  const cityData = [
    { name: "New York", x: 40.712776, y: -74.005974 },
    { name: "Los Angeles", x: 34.052235, y: -118.243683 },
    { name: "Chicago", x: 41.878113, y: -87.629799 },
    { name: "Houston", x: 29.760427, y: -95.369804 },
    { name: "Phoenix", x: 33.448376, y: -112.074036 },
    { name: "Philadelphia", x: 39.952583, y: -75.165222 },
    { name: "San Antonio", x: 29.424349, y: -98.491142 },
    { name: "San Diego", x: 32.715736, y: -117.161087 },
    { name: "Dallas", x: 32.776665, y: -96.796989 },
    { name: "San Jose", x: 37.338207, y: -121.88633 },
  ];

  const generateCities = () => {
    setCities(cityData);
    setSortedCities([]);
    if (routingControl) {
      routingControl.getPlan().setWaypoints([]);
    }
  };

  const solveTSP = () => {
    if (cities.length < 2) return;

    setLoading(true); // Show loading screen

    const coordinates = cities.map((city) => [city.y, city.x]);
    const distances = calculateDistanceMatrix(coordinates);

    const tspPath = calculateTSP(distances);
    const sortedCities = tspPath.map((index) => cities[index])
    setSortedCities(sortedCities);

    if (routingControl) {
      routingControl.setWaypoints(
        sortedCities.map((city) => L.latLng(city.x, city.y))
      );
    } else {
      const newRoutingControl = L.Routing.control({
        waypoints: sortedCities.map((city) => L.latLng(city.x, city.y)),
        createMarker: function (i, waypoint) {
          return L.marker(waypoint.latLng).bindPopup(
            `City ${i + 1}: ${sortedCities[i].name}`
          );
        },
        show: false, // Hide overlaying values
      }).addTo(mapRef.current);
      setRoutingControl(newRoutingControl);

      newRoutingControl.on("routesfound", function (e) {
        const routeDetails = e.routes[0].instructions.map((instr) => ({
          direction: instr.text,
          distance: `${instr.distance} m`,
        }));
        setRoute(routeDetails);
        setLoading(false); // Hide loading screen
      });
    }
  };

  const calculateDistanceMatrix = (coordinates) => {
    const numCities = coordinates.length;
    const distances = Array.from({ length: numCities }, () =>
      Array(numCities).fill(0)
    );

    for (let i = 0; i < numCities; i++) {
      for (let j = 0; j < numCities; j++) {
        if (i !== j) {
          distances[i][j] = calculateDistance(coordinates[i], coordinates[j]);
        }
      }
    }
    return distances;
  };

  const calculateDistance = (coord1, coord2) => {
    const [lat1, lon1] = coord1;
    const [lat2, lon2] = coord2;
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const calculateTSP = (distances) => {
    const numCities = distances.length;
    const visited = new Array(numCities).fill(false);
    const path = [0];
    visited[0] = true;

    for (let i = 1; i < numCities; i++) {
      let last = path[path.length - 1];
      let nearest = -1;
      let minDist = Infinity;

      for (let j = 0; j < numCities; j++) {
        if (!visited[j] && distances[last][j] < minDist) {
          nearest = j;
          minDist = distances[last][j];
        }
      }

      path.push(nearest);
      visited[nearest] = true;
    }

    return path;
  };

  useEffect(() => {
    generateCities();
  }, []);

  const startTSPSolution = () => {
    setStartTSP(true);
  };

  const handleRowHover = (index) => {
    setHoveredPoint(sortedCities[index]);
  };

  const handleRowLeave = () => {
    setHoveredPoint(null);
  };

  const whygod = () => {
    alert("Hello boss")
    document.querySelector(".leaflet-routing-container").style.display  = "flex"; 
  }

  const nogod = () => {
    document.querySelector(".leaflet-routing-container").style.display  = "none";
  }

  return (
    <div className="map-container">
      {!startTSP ? (
        <div className="question-container">
          <h2>Are you ready to solve the Travelling Salesman Problem?</h2>
          <button onClick={startTSPSolution}>Yes, let's go!</button>
        </div>
      ) : (
        <>
          <div className="map-table-container">
            <MapContainer
              center={[39.8283, -98.5795]}
              zoom={4}
              style={{ height: "600px", width: "50%" }}
              ref={mapRef}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                id="mapbox/streets-v11"
              />
              {cities.map((city, index) => (
                <Marker
                  key={index}
                  position={[city.x, city.y]}
                  opacity={hoveredPoint === city ? 1 : 0.5}
                >
                  <dialog>
                    {city.name}: [{city.x.toFixed(2)}, {city.y.toFixed(2)}]
                  </dialog>
                </Marker>
              ))}
            </MapContainer>
            <div className="route-table-wrapper">
              <RouteTable
                route={route}
                onRowHover={handleRowHover}
                onRowLeave={handleRowLeave}
              />
            </div>
          </div>
          <div className="controls">
            <button onClick={generateCities}>Generate Cities</button>
            <button onClick={solveTSP}>Solve TSP</button>
            <button onClick={whygod}>Show Directions</button>
            <button onClick={nogod}>Hide Directions</button>
          </div>
          {loading && <LoadingScreen />} {/* Show loading screen */}
        </>
      )}
    </div>
  );
};

export default LeafletMap;
