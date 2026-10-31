export interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  stack: string[];
  cover: string;
  images: string[];
  url?: string;
  video?: string; // recorrido corto en .mp4/.webm, se reproduce sin sonido

}
