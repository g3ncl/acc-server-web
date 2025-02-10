"use client";

import { useState, useEffect } from "react";
import { Configs, SingleFileConfig } from "@/types/configTypes";
import {
  Accordion,
  Box,
  Button,
  Container,
  Skeleton,
  Stack,
  Tabs,
} from "@mantine/core";
import { useMobileDetection } from "@/hooks/useMobileDetection";
import { Session } from "@/types/configTypes";

import ConfigFields from "../ConfigFields/ConfigFields";
import { notifications } from "@mantine/notifications";
import classes from "@/notifications/notifications.module.css";

export default function ConfigurationEditor() {
  const [configs, setConfigs] = useState<Configs>({});
  const [loading, setLoading] = useState(true);
  const [activeKey, setActiveKey] = useState<string | null>(null);

  const isMobile = useMobileDetection();

  useEffect(() => {
    const fetchConfigs = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/config");
        if (!res.ok) {
          throw new Error(`Error ${res.status}: ${res.statusText}`);
        }
        const data: Configs = await res.json();
        setConfigs(data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to load configs:", err);
        notifications.show({
          color: "red",
          title: "Failed to load configurations",
          message: (err as Error).message.toString(),
          classNames: classes,
        });
        setLoading(false);
      }
    };
    fetchConfigs();
  }, []);

  const handleChange = (file: keyof Configs, key: string, value: unknown) => {
    setConfigs((prev: Configs) => ({
      ...prev,
      [file]: { ...prev[file], [key]: value },
    }));
  };

  const handleSave = async () => {
    try {
      const res = await fetch("/api/config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(configs),
      });
      if (!res.ok) {
        throw new Error(`Error: ${res.status} ${res.statusText}`);
      } else {
        notifications.show({
          color: "green",
          title: "Configurations Saved",
          message: "Configurations saved successfully!",
          classNames: classes,
        });
      }
    } catch (error) {
      console.error("Failed to save configs:", error);
      notifications.show({
        color: "red",
        title: "Error saving configurations",
        message: (error as Error).message.toString(),
        classNames: classes,
      });
    }
  };

  const handleSessionChange = (
    sessionIndex: number,
    field: keyof Session,
    value: number | string | boolean
  ) => {
    setConfigs((prev) => {
      const eventConfig = prev.event;
      if (!eventConfig?.sessions) return prev;

      const newSessions = [...eventConfig.sessions];
      newSessions[sessionIndex] = {
        ...newSessions[sessionIndex],
        [field]: value,
      };

      return {
        ...prev,
        event: {
          ...eventConfig,
          sessions: newSessions,
        },
      };
    });
  };

  const addSession = () => {
    setConfigs((prev) => {
      const eventConfig = prev.event;
      if (!eventConfig) return prev;

      const newSession: Session = {
        hourOfDay: 14,
        dayOfWeekend: 1,
        timeMultiplier: 1,
        sessionType: "P",
        sessionDurationMinutes: 20,
      };

      return {
        ...prev,
        event: {
          ...eventConfig,
          sessions: [...(eventConfig.sessions || []), newSession],
        },
      };
    });
  };

  const removeSession = (index: number) => {
    setConfigs((prev) => {
      const eventConfig = prev.event;
      if (!eventConfig?.sessions) return prev;

      const newSessions = eventConfig.sessions.filter((_, i) => i !== index);
      return {
        ...prev,
        event: {
          ...eventConfig,
          sessions: newSessions,
        },
      };
    });
  };

  const renderConfigContent = (
    fileName: keyof Configs,
    fileConfig: SingleFileConfig
  ) => (
    <ConfigFields
      fileConfig={fileConfig}
      onConfigChange={(key, value) => handleChange(fileName, key, value)}
      onSessionChange={handleSessionChange}
      onAddSession={addSession}
      onRemoveSession={removeSession}
    />
  );

  if (loading || !configs.configuration) {
    return (
      <Container size="sm">
        <Stack gap="md">
          <Skeleton height={40} radius="md" />
          <Skeleton height={200} radius="md" />
          <Skeleton height={40} radius="md" />
        </Stack>
      </Container>
    );
  }
  return (
    <Container size="sm">
      <Stack gap={32}>
        {isMobile ? (
          <Accordion value={activeKey} onChange={setActiveKey}>
            {Object.entries(configs).map(([fileName, fileConfig]) => (
              <Accordion.Item key={fileName} value={fileName}>
                <Accordion.Control>{fileName}</Accordion.Control>
                <Accordion.Panel>
                  {renderConfigContent(
                    fileName as keyof Configs,
                    fileConfig as SingleFileConfig
                  )}
                </Accordion.Panel>
              </Accordion.Item>
            ))}
          </Accordion>
        ) : (
          <Tabs
            variant="default"
            value={activeKey || Object.keys(configs)[0]}
            onChange={setActiveKey}
          >
            <Tabs.List grow justify="center">
              {Object.keys(configs).map((configName) => (
                <Tabs.Tab fw="500" key={configName} value={configName}>
                  {configName}
                </Tabs.Tab>
              ))}
            </Tabs.List>

            {Object.entries(configs).map(([fileName, fileConfig]) => (
              <Tabs.Panel key={fileName} value={fileName}>
                <Box p="md">
                  {renderConfigContent(
                    fileName as keyof Configs,
                    fileConfig as SingleFileConfig
                  )}
                </Box>
              </Tabs.Panel>
            ))}
          </Tabs>
        )}
        <Button fullWidth onClick={handleSave} style={{ bottom: 16 }}>
          Save Configuration
        </Button>
      </Stack>
    </Container>
  );
}
