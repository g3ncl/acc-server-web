"use client";
import { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Group,
  Stack,
  Text,
  Textarea,
  Title,
} from "@mantine/core";
import { api, download } from "@/components/api";
export default function EntryListPage() {
  const [text, setText] = useState('{"entries":[],"forceEntryList":0}');
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    api("entry-list")
      .then((data) => {
        setText(JSON.stringify(data, null, 2));
        setLoaded(true);
      })
      .catch((e) => setError(e.message));
  }, []);
  async function save() {
    setBusy(true);
    setError("");
    setMessage("");
    try {
      const value = JSON.parse(text);
      await api("entry-list", value);
      setMessage("Entry list saved. Restart the server to apply it.");
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <Stack className="page">
      <Title>Entry list</Title>
      <Text c="dimmed">
        Edit ACC drivers, race numbers and per-car settings as JSON. Set entries
        to an empty array and forceEntryList to 0 to allow an open grid. Restart
        ACC after saving.
      </Text>
      {error && <Alert color="red">{error}</Alert>}
      {message && <Alert color="green">{message}</Alert>}
      <Textarea
        label="ACC entry-list JSON"
        className="json"
        autosize
        minRows={18}
        maxRows={30}
        value={text}
        onChange={(e) => setText(e.currentTarget.value)}
        disabled={!loaded}
      />
      <Group>
        <Button variant="default" component="label" disabled={!loaded}>
          Import
          <input
            className="sr-only"
            type="file"
            accept=".json,application/json"
            onChange={async (event) => {
              const file = event.currentTarget.files?.[0];
              event.currentTarget.value = "";
              if (!file) return;
              try {
                if (file.size > 1024 * 1024)
                  throw new Error("Entry list exceeds 1 MiB.");
                const bytes = new Uint8Array(await file.arrayBuffer());
                const encoding =
                  (bytes[0] === 255 && bytes[1] === 254) ||
                  bytes.subarray(0, 100).includes(0)
                    ? "utf-16le"
                    : "utf-8";
                setText(
                  JSON.stringify(
                    JSON.parse(new TextDecoder(encoding).decode(bytes)),
                    null,
                    2,
                  ),
                );
                setMessage("");
                setError("");
              } catch (error) {
                setError((error as Error).message);
              }
            }}
          />
        </Button>
        <Button loading={busy} disabled={!loaded} onClick={() => void save()}>
          Save entry list
        </Button>
        <Button
          variant="default"
          disabled={!loaded}
          onClick={() => {
            try {
              download("entry-list.json", JSON.parse(text));
            } catch (e) {
              setError((e as Error).message);
            }
          }}
        >
          Export
        </Button>
      </Group>
    </Stack>
  );
}
