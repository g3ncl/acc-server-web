import { ConfigField } from "@/types/configTypes";

export const serverSchema: ConfigField[] = [
  {
    key: "udpPort",
    label: "UDP Port",
    inputType: "number",
    range: { min: 1, max: 65535 },
    options: null,
    description:
      "Connected clients will use this Port to stream the car positions and is used for the ping test",
  },
  {
    key: "tcpPort",
    label: "TCP Port",
    inputType: "number",
    range: { min: 1, max: 65535 },
    options: null,
    description:
      "ACC clients will use this port to establish a connection to the server",
  },
  {
    key: "maxConnections",
    label: "Maximum Connections",
    inputType: "number",
    range: { min: 1, max: 85 },
    options: null,
    description:
      "The maximum amount of connections a server will accept at a time",
  },
  {
    key: "lanDiscovery",
    label: "LAN Discovery",
    inputType: "select",
    range: null,
    options: [
      { value: 0, label: "Disabled" },
      { value: 1, label: "Enabled" },
    ],
    description: "Defines if the server will listen to LAN discovery requests",
  },
  {
    key: "registerToLobby",
    label: "Register to Lobby",
    inputType: "select",
    range: null,
    options: [
      { value: 0, label: "Disabled (Private Server)" },
      { value: 1, label: "Enabled (Public Server)" },
    ],
    description:
      "When 0, this server won't register to the backend. Is useful for LAN sessions",
  },
  {
    key: "configVersion",
    label: "Configuration Version",
    inputType: "number",
    range: { min: 1, max: 999 },
    options: null,
    description: "Version of the configuration format",
  },
  {
    key: "publicIP",
    label: "Public IP Address",
    inputType: "text",
    range: null,
    options: null,
    description:
      "Explicitly defines the public IP address this server is listening to",
  },
];

export const settingsSchema: ConfigField[] = [
  {
    key: "serverName",
    label: "Server Name",
    inputType: "text",
    range: null,
    options: null,
    description: "The name of the server displayed in the ACC UI pages.",
  },
  {
    key: "adminPassword",
    label: "Admin Password",
    inputType: "text",
    range: null,
    options: null,
    description: "Password required to elevate a user to server admin.",
  },
  {
    key: "carGroup",
    label: "Car Group",
    inputType: "select",
    range: null,
    options: [
      { value: "FreeForAll", label: "Free For All" },
      { value: "GT3", label: "GT3" },
      { value: "GT4", label: "GT4" },
      { value: "GT2", label: "GT2" },
      { value: "GTC", label: "GTC" },
      { value: "TCX", label: "TCX" },
    ],
    description: "Defines the allowed car group for the server.",
  },
  {
    key: "trackMedalsRequirement",
    label: "Track Medals Requirement",
    inputType: "number",
    range: { min: 0, max: 3 },
    options: null,
    description: "Defines the number of track medals a user must have to join.",
  },
  {
    key: "safetyRatingRequirement",
    label: "Safety Rating Requirement",
    inputType: "number",
    range: { min: -1, max: 99 },
    options: null,
    description:
      "Defines the minimum Safety Rating (SA) required to join the server.",
  },
  {
    key: "racecraftRatingRequirement",
    label: "Racecraft Rating Requirement",
    inputType: "number",
    range: { min: -1, max: 99 },
    options: null,
    description:
      "Defines the minimum Racecraft Rating (RC) required to join the server.",
  },
  {
    key: "password",
    label: "Server Password",
    inputType: "text",
    range: null,
    options: null,
    description:
      "Password required to enter this server. If set, the server is private.",
  },
  {
    key: "spectatorPassword",
    label: "Spectator Password",
    inputType: "text",
    range: null,
    options: null,
    description: "Password required to enter the server as a spectator.",
  },
  {
    key: "maxCarSlots",
    label: "Max Car Slots",
    inputType: "number",
    range: { min: 1, max: 100 },
    options: null,
    description: "Defines the number of car slots available on the server.",
  },
  {
    key: "dumpLeaderboards",
    label: "Dump Leaderboards",
    inputType: "select",
    range: null,
    options: [
      { value: 0, label: "Disabled" },
      { value: 1, label: "Enabled" },
    ],
    description: "Enables or disables saving session leaderboards.",
  },
  {
    key: "isRaceLocked",
    label: "Race Locked",
    inputType: "select",
    range: null,
    options: [
      { value: 0, label: "Allow Join During Race" },
      { value: 1, label: "Lock Race Session" },
    ],
    description: "Defines whether joining during a race session is allowed.",
  },
  {
    key: "randomizeTrackWhenEmpty",
    label: "Randomize Track When Empty",
    inputType: "select",
    range: null,
    options: [
      { value: 0, label: "Disabled" },
      { value: 1, label: "Enabled" },
    ],
    description:
      "When enabled, the server will select a random track when empty.",
  },
  {
    key: "allowAutoDQ",
    label: "Allow Auto Disqualification",
    inputType: "select",
    range: null,
    options: [
      { value: 0, label: "Disabled" },
      { value: 1, label: "Enabled" },
    ],
    description: "If disabled, penalties are handed out instead of auto-DQ.",
  },
  {
    key: "formationLapType",
    label: "Formation Lap Type",
    inputType: "select",
    range: null,
    options: [
      { value: 3, label: "Default with Position Control" },
      { value: 0, label: "Old Limiter Lap" },
      { value: 1, label: "Free (Manual Start)" },
    ],
    description: "Defines the type of formation lap used on the server.",
  },
];

