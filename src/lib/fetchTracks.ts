import { SavedTrack } from 'spotify-types';

const apiToken: string =
  'BQA1J4oTpIo6U8Cdx0K3RdeYQrDMm9kd1ruCZSCDLeCMRuYSh5B87P-EaZW9KPUV3OvtUhRMOUVHXhWyUGmDOY5KN4lOTSUHWKILRQz1rV1ZfuL44ack03Fay221uDbYHbaT-EcEQS6rMKfoX99o2b8-gavFYoTgWDNa7Fx-BoyED3-CoMEMaCY_7jb9oLosPQHThRBL3-om3HOoxIBIj8OBXJzvUOqMvpvBoddDA3Kn6NWmTD_F1R_RDB3kdgY4gkmczPuy9mxKg5hBZAWKsjSCozpD1EaBIy1IRrw_TxAJ9gPbsP3WvgoEHDb8Vs1GL3GDYdDObusvEtFOxOKox9H5qS79_5s7BlITHpkr03o';

export const fetchTracks = async () => {
  let allTracks: SavedTrack[] = [];
  let nextUrl = 'https://api.spotify.com/v1/me/tracks?limit=50';

  while (nextUrl) {
    const response = await fetch(nextUrl, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + apiToken,
      },
    });
    if (!response.ok) {
      throw new Error(`Fetching tracks failed with status ${response.status}`);
    }
    const data = (await response.json()) as {
      items: SavedTrack[];
      next: string | null;
    };
    allTracks = allTracks.concat(data.items);
    nextUrl = data.next;
  }

  return allTracks;
};
