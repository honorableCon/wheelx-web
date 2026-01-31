/**
 * WheelX Admin Dashboard - API Types
 * Shared type definitions for API responses
 */

// ===========================================
// Base Types
// ===========================================

export interface ApiResponse<T> {
  data: T;
  message?: string;
  statusCode: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ApiError {
  statusCode: number;
  message: string;
  error?: string;
}

// ===========================================
// User Types
// ===========================================

export interface User {
  id: string;
  _id?: string;
  email: string;
  username: string;
  displayName: string;
  avatar?: string;
  bio?: string;
  location?: string;
  country?: string;
  role: 'user' | 'admin' | 'moderator';
  isVerified: boolean;
  isBanned: boolean;
  isDeleted: boolean;
  stats?: UserStats;
  createdAt: string;
  updatedAt: string;
}

export interface UserStats {
  totalRides: number;
  totalDistance: number;
  totalDuration: number;
  followers: number;
  following: number;
}

// ===========================================
// Ride Types
// ===========================================

export interface Ride {
  id: string;
  _id?: string;
  name: string;
  userId: string;
  user?: User;
  motorcycleId?: string;
  motorcycle?: Motorcycle;
  distance: number;
  duration: number;
  avgSpeed: number;
  maxSpeed: number;
  startLocation?: string;
  endLocation?: string;
  coordinates: Coordinate[];
  weather?: WeatherData;
  isPublic: boolean;
  completedAt: string;
  createdAt: string;
}

export interface Coordinate {
  latitude: number;
  longitude: number;
  altitude?: number;
  speed?: number;
  heading?: number;
  timestamp?: number;
}

export interface ActiveRide {
  id: string;
  _id?: string;
  code: string;
  hostId: string;
  host?: User;
  participants: RideParticipant[];
  status: 'active' | 'paused' | 'stopped';
  createdAt: string;
}

export interface RideParticipant {
  oderId: string;
  username: string;
  avatar?: string;
  latitude: number;
  longitude: number;
  speed: number;
  status: 'en-route' | 'stopped' | 'sos';
}

// ===========================================
// Motorcycle Types
// ===========================================

export interface Motorcycle {
  id: string;
  _id?: string;
  userId: string;
  brand: string;
  model: string;
  year: number;
  displacement?: number;
  color?: string;
  image?: string;
  insurance?: Insurance;
  mileage?: number;
  createdAt: string;
}

export interface Insurance {
  company?: string;
  policyNumber?: string;
  expirationDate?: string;
}

// ===========================================
// Group Types
// ===========================================

export interface Group {
  id: string;
  _id?: string;
  name: string;
  description?: string;
  image?: string;
  ownerId: string;
  owner?: User;
  membersCount: number;
  isPublic: boolean;
  country?: string;
  createdAt: string;
}

// ===========================================
// Garage Types
// ===========================================

export interface Garage {
  id: string;
  _id?: string;
  name: string;
  description?: string;
  address: string;
  latitude: number;
  longitude: number;
  phone?: string;
  email?: string;
  website?: string;
  image?: string;
  images: string[];
  services: string[];
  rating: number;
  reviewsCount: number;
  isVerified: boolean;
  country?: string;
  createdAt: string;
}

// ===========================================
// Station Types
// ===========================================

export interface Station {
  id: string;
  _id?: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  brand?: string;
  fuelTypes: string[];
  amenities: string[];
  isOpen24h: boolean;
  rating: number;
  country?: string;
  createdAt: string;
}

// ===========================================
// Event Types
// ===========================================

export interface Event {
  id: string;
  _id?: string;
  title: string;
  description?: string;
  image?: string;
  organizerId: string;
  organizer?: User;
  groupId?: string;
  group?: Group;
  startDate: string;
  endDate?: string;
  location: string;
  latitude: number;
  longitude: number;
  participantsCount: number;
  maxParticipants?: number;
  isPublic: boolean;
  country?: string;
  createdAt: string;
}

// ===========================================
// Danger Zone Types
// ===========================================

export type DangerZoneType =
  | 'accident'
  | 'road_damage'
  | 'obstacle'
  | 'weather'
  | 'police'
  | 'construction'
  | 'other';

export type DangerZoneSeverity = 'low' | 'medium' | 'high';

export interface DangerZone {
  id: string;
  _id?: string;
  type: DangerZoneType;
  severity: DangerZoneSeverity;
  description?: string;
  latitude: number;
  longitude: number;
  reporterId: string;
  reporter?: User;
  confirmations: number;
  isActive: boolean;
  expiresAt?: string;
  createdAt: string;
}

// ===========================================
// Report Types
// ===========================================

export type ReportType = 'user' | 'ride' | 'group' | 'event' | 'post' | 'comment';
export type ReportStatus = 'pending' | 'reviewed' | 'resolved' | 'dismissed';

export interface Report {
  id: string;
  _id?: string;
  type: ReportType;
  targetId: string;
  reason: string;
  description?: string;
  reporterId: string;
  reporter?: User;
  status: ReportStatus;
  reviewedBy?: string;
  reviewedAt?: string;
  createdAt: string;
}

// ===========================================
// Weather Types
// ===========================================

export interface WeatherData {
  temperature: number;
  condition: string;
  icon?: string;
  symbolName?: string;
  humidity?: number;
  windSpeed?: number;
  windDirection?: number;
  visibility?: number;
  uvIndex?: number;
}

export interface WeatherForecast {
  date: string;
  high: number;
  low: number;
  condition: string;
  icon?: string;
  precipitationChance?: number;
}

// ===========================================
// Admin Dashboard Types
// ===========================================

export interface AdminStats {
  users: {
    total: number;
    active: number;
    banned: number;
    newThisMonth: number;
  };
  rides: {
    total: number;
    totalDistance: number;
    averageDistance: number;
    thisMonth: number;
  };
  groups: {
    total: number;
    public: number;
    private: number;
  };
  reports: {
    pending: number;
    resolved: number;
    thisMonth: number;
  };
}

export interface CountryStats {
  country: string;
  users: number;
  rides: number;
  groups: number;
}
