import { SavedTrack } from 'spotify-types';

const apiToken: string =
  'BQCxn8cFvY7lIh_hCqRDU0pwyXOnAZdBMWAGe00FFH8G7hauu-zrCqhmVwOg-XUMg4Dl70Ur4rJ5xNux0YN0-pgFq9Oo9bWxGy6VefRjH1Mc5ViKHRwprXM-Y35J5WuYBaA2nXwMyFiCoM0IXINGrr7idT_z3VIgWabbVY19BtBP1RevB3PfBTxbBAn0epOEhqb_waKLBtoh8OOv0V8xyDEDLGU58ZKmW8FEb3-a7kXsOjPfH9LwAOwc9UQl8jdts5IB-Kqv7NCVT7yWnm4ddh_C1R7nLUUAnmKt3jB-LTTV0Bv00y90-dTZDqRaVzMO7zcss17jhgwj6To4IbBPDrw';

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
