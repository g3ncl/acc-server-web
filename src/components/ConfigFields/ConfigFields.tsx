import {
  SingleFileConfig,
  EventConfiguration,
  Session,
  Configs,
} from "@/types/configTypes";
import { Stack, Group, Title, Button } from "@mantine/core";
import { Plus } from "lucide-react";
import ConfigFieldInput from "../ConfigFieldInput/ConfigFieldInput";
import SessionComponent from "../SessionComponent/SessionComponent";
import {
  serverSchema,
  settingsSchema,
  eventSchema,
  eventRulesSchema,
  assistRulesSchema,
} from "@/const/predefinedValues";

const getSchemaForFile = (fileName: keyof Configs) => {
  switch (fileName) {
    case "configuration":
      return serverSchema;
    case "settings":
      return settingsSchema;
    case "event":
      return eventSchema;
    case "eventRules":
      return eventRulesSchema;
    case "assistRules":
      return assistRulesSchema;
    default:
      return [];
  }
};

interface ConfigFieldsProps {
  fileName: keyof Configs;
  fileConfig: SingleFileConfig;
  onConfigChange: (key: string, value: unknown) => void;
  onSessionChange: (
    index: number,
    field: keyof Session,
    value: number | string | boolean
  ) => void;
  onAddSession: () => void;
  onRemoveSession: (index: number) => void;
}

export default function ConfigFields({
  fileName,
  fileConfig,
  onConfigChange,
  onSessionChange,
  onAddSession,
  onRemoveSession,
}: ConfigFieldsProps) {
  const currentSchema = getSchemaForFile(fileName);

  return (
    <Stack>
      {currentSchema.map((field) => {
        if (field.key === "session") {
          return (
            <Stack gap="md" key={"session-stack"}>
              <Group justify="space-between" align="center">
                <Title order={4}>Sessions</Title>
                <Button
                  onClick={onAddSession}
                  disabled={
                    (fileConfig as EventConfiguration).sessions?.length >= 3
                  }
                  leftSection={<Plus size={16} />}
                >
                  Add Session
                </Button>
              </Group>
              {(fileConfig as EventConfiguration).sessions?.map(
                (session, index) => (
                  <SessionComponent
                    key={index}
                    session={session}
                    index={index}
                    onChange={onSessionChange}
                    onRemove={onRemoveSession}
                  />
                )
              )}
            </Stack>
          );
        } else {
          return (
            <ConfigFieldInput
              key={field.key}
              field={field}
              value={fileConfig[field.key] ?? ""}
              onChange={(val) => onConfigChange(field.key, val)}
            />
          );
        }
      })}
    </Stack>
  );
}
