// Type definitions for Strava API responses
interface StravaTokenResponse {
  token_type: "Bearer";
  expires_at: number;
  expires_in: number;
  refresh_token: string;
  access_token: string;
}

export interface StravaActivity {
  id: number;
  name: string;
  distance: number; // in meters
  moving_time: number; // in seconds
  elapsed_time: number; // in seconds
  total_elevation_gain: number; // in meters
  type: string;
  start_date: string;
  start_date_local: string;
  timezone: string;
  utc_offset: number;
  map: {
    id: string;
    summary_polyline: string;
    resource_state: number;
  };
  average_speed: number; // in meters per second
  max_speed: number; // in meters per second
}

const client_id = import.meta.env.STRAVA_CLIENT_ID;
const client_secret = import.meta.env.STRAVA_CLIENT_SECRET;
const refresh_token = import.meta.env.STRAVA_REFRESH_TOKEN;

const TOKEN_ENDPOINT = "https://www.strava.com/oauth/token";
const ACTIVITIES_ENDPOINT = "https://www.strava.com/api/v3/athlete/activities";

// Function to refresh the authorization token
const getAccessToken = async (): Promise<StravaTokenResponse> => {
  if (!client_id || !client_secret || !refresh_token) {
    throw new Error(
      "Missing Strava environment variables (CLIENT_ID, CLIENT_SECRET, REFRESH_TOKEN)",
    );
  }

  const response = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      client_id,
      client_secret,
      refresh_token,
      grant_type: "refresh_token",
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error("Failed to refresh Strava token:", errorData);
    throw new Error(`Strava token refresh failed: ${response.statusText}`);
  }

  return response.json();
};

// Function to get the latest activities
export const getLatestActivities = async (
  limit = 3,
): Promise<StravaActivity[]> => {
  try {
    const { access_token } = await getAccessToken();

    const response = await fetch(`${ACTIVITIES_ENDPOINT}?per_page=${limit}`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Failed to fetch Strava activities:", errorData);
      throw new Error(
        `Fetching Strava activities failed: ${response.statusText}`,
      );
    }

    const activities: StravaActivity[] = await response.json();
    return activities;
  } catch (error: any) {
    console.error("Error in getLatestActivities:", error.message);
    // In case of an error (e.g., invalid refresh token, network issue), return an empty array
    // to prevent the build from crashing.
    return [];
  }
};
