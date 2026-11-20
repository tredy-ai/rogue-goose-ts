export const ANY_ALL = "Any/All" as const;

export const FORM_FIELDS = {
  searchText: "searchText",
  howMany: "howMany",
  nation: "nation",
  orbitRegime: "orbitRegime",
  missionStatus: "missionStatus",
} as const;

export const COUNTRY_OPTIONS = [
  "United States",
  "India",
  "Russia",
  "Japan",
  "Saudi Arabia",
  "Luxembourg",
] as const;

export const ORBIT_OPTIONS = [
  "Low Earth (LEO)",
  "Medium Earth (MEO)",
  "Geostationary (GEO)",
  "High Earth (HEO)",
  "Sun-Synchronous (SSO)",
  "Very Low Earth (VLEO)",
] as const;

export const STATUS_OPTIONS = [
  "Operational",
  "Nonoperational",
  "Partially Operational",
  "Standby",
  "Spare",
  "Extended Mission",
  "Decayed",
  "Unknown",
] as const;

export type CountryLabel = (typeof COUNTRY_OPTIONS)[number];
export type OrbitLabel = (typeof ORBIT_OPTIONS)[number];
export type StatusLabel = (typeof STATUS_OPTIONS)[number];
