import { useEffect, useState } from 'react';
import { reAuthorize, fetchActivities } from '../utils/stravaAPI';

const useStravaActivities = () => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const initializeStravaData = async () => {
      try {
        const accessToken = await reAuthorize();
        const activitiesData = await fetchActivities(accessToken);
        setActivities(activitiesData);
      } catch (error) {
        console.error('Error initializing Strava data:', error);
      }
    };

    initializeStravaData();
  }, []);

  return activities;
};

export default useStravaActivities; // Changed to default export
