"use client";
import { useEffect, useState } from "react";
import {
  Card,
  Button,
  Text,
  Badge,
  Stack,
  Container,
  Group,
  Flex,
} from "@mantine/core";
import { useInterval } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { useMobileDetection } from "@/hooks/useMobileDetection";
import classes from "@/notifications/notifications.module.css";

export function ServerStatus() {
  const [isRunning, setIsRunning] = useState<boolean | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const isMobile = useMobileDetection();

  // Updated checkStatus to return running state
  const checkStatus = async (): Promise<boolean> => {
    try {
      const response = await fetch("/api/status");
      const data = await response.json();
      setIsRunning(data.running);
      return data.running;
    } catch (error) {
      notifications.show({
        color: "red",
        title: "Server status error",
        message: (error as Error).message || "Failed to fetch server status",
      });
      return false;
    }
  };

  useEffect(() => {
    checkStatus();
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const interval = useInterval(() => checkStatus(), 3000, {
    autoInvoke: true,
  });

  const handleStart = async () => {
    setIsLoading(true);
    notifications.show({
      id: "server-start",
      color: "gray",
      title: "Starting server",
      message: "Please wait while the server is starting...",
      loading: true,
      autoClose: false,
      classNames: classes,
      position: isMobile ? "bottom-center" : "bottom-right",
    });
    try {
      await fetch("/api/start", { method: "POST" });
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const status = await checkStatus();
      if (status) {
        notifications.update({
          id: "server-start",
          color: "green",
          title: "Server started",
          message: "Server started successfully!",
          loading: false,
          autoClose: 2000,
          classNames: classes,
          position: isMobile ? "bottom-center" : "bottom-right",
        });
      } else {
        throw new Error("Server failed to start");
      }
    } catch (error) {
      notifications.update({
        id: "server-start",
        color: "red",
        title: "Error starting server",
        message: (error as Error).message,
        loading: false,
        autoClose: 2000,
        classNames: classes,
        position: isMobile ? "bottom-center" : "bottom-right",
      });
    }
    setIsLoading(false);
  };

  const handleStop = async () => {
    setIsLoading(true);
    try {
      notifications.show({
        id: "server-stop",
        color: "gray",
        title: "Stopping server",
        message: "Please wait while the server is stopping...",
        loading: true,
        autoClose: false,
        classNames: classes,
        position: isMobile ? "bottom-center" : "bottom-right",
      });
      await fetch("/api/stop", { method: "POST" });
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const status = await checkStatus();
      if (status) {
        throw new Error("Server failed to stop");
      }
      notifications.update({
        id: "server-stop",
        color: "green",
        title: "Server stopped",
        message: "Server stopped successfully!",
        loading: false,
        autoClose: 2000,
        classNames: classes,
        position: isMobile ? "bottom-center" : "bottom-right",
      });
    } catch (error) {
      notifications.update({
        id: "server-stop",
        color: "red",
        title: "Error stopping server",
        message: (error as Error).message,
        loading: false,
        autoClose: 2000,
        classNames: classes,
        position: isMobile ? "bottom-center" : "bottom-right",
      });
    }
    setIsLoading(false);
  };

  const handleRestart = async () => {
    setIsLoading(true);
    notifications.show({
      id: "server-restart",
      color: "gray",
      title: "Restarting server",
      message: "Please wait while the server is restarting...",
      loading: true,
      autoClose: false,
      classNames: classes,
      position: isMobile ? "bottom-center" : "bottom-right",
    });
    try {
      await fetch("/api/restart", { method: "POST" });
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const running = await checkStatus();
      if (running) {
        notifications.update({
          id: "server-restart",
          color: "green",
          title: "Server restarted",
          message: "Server restarted successfully!",
          loading: false,
          autoClose: 2000,
          classNames: classes,
          position: isMobile ? "bottom-center" : "bottom-right",
        });
      } else {
        throw new Error("Server failed to restart");
      }
    } catch (error) {
      notifications.update({
        id: "server-restart",
        color: "red",
        title: "Error restarting server",
        message: (error as Error).message,
        loading: false,
        autoClose: 2000,
        classNames: classes,
        position: isMobile ? "bottom-center" : "bottom-right",
      });
    }
    setIsLoading(false);
  };

  return (
    <Container size="sm">
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Stack gap="xl">
          <Flex align="center" justify="flex-start" gap={16}>
            <Text fw={500}>Server Status:</Text>
            {isRunning === undefined ? (
              <Badge color="gray">Retrieving status...</Badge>
            ) : (
              <Badge color={isRunning ? "green" : "red"}>
                {isRunning ? "Running" : "Stopped"}
              </Badge>
            )}
          </Flex>

          <div>
            <Group justify="flex-end">
              {!isRunning && (
                <Button
                  variant="filled"
                  color="green"
                  onClick={handleStart}
                  disabled={isRunning === undefined}
                  loading={isLoading}
                >
                  Start
                </Button>
              )}

              {isRunning && (
                <>
                  <Button
                    variant="filled"
                    color="red"
                    onClick={handleStop}
                    loading={isLoading}
                  >
                    Stop
                  </Button>
                  <Button
                    variant="light"
                    color="blue"
                    onClick={handleRestart}
                    loading={isLoading}
                  >
                    Restart
                  </Button>
                </>
              )}
            </Group>
          </div>
        </Stack>
      </Card>
    </Container>
  );
}