export const eventSchema: ConfigField[] = [
  {
    key: "track",
    label: "Track",
    inputType: "select",
    range: null,
    options: [
      { value: "monza", label: "Monza" },
      { value: "zolder", label: "Zolder" },
      { value: "brands_hatch", label: "Brands Hatch" },
      { value: "silverstone", label: "Silverstone" },
      { value: "paul_ricard", label: "Paul Ricard" },
      { value: "misano", label: "Misano" },
      { value: "spa", label: "Spa" },
      { value: "nurburgring", label: "Nurburgring" },
      { value: "barcelona", label: "Barcelona" },
      { value: "hungaroring", label: "Hungaroring" },
      { value: "zandvoort", label: "Zandvoort" },
      { value: "kyalami", label: "Kyalami" },
      { value: "mount_panorama", label: "Mount Panorama" },
      { value: "suzuka", label: "Suzuka" },
      { value: "laguna_seca", label: "Laguna Seca" },
      { value: "imola", label: "Imola" },
      { value: "oulton_park", label: "Oulton Park" },
      { value: "donington", label: "Donington" },
      { value: "snetterton", label: "Snetterton" },
      { value: "cota", label: "COTA" },
      { value: "indianapolis", label: "Indianapolis" },
      { value: "watkins_glen", label: "Watkins Glen" },
      { value: "valencia", label: "Valencia" },
      { value: "nurburgring_24h", label: "Nurburgring 24H" },
    ],
    description: "The track where the event will be held.",
  },
  {
    key: "preRaceWaitingTimeSeconds",
    label: "Pre-Race Waiting Time (s)",
    inputType: "number",
    range: { min: 30, max: 300 },
    options: null,
    description: "Time (in seconds) before the race starts.",
  },
  {
    key: "sessionOverTimeSeconds",
    label: "Session Overtime (s)",
    inputType: "number",
    range: { min: 60, max: 300 },
    options: null,
    description:
      "Time (in seconds) after the session end before it is forcibly closed.",
  },
  {
    key: "ambientTemp",
    label: "Ambient Temperature (°C)",
    inputType: "number",
    range: { min: 15, max: 40 },
    options: null,
    description: "Sets the baseline ambient temperature in °C.",
  },
  {
    key: "cloudLevel",
    label: "Cloud Level",
    inputType: "number",
    range: { min: 0, max: 1 },
    options: null,
    description:
      "Defines the cloud cover level from 0 (clear) to 1 (overcast).",
  },
  {
    key: "rain",
    label: "Rain Level",
    inputType: "number",
    range: { min: 0, max: 1 },
    options: null,
    description:
      "Defines the expected rain intensity from 0 (dry) to 1 (heavy rain).",
  },
  {
    key: "weatherRandomness",
    label: "Weather Randomness",
    inputType: "number",
    range: { min: 0, max: 7 },
    options: null,
    description:
      "Defines how dynamic the weather changes will be. 0 is static, 7 is highly dynamic.",
  },
];

