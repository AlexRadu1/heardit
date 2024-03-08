export type Track = {
  uri: string;
  id: string | null;
  type: string;
  media_type: string;
  name: string;
  is_playable: boolean;
  album: { uri: string; name: string; images: { url: string }[] };
  artists: { uri: string; name: string }[];
};
