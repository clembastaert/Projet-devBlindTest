import { SavedTrack } from 'spotify-types';

const apiToken: string =
  'BQAgaLvgjH5WHttgE6ygpLvglVWVu09uLbfGF_uRvQOOFMquETKzCTtwCkUEWRJIk0VE1qhqq4wQJ8tItLp0sYb3oORCf7ViBg0EqMqJqilWqhnCj47qCfyXTPAftPbf1jlb5YmA07hlhEjWdSnLg6IKXKRctlKlZU27Om_ARK9W7TiRNcoY8P0KzLHYrtwwckV7pzcaNNvePTEz8qcBgF7_FO8yThMSK7956cVijg2fyt9Hsa-I6kE6D8b5EJKiLY9QzIPbYx0x7VozJM30WHfJjOMkDNx_XS1dz-DywZ98glu2whoJi043r46TVZnNbUNSIRk_qxEll1MvVUjlM4E';

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
