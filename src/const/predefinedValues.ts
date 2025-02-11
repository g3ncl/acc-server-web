import { ConfigField } from "@/types/configTypes";

export const serverSchema: ConfigField[] = [
  {
    key: "tcpPort",
    label: "TCP Port",
    inputType: "number",
    range: { min: 1, max: 65535 },
    options: null,
    description:
      "Port used by ACC clients to establish a connection to the server.",
  },
  {
    key: "udpPort",
    label: "UDP Port",
    inputType: "number",
    range: { min: 1, max: 65535 },
    options: null,
    description:
      "Port used by connected clients to stream car positions and for the ping test.",
  },
  {
    key: "registerToLobby",
    label: "Register to Lobby",
    inputType: "select",
    range: null,
    options: [
      { value: 0, label: "Private Multiplayer (Not registered in backend)" },
      { value: 1, label: "Public Multiplayer (Registered in backend)" },
    ],
    description:
      "Determines if the server is registered in the backend: 0 for private, 1 for public.",
  },
  {
    key: "maxConnections",
    label: "Maximum Connections",
    inputType: "number",
    range: { min: 1, max: 85 },
    options: null,
    description:
      "The maximum number of connections the server will accept at a time.",
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
    description: "Defines if the server will listen to LAN discovery requests.",
  },
  {
    key: "configVersion",
    label: "Config Version",
    inputType: "number",
    range: null,
    options: null,
    description: "Version of the configuration file.",
  },
  {
    key: "publicIP",
    label: "Public IP",
    inputType: "text",
    range: null,
    options: null,
    description:
      "Explicitly defines the public IP address. Useful if the backend is connected via a load balancer or reverse proxy.",
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
    key: "dumpEntryList",
    label: "Dump Entry List",
    inputType: "select",
    range: null,
    options: [
      { value: 0, label: "Disabled" },
      { value: 1, label: "Enabled" },
    ],
    description:
      "Enables or disables saving an entry list at the end of any Qualifying session.",
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
    key: "shortFormationLap",
    label: "Short Formation Lap",
    inputType: "select",
    range: null,
    options: [
      { value: 0, label: "Entire formation lap" },
      { value: 1, label: "Short formation lap" },
    ],
    description: "If disabled, penalties are handed out instead of auto-DQ.",
  },
  {
    key: "formationLapType",
    label: "Formation Lap Type",
    inputType: "select",
    range: null,
    options: [
      {
        value: 5,
        label:
          "One short formation lap with position control and UI + 1 ghosted cars lap",
      },
      { value: 4, label: "One free formation lap + 1 ghosted cars lap" },

      { value: 3, label: "Default with Position Control and UI" },
      { value: 1, label: "Old Limiter Lap" },
      { value: 0, label: "Free (Manual Start)" },
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
    label: "Pre-Race Waiting Time",
    inputType: "number",
    range: { min: 30, max: 300 },
    options: null,
    description: "Time (in seconds) before the race starts.",
  },
  {
    key: "sessionOverTimeSeconds",
    label: "Session Overtime",
    inputType: "number",
    range: { min: 60, max: 300 },
    options: null,
    description:
      "Time (s) after the session end before it is forcibly closed. Something like 107% of the expected laptime is recommended. ",
  },
  {
    key: "ambientTemp",
    label: "Ambient Temperature",
    inputType: "number",
    range: { min: 15, max: 40 },
    options: null,
    description: "Sets the baseline ambient temperature in °C.",
    //TODO: check limits
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
      "Defines how qualifying standings are determined. Use 1, averaging Qualy is not yet officially supported.",
  },
  {
    key: "pitWindowLengthSec",
    label: "Pit Window Length (s)",
    inputType: "number",
    range: { min: -1, max: 3600 },
    options: null,
    description:
      "Defines the duration of the pit window in seconds. -1 disables the pit window. Only use with mandatoryPitstopCount with a value of 1 or higher.",
  },
  {
    key: "driverStintTimeSec",
    label: "Driver Stint Time (s)",
    inputType: "number",
    range: { min: -1, max: 10800 },
    options: null,
    description:
      "Defines the maximum time a driver can stay in the car before a penalty. -1 disables the stint limit. Can be used to balance fuel efficient cars in endurance races.",
  },
  {
    key: "mandatoryPitstopCount",
    label: "Mandatory Pitstop Count",
    inputType: "number",
    range: { min: 0, max: 10 },
    options: null,
    description:
      "Defines the number of mandatory pitstops required. Value of 0 disables mandatory pitstops.",
  },
  {
    key: "maxTotalDrivingTime",
    label: "Max Total Driving Time (s)",
    inputType: "number",
    range: { min: -1, max: 86400 },
    options: null,
    description:
      "Maximum driving time for a single driver. Used for driver swap situations to enforce minimum driving time for each driver. -1 disables the feature.",
  },
  {
    key: "maxDriversCount",
    label: "Max Drivers Count",
    inputType: "number",
    range: { min: 1, max: 10 },
    options: null,
    description:
      "Maximum number of drivers per car for driver swap situations. maxTotalDrivingTime will be scaled based on team size.",
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
    key: "isRefuellingTimeFixed",
    label: "Refueling Time Fixed",
    inputType: "select",
    range: null,
    options: [
      { value: true, label: "Yes" },
      { value: false, label: "No" },
    ],
    description:
      "If true, refuelling takes 25 seconds. If false, refuelling time is proportional to fuel amount. Used to balance fuel efficient cars.",
  },
  {
    key: "isMandatoryPitstopRefuellingRequired",
    label: "Mandatory Pitstop Refueling",
    inputType: "select",
    range: null,
    options: [
      { value: true, label: "Yes" },
      { value: false, label: "No" },
    ],
    description:
      "If true, mandatory pitstops must include refueling of at least 1 liter.",
  },
  {
    key: "isMandatoryPitstopTyreChangeRequired",
    label: "Mandatory Pitstop Tyre Change",
    inputType: "select",
    range: null,
    options: [
      { value: true, label: "Yes" },
      { value: false, label: "No" },
    ],
    description: "If true, mandatory pitstops must include a tyre change.",
  },
  {
    key: "isMandatoryPitstopSwapDriverRequired",
    label: "Mandatory Pitstop Driver Swap",
    inputType: "select",
    range: null,
    options: [
      { value: true, label: "Yes" },
      { value: false, label: "No" },
    ],
    description:
      "If true, mandatory pitstops must include a driver swap. Only applies to cars in driver swap situations.",
  },
  {
    key: "tyreSetCount",
    label: "Tyre Set Count",
    inputType: "number",
    range: { min: 1, max: 50 },
    options: null,
    description:
      "Defines the number of tyre sets available for the event.Not currently listed or described in the Kunos Server Admin manual",
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
