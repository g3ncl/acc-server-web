export type Configs = {
  configuration?: ServerConfiguration;
  settings?: ServerSettings;
  event?: EventConfiguration;
  eventRules?: EventRules;
  assistRules?: AssistRules;
  entrylist?: EntryList;
  bop?: BalanceOfPerformance;
};
// configuration.json
export interface ServerConfiguration {
  udpPort: number;
  tcpPort: number;
  maxConnections: number;
  lanDiscovery: 0 | 1;
  registerToLobby: 0 | 1;
  configVersion: number;
  publicIP?: string;
}

// settings.json
export interface ServerSettings {
  serverName: string;
  adminPassword: string;
  carGroup: "FreeForAll" | "GT3" | "GT4" | "GT2" | "GTC" | "TCX";
  trackMedalsRequirement: 0 | 1 | 2 | 3;
  safetyRatingRequirement: number;
  racecraftRatingRequirement: number;
  password?: string;
  spectatorPassword?: string;
  maxCarSlots: number;
  dumpLeaderboards: 0 | 1;
  isRaceLocked: 0 | 1;
  randomizeTrackWhenEmpty: 0 | 1;
  centralEntryListPath?: string;
  allowAutoDQ: 0 | 1;
  shortFormationLap: 0 | 1;
  dumpEntryList: 0 | 1;
  formationLapType: 0 | 1 | 3;
  ignorePrematureDisconnects?: 0 | 1;
}

// event.json
export interface Session {
  hourOfDay: number;
  dayOfWeekend: 1 | 2 | 3;
  timeMultiplier: number;
  sessionType: "P" | "Q" | "R";
  sessionDurationMinutes: number;
}

export interface EventConfiguration {
  track:
    | "monza"
    | "zolder"
    | "brands_hatch"
    | "silverstone"
    | "paul_ricard"
    | "misano"
    | "spa"
    | "nurburgring"
    | "barcelona"
    | "hungaroring"
    | "zandvoort"
    | "kyalami"
    | "mount_panorama"
    | "suzuka"
    | "laguna_seca"
    | "imola"
    | "oulton_park"
    | "donington"
    | "snetterton"
    | "cota"
    | "indianapolis"
    | "watkins_glen"
    | "valencia"
    | "nurburgring_24h";
  preRaceWaitingTimeSeconds: number;
  sessionOverTimeSeconds: number;
  ambientTemp: number;
  cloudLevel: number;
  rain: number;
  weatherRandomness: number;
  configVersion: number;
  sessions: Session[];
  postQualySeconds?: number;
  postRaceSeconds?: number;
  metaData?: string;
  simracerWeatherConditions?: 0 | 1;
  isFixedConditionQualification?: 0 | 1;
}

// eventRules.json
export interface EventRules {
  qualifyStandingType: 1 | 2;
  pitWindowLengthSec: number;
  driverStintTimeSec: number;
  mandatoryPitstopCount: number;
  maxTotalDrivingTime: number;
  maxDriversCount: number;
  isRefuellingAllowedInRace: boolean;
  isRefuellingTimeFixed: boolean;
  isMandatoryPitstopRefuellingRequired: boolean;
  isMandatoryPitstopTyreChangeRequired: boolean;
  isMandatoryPitstopSwapDriverRequired: boolean;
  tyreSetCount?: number;
}

// assistRules.json
export interface AssistRules {
  stabilityControlLevelMax: number;
  disableAutosteer: 0 | 1;
  disableAutoLights: 0 | 1;
  disableAutoWiper: 0 | 1;
  disableAutoEngineStart: 0 | 1;
  disableAutoPitLimiter: 0 | 1;
  disableAutoGear: 0 | 1;
  disableAutoClutch: 0 | 1;
  disableIdealLine: 0 | 1;
}

// entrylist.json
export interface EntryListDriver {
  playerID: string;
  firstName?: string;
  lastName?: string;
  shortName?: string;
  driverCategory?: 0 | 1 | 2 | 3;
}

export interface EntryListEntry {
  drivers: EntryListDriver[];
  raceNumber: number;
  forcedCarModel: number;
  overrideDriverInfo: 0 | 1;
  isServerAdmin?: 0 | 1;
  defaultGridPosition?: number;
  ballastKg?: number;
  restrictor?: number;
  customCar?: string;
  overrideCarModelForCustomCar?: 0 | 1;
}

export interface EntryList {
  entries: EntryListEntry[];
  forceEntryList?: 0 | 1;
}

// bop.json
export interface BalanceOfPerformanceEntry {
  track: string;
  carModel: number;
  ballastKg?: number;
  restrictor?: number;
}

export interface BalanceOfPerformance {
  entries: BalanceOfPerformanceEntry[];
}

export type SingleFileConfig = {
  [key: string]: string | number;
} & (
  | ServerConfiguration
  | ServerSettings
  | EventConfiguration
  | EventRules
  | AssistRules
  | EntryList
  | BalanceOfPerformance
);

export interface ConfigField {
  key: string;
  label: string;
  inputType: "number" | "text" | "select";
  range: { min: number; max: number } | null;
  options: Array<{ value: string | number | boolean; label: string }> | null;
  description: string;
}
