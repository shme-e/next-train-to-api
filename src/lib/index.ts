// Top-level response
export interface ServicesResponse {
  location: StationLocation;
  filter: {
    destination: StationLocation;
  };
  services: Service[];
}

// Generic station/location object (location + filter.destination)
export interface StationLocation {
  name: string;
  crs: string;
  tiploc: string;
  country: string;
  system: string;
}

// Origin/destination entries within a service's locationDetail
export interface ServiceEndpoint {
  tiploc: string;
  description: string;
  workingTime: string; // e.g. "195600"
  publicTime: string;  // e.g. "1956"
}

// Detail for the service at the queried location
export interface LocationDetail {
  realtimeActivated: boolean;
  tiploc: string;
  crs: string;
  description: string;

  gbttBookedArrival?: string;   // e.g. "2005"
  gbttBookedDeparture?: string; // e.g. "1956"

  origin: ServiceEndpoint[];
  destination: ServiceEndpoint[];

  isCall: boolean;
  isPublicCall: boolean;

  realtimeArrival?: string;
  realtimeArrivalActual?: boolean;
  realtimeDeparture?: string;
  realtimeDepartureActual?: boolean;

  platform?: string;
  platformConfirmed?: boolean;
  platformChanged?: boolean;

  serviceLocation?: string; // e.g. "AT_PLAT"
  displayAs: string;        // e.g. "ORIGIN" | "CALL"
}

// Individual service
export interface Service {
  locationDetail: LocationDetail;

  serviceUid: string;      // e.g. "Y31318"
  runDate: string;         // e.g. "2025-11-27"
  trainIdentity: string;   // e.g. "2C63"
  runningIdentity: string; // e.g. "2C63"

  atocCode: string;        // e.g. "GN"
  atocName: string;        // e.g. "Great Northern"

  serviceType: string;     // e.g. "train"
  isPassenger: boolean;
}