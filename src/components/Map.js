import React, { useState, useMemo, useContext, useEffect, useRef } from "react";
import Map, {
  Marker,
  Popup,
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl,
} from "react-map-gl";

import YellowPin from "../assets/marker.png";
import RedPin from "../assets/red.png";
import space_image from "../assets/space_image.png";

import { AppContext } from "../App";

const MapBody = () => {
  const [popupInfo, setPopupInfo] = useState(null);
  const [
    spaceCenters,
    setSpaceCenters,
    trips,
    setTrips,
    viewState,
    setViewState,
    hovered,
    setHovered,
    marker,
    setMarker,
    mapCenter,
    setMapCenter,
  ] = useContext(AppContext);

  const markerRef = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    // Using easeTo options.
    setTimeout(() => {
      mapRef.current.easeTo({
        center: mapCenter,
        zoom: 3.5,
        speed: 0.3,
        curve: 1,
        duration: 5000,
        easing(t) {
          return t;
        },
      });
    }, 1000);
  }, [mapCenter]);

  const handleMarkerInteraction = (sp_center) => {
    setPopupInfo({ ...sp_center, image: space_image });
    setMarker({ id: sp_center.name.split(" ").join("-"), isBouncing: true });

    let elementId = sp_center.name.split(" ").join("-");
    let element = document.getElementById(`${elementId}`);

    // scroll to element
    element.scrollIntoView({
      behavior: "smooth",
    });

    // element.style.border = "1px solid gold";
    element.style.boxShadow = "0 4px 8px 0 rgba(0, 0, 0, 0.2)";

    //stop bouncing after 3 seconds
    setTimeout(() => {
      setMarker({ id: sp_center.name.split(" ").join("-"), isBouncing: false });
      element.style.boxShadow = null;
    }, 3000);
  };

  const pins = useMemo(
    () =>
      trips.map((center, index) => (
        <Marker
          key={`marker-${index}`}
          longitude={center.longitude}
          latitude={center.latitude}
          anchor="bottom"
        >
          {hovered.state && hovered.id == center.name.split(" ").join("-") ? (
            <img
              ref={markerRef}
              src={RedPin}
              alt="red-image"
              onClick={() => handleMarkerInteraction(center)}
            />
          ) : (
            <img
              ref={markerRef}
              src={YellowPin}
              alt="yellow-image"
              onClick={() => handleMarkerInteraction(center)}
            />
          )}
        </Marker>
      )),
    [spaceCenters, hovered]
  );

  return (
    <div className="map-body">
      <Map
        ref={mapRef}
        id="space-centers-map"
        initialViewState={viewState}
        onMove={(evt) => setViewState(evt.viewState)}
        mapStyle="mapbox://styles/mapbox/dark-v8"
        mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
      >
        <GeolocateControl position="top-right" />
        <NavigationControl position="top-right" />
        <FullscreenControl position="top-right" />
        <ScaleControl />

        {popupInfo && (
          <Popup
            style={{ cursor: "pointer" }}
            anchor="bottom"
            longitude={Number(popupInfo.longitude)}
            latitude={Number(popupInfo.latitude)}
            closeOnClick={false}
            onClose={() => setPopupInfo(null)}
          >
            <img
              width="100%"
              src={popupInfo.image}
              alt="marker"
              style={{ height: 150 }}
              onClick={() => setPopupInfo(null)}
              title={popupInfo.description}
            />
            <div
              style={{
                height: 30,
                fontFamily: "Lato",
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              {popupInfo.name} -{" "}
              <span style={{ color: "gold" }}>{popupInfo.planet.name}</span>
            </div>
          </Popup>
        )}
        {pins}
      </Map>
    </div>
  );
};

export default MapBody;