export const eventRulesSchema: ConfigField[] = [
  {
    key: "qualifyStandingType",
    label: "Qualifying Standing Type",
    inputType: "select",
    range: null,
    options: [
      { value: 1, label: "Fastest Lap" },
      { value: 2, label: "Average Lap" },
    ],
    description:
      "Defines how the qualifying standings are determined. Use 1, averaging Qualy is not yet officially supported.",
  },
  {
    key: "pitWindowLengthSec",
    label: "Pit Window Length (s)",
    inputType: "number",
    range: { min: -1, max: 3600 },
    options: null,
    description:
      "Defines the duration of the pit window in seconds. -1 disables the pit window.",
  },
  {
    key: "driverStintTimeSec",
    label: "Driver Stint Time (s)",
    inputType: "number",
    range: { min: -1, max: 10800 },
    options: null,
    description:
      "Defines the maximum time a driver can stay in the car before a penalty. -1 disables the stint limit.",
  },
  {
    key: "mandatoryPitstopCount",
    label: "Mandatory Pitstop Count",
    inputType: "number",
    range: { min: 0, max: 10 },
    options: null,
    description: "Defines the number of mandatory pitstops required.",
  },
  {
    key: "isRefuellingAllowedInRace",
    label: "Allow Refueling in Race",
    inputType: "select",
    range: null,
    options: [
      { value: true, label: "Yes" },
      { value: false, label: "No" },
    ],
    description: "Defines whether refueling is allowed during race pitstops.",
  },
  {
    key: "tyreSetCount",
    label: "Tyre Set Count",
    inputType: "number",
    range: { min: 1, max: 50 },
    options: null,
    description: "Defines the number of tyre sets available for the event.",
  },
];
export const sessionSchema: ConfigField[] = [
  {
    key: "hourOfDay",
    label: "Session Start Hour",
    inputType: "number",
    range: { min: 0, max: 23 },
    options: null,
    description: "Defines the hour of the day when the session starts (0-23).",
  },
  {
    key: "dayOfWeekend",
    label: "Day of Weekend",
    inputType: "select",
    range: null,
    options: [
      { value: 1, label: "Friday" },
      { value: 2, label: "Saturday" },
      { value: 3, label: "Sunday" },
    ],
    description: "Defines the day of the weekend for the session.",
  },
  {
    key: "timeMultiplier",
    label: "Time Multiplier",
    inputType: "number",
    range: { min: 0, max: 24 },
    options: null,
    description: "Defines how fast time progresses during the session (0-24).",
  },
  {
    key: "sessionType",
    label: "Session Type",
    inputType: "select",
    range: null,
    options: [
      { value: "P", label: "Practice" },
      { value: "Q", label: "Qualifying" },
      { value: "R", label: "Race" },
    ],
    description: "Defines the type of session (Practice, Qualifying, Race).",
  },
  {
    key: "sessionDurationMinutes",
    label: "Session Duration (Minutes)",
    inputType: "number",
    range: { min: 5, max: 1440 },
    options: null,
    description: "Defines the duration of the session in minutes.",
  },
];
export const assistRulesSchema: ConfigField[] = [
  {
    key: "stabilityControlLevelMax",
    label: "Max Stability Control Level",
    inputType: "number",
    range: { min: 0, max: 100 },
    options: null,
    description: "Sets the maximum percentage of Stability Control allowed.",
  },
  {
    key: "disableAutosteer",
    label: "Disable Autosteer",
    inputType: "select",
    range: null,
    options: [
      { value: 0, label: "False" },
      { value: 1, label: "True" },
    ],
    description:
      "Disables the autosteer assist, which is only available for gamepad users.",
  },
  {
    key: "disableAutoLights",
    label: "Disable Auto Lights",
    inputType: "select",
    range: null,
    options: [
      { value: 0, label: "False" },
      { value: 1, label: "True" },
    ],
    description: "Disables automatic headlights.",
  },
  {
    key: "disableAutoWiper",
    label: "Disable Auto Wiper",
    inputType: "select",
    range: null,
    options: [
      { value: 0, label: "False" },
      { value: 1, label: "True" },
    ],
    description: "Disables automatic windshield wipers.",
  },
  {
    key: "disableAutoEngineStart",
    label: "Disable Auto Engine Start",
    inputType: "select",
    range: null,
    options: [
      { value: 0, label: "False" },
      { value: 1, label: "True" },
    ],
    description: "Disables automatic engine start when entering the car.",
  },
  {
    key: "disableAutoPitLimiter",
    label: "Disable Auto Pit Limiter",
    inputType: "select",
    range: null,
    options: [
      { value: 0, label: "False" },
      { value: 1, label: "True" },
    ],
    description: "Disables automatic pit speed limiter.",
  },
  {
    key: "disableAutoGear",
    label: "Disable Auto Gear",
    inputType: "select",
    range: null,
    options: [
      { value: 0, label: "False" },
      { value: 1, label: "True" },
    ],
    description: "Disables automatic gear shifting.",
  },
  {
    key: "disableAutoClutch",
    label: "Disable Auto Clutch",
    inputType: "select",
    range: null,
    options: [
      { value: 0, label: "False" },
      { value: 1, label: "True" },
    ],
    description: "Disables automatic clutch assistance.",
  },
  {
    key: "disableIdealLine",
    label: "Disable Ideal Line",
    inputType: "select",
    range: null,
    options: [
      { value: 0, label: "False" },
      { value: 1, label: "True" },
    ],
    description: "Disables the ideal racing line assist.",
  },
];
