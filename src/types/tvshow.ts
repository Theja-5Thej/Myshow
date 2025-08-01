export interface TVShow {
  id: string;
  title: string;
  type: 'Movie' | 'TV Show';
  director: string;
  budget: number;
  location: string;
  duration: string;
  year: string;
  posterUrl: string; // this will be a URL to the uploaded image
}