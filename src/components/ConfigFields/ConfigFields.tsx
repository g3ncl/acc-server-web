import {
  SingleFileConfig,
  EventConfiguration,
  Session,
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

interface ConfigFieldsProps {
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
  fileConfig,
  onConfigChange,
  onSessionChange,
  onAddSession,
  onRemoveSession,
}: ConfigFieldsProps) {
  const allSchemas = [
    ...serverSchema,
    ...settingsSchema,
    ...eventSchema,
    ...eventRulesSchema,
    ...assistRulesSchema,
  ];

  return (
    <Stack>
      {Object.entries(fileConfig).map(([key, value]) => {
        const field = allSchemas.find((f) => f.key === key);

        if (field) {
          return (
            <ConfigFieldInput
              key={field.key}
              field={field}
              value={value}
              onChange={(val) => onConfigChange(key, val)}
            />
          );
        }

        if (key === "sessions") {
          return (
            <Stack key={key} gap="md">
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
        }

        return null;
      })}
    </Stack>
  );
}
