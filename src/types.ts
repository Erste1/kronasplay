export type Platform = 'all' | 'windows' | 'android';
export type ProjectType = 'all' | 'game' | 'app' | 'extension';

export type SortOption = 'newest' | 'popular' | 'rating' | 'title';

export interface Review {
  id: string;
  projectId: string;
  authorName: string;
  rating: number; // 1 to 5
  comment: string;
  date: string;
}

export interface SystemRequirements {
  os?: string;
  processor?: string;
  ram?: string;
  graphics?: string;
  androidVersion?: string;
  storage?: string;
}

export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  platform: 'windows' | 'android' | 'both';
  type: 'game' | 'app' | 'extension';
  version: string;
  releaseDate: string;
  rating: number;
  downloadsCount: number;
  starsCount: number;
  tags: string[];
  bannerUrl: string;
  screenshots: string[];
  githubUrl?: string;
  downloadUrlExe?: string;
  downloadUrlApk?: string;
  demoUrl?: string;
  featured?: boolean;
  isNew?: boolean;
  requirements?: SystemRequirements;
  changelog?: string[];
}

export interface DeveloperProfile {
  name: string;
  tagline: string;
  bio: string;
  avatarUrl: string;
  githubUsername?: string;
  telegramUsername?: string;
  discordTag?: string;
  email?: string;
  youtubeUrl?: string;
  itchioUrl?: string;
  skills: string[];
  footerText?: string;
  heroTitle?: string;
  heroSubtitle?: string;
}

export type BlockPosition = 
  | 'under_header'
  | 'under_hero'
  | 'under_news'
  | 'under_filter'
  | 'under_catalog'
  | 'under_about'
  | 'before_footer';

export type BlockType = 
  | 'announcement'
  | 'info'
  | 'warning'
  | 'ad_banner'
  | 'embed_code';

export interface CustomBlock {
  id: string;
  title: string;
  content: string;
  type: BlockType;
  position?: BlockPosition;
  date: string;
  targetUrl?: string;
  imageUrl?: string;
  hideTitle?: boolean;
}

