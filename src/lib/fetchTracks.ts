import { SavedTrack } from 'spotify-types';

const apiToken: string =
  'BQDk8aAIH-M7EcFICYii9ISkvc-9GhKVHqQzeODF0CEGB6K8vBVTUZTqbcy9IgZYMVZC0P7A5t-fS5zth1DewovuqeTyxjKF71BapSlbKa1DGWnfmHTVxVv9Dl61_TbaQSxoZDNcHUr9kL6pUMJFXHlpsmC9GPgj_DRqoJ_By584PkLdUogCP7NWgHCMQ2SOh5QRRXVz1nr11_f1pu9zOyVILeAQMhWK0x5L330hiaYyADpYZq2qkuYcey8lWOFqULmIESQgmc62yYQsV3dGLG_egxEqRNDA18tkzm5VEp4PVDnrpcoPdmMLO2IGmG8UHsrMQ4TjeBcL8wYDM5bNoCU';

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
