import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Link } from 'react-router-dom';
import useStravaActivities from '../hooks/useStravaActivities';
import '../utils/Polyline.encoded';
import Main from '../layouts/Main';

// Function to return a color based on activity type
function getColorForActivityType(type) {
  const activityColors = {
    Ride: '#2196F3', // light blue
    Run: 'green',
    Workout: 'yellow',
    Walk: '#9E9E9E', // light grey //yellow '#FFC107'
    Hike: '#FD7E14', // orange
  };

  // Return the color if found, or a default color if not
  return activityColors[type] || '#999'; // Default color if type not found
}

// Convert speed (m/s) (strava default) to pace (min/km)
function speedToPace(metersPerSecond) {
  if (!metersPerSecond) return 'N/A';
  const pace = 1000 / metersPerSecond; // time in seconds to cover 1 kilometer
  const minutes = Math.floor(pace / 60);
  const seconds = Math.round(pace % 60);
  return `${minutes}:${seconds.toString().padStart(2, '0')} min/km`;
}

const Strava = () => {
  const activities = useStravaActivities();
  const mapRef = useRef(null);

  // Function to change the map view
  const setMapView = (coordinates, zoomLevel) => {
    if (mapRef.current) {
      mapRef.current.setView(coordinates, zoomLevel);
    }
  };

  useEffect(() => {
    if (mapRef.current === null) {
      mapRef.current = L.map('map').setView([43.668885, -79.399552], 12);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(mapRef.current);
    }

    // Assuming activities is an array of activity objects
    activities.forEach((activity) => {
      const coordinates = L.Polyline.fromEncoded(activity.map.summary_polyline).getLatLngs();
      const color = getColorForActivityType(activity.type);

      const polyline = L.polyline(coordinates, {
        color,
        weight: 5,
        opacity: 0.7,
        lineJoin: 'round',
      }).addTo(mapRef.current); // Use mapRef.current instead of map

      let popupContent = `
          <h2>${activity.name}</h2>
          <hr>
          <strong>Type:</strong> ${activity.type}<br>
          <strong>Date:</strong> ${new Date(activity.start_date).toLocaleDateString()}<br>
          <strong>Average Heart Rate:</strong> ${activity.average_heartrate || 'N/A'}<br>
          <strong>Distance:</strong> ${((activity.distance) / 1000).toFixed(2)} kilometers<br>
      `;

      if (activity.type === 'Run' && activity.average_speed) {
        const pace = speedToPace(activity.average_speed);
        popupContent += `<strong>Pace:</strong> ${pace}<br>`;
      }

      polyline.bindPopup(popupContent);
    });
    // Cleanup function to run when the component unmounts or before re-running the effect
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [activities]); // Dependency on activities ensures map updates when activities are fetched

  return (
    <Main
      title="Strava Activities"
      description="View my Strava activities"
    >
      <article className="post" id="strava-activities">
        <header>
          <div className="title">
            <h2>Strava API</h2>
            <p>
              Visualizing my strava data on a map
            </p>
          </div>
        </header>
        <p>
          Following this <Link to="https://www.youtube.com/watch?v=sgscChKfGyg&list=PLO6KswO64zVvcRyk0G0MAzh5oKMLb6rTW&ab_channel=franchyze923">tutorial</Link>,
          I was able to map my Strava data onto a Leaflet map. Strava has a free API that allows you
          to access your activities, stats, kudos, and much more. I&apos;ve wanted to use it for a
          while, so incorporating it into this website was a perfect opportunity.
          Please play around with the map below, or you can click the pre-set buttons on the left
          to see where I&apos;ve completed most of my activities (primarily running). You can click
          on each activity to get more information about the specific event. Enjoy!
        </p>
        <div className="content-container"> {/* Flex container */}
          <div className="legend"> {/* Legend */}
            <h3>Legend</h3>
            <ul>
              <li><span className="color-box run" />Run</li>
              <li><span className="color-box ride" />Ride</li>
              <li><span className="color-box walk" />Walk</li>
              <li><span className="color-box workout" />Workout</li>
              <li><span className="color-box hike" />Hike</li>
            </ul>
            <button type="button" onClick={() => setMapView([43.668885, -79.399552], 12)}>Toronto</button>
            <button type="button" onClick={() => setMapView([44.233754, -76.505308], 13)}>Kingston</button>
            <button type="button" onClick={() => setMapView([44.642264, -63.586099], 13)}>Halifax</button>
            <button type="button" onClick={() => setMapView([43.675854, -79.361532], 3)}>International</button>
          </div>
          <div className="strava-map-container" style={{ height: '600px', width: '600px' }}>
            <div id="map" style={{ height: '100%', width: '100%' }} />
          </div>
        </div>
      </article>
    </Main>
  );
};

export default Strava;
