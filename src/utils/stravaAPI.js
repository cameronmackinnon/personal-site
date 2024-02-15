const authLink = 'https://www.strava.com/oauth/token';

// Parameters for fetching activities
const page = 1; // Initialize page number for pagination
const perPage = 200; // Number of activities to return per page

// Convert specific dates to Unix timestamp
const startDate = new Date('2019-01-01');
const startTimestamp = Math.floor(startDate.getTime() / 1000);

const endDate = new Date('2024-12-31'); // Adjusted for clarity
const endTimestamp = Math.floor(endDate.getTime() / 1000);

// ReAuthorization function
export const reAuthorize = async () => {
  try {
    const response = await fetch(authLink, {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: 118659,
        client_secret: '3e5addf2e37c9076c3dc8be35c22596fa40cc957',
        refresh_token: '194beac9741036d4588ce1cdc43fb229dcb5dab0',
        grant_type: 'refresh_token',
      }),
    });
    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error('Error during reauthorization:', error);
    throw new Error('Reauthorization failed');
  }
};

// Fetch activities function
export const fetchActivities = async (accessToken) => {
  try {
    let allActivities = [];
    let isFetching = true;
    let currentPage = page;

    while (isFetching) {
      const activitiesLink = `https://www.strava.com/api/v3/athlete/activities?access_token=${accessToken}&page=${currentPage}&per_page=${perPage}&before=${endTimestamp}&after=${startTimestamp}`;
      // eslint-disable-next-line no-await-in-loop
      const response = await fetch(activitiesLink);
      // eslint-disable-next-line no-await-in-loop
      const data = await response.json();

      if (data.length === 0) {
        isFetching = false;
      } else {
        allActivities = allActivities.concat(data);
        currentPage += currentPage;
      }
    }

    return allActivities;
  } catch (error) {
    console.error('Error fetching activities:', error);
    throw new Error('Fetching activities failed');
  }
};
