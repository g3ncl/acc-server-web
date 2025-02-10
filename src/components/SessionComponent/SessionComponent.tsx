import React from "react";
import { Box, Group, Stack, Title, ActionIcon } from "@mantine/core";
import { Trash } from "lucide-react";
import { Session } from "@/types/configTypes";
import { sessionSchema } from "@/const/predefinedValues";
import ConfigFieldInput from "../ConfigFieldInput/ConfigFieldInput";

interface SessionComponentProps {
  session: Session;
  index: number;
  onChange: (
    index: number,
    field: keyof Session,
    value: number | string | boolean
  ) => void;
  onRemove: (index: number) => void;
}

const SessionComponent: React.FC<SessionComponentProps> = ({
  session,
  index,
  onChange,
  onRemove,
}) => {
  return (
    <Box
      key={index}
      p="md"
      style={{
        border: "1px solid #eee",
        borderRadius: "8px",
      }}
    >
      <Group justify="space-between" mb="md">
        <Title order={5}>Session {index + 1}</Title>
        <ActionIcon color="red" onClick={() => onRemove(index)}>
          <Trash size={16} />
        </ActionIcon>
      </Group>
      <Stack>
        {sessionSchema.map((field) => (
          <ConfigFieldInput
            key={field.key}
            field={field}
            value={session[field.key as keyof Session]}
            onChange={(value) =>
              onChange(index, field.key as keyof Session, value)
            }
          />
        ))}
      </Stack>
    </Box>
  );
};

export default SessionComponent;
