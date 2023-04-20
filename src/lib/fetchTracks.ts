import { SavedTrack } from 'spotify-types';

const apiToken: string =
  'BQCBLUwVhVxktkcPqO6op6Lb-NQXtYxDjY6y9NFXzaWYwz7rpv4FtY9JPVx1myLg7ui9yqB-hFt4OdqVx385kcrT9MlQAqFrLhGquDH0EKeq0dq_sAUog0L06WXa7pTeUe6-APPCVQY_NiK85vr2ow253ZOL5enEQ-x7yKI4teHD5fudONKyQ42X_SbzAPu2H7VdQcqH5dhwHaadC-RBfsqqe_89L_zrpU5vnpE5oN-FYusWpidOtBcxCbd8xe4PElxULQLMAlYA5wmlI8vhTwjeDx0teYQNIhO313hYiPvAIWeUvyylwvWWtHzsVOLBEZoz0EX04dg2Vd84WXwayWQ';

export const fetchTracks = async () => {
  const response = await fetch('https://api.spotify.com/v1/me/tracks', {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + apiToken,
    },
  });
  if (!response.ok) {
    throw new Error(`Fetching tracks failed with status ${response.status}`);
  }
  const data = (await response.json()) as { items: SavedTrack[] };

  return data.items;
};
