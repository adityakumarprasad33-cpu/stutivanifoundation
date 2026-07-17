export interface YouTubeOEmbedResponse {
  title: string;
  author_name: string;
  thumbnail_url: string;
  html: string;
}

export const extractYouTubeId = (url: string): string | null => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};

export const fetchYouTubeMetadata = async (url: string): Promise<YouTubeOEmbedResponse | null> => {
  try {
    const response = await fetch(`https://www.youtube.com/oembed?url=${encodeURIComponent(url)}&format=json`);
    if (!response.ok) return null;
    const data = await response.json();
    return data as YouTubeOEmbedResponse;
  } catch (error) {
    console.error('Failed to fetch YouTube oEmbed data', error);
    return null;
  }
};
