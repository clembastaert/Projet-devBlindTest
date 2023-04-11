import { SavedTrack } from 'spotify-types';

const apiToken: string =
  'BQC1eqnU9LRYLhpoc7z1HTxoQPs-WXj7_WY4fxDLatmATN8sYRhc_-R1xu-KmvjSesN7oINuPPahxExyQugqzYoA9dA_YkNC70tdZBbt2H4998wRIEaNZO3Rw7LuSErQeMWe_eTdKum2kDgHdDOZJNW6KvInm9c9_68s6sCuq_aKKw2TqNuiK0BCgVZkbMB9AOC8lPI3cO4GEZCQQIKB7OuJ6m5QOIPCtzeSNqfZWdqzud-LGgLIrdJGUD0znzcvH786Xz56sna7naYQGnu2GFI-O8JpRBwhfDlNdRWrv5LpCID2QrUZQhTad9E0SIdllNR4Qz7VzQuIjVFtbqIZcOQ';

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
  const data = (await response.json()) as { items: unknown[] };

  return data.items;
};
