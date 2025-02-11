import { useMobileDetection } from "@/hooks/useMobileDetection";
import { Button, Flex } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { Download, Upload } from "lucide-react";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import classes from "@/notifications/notifications.module.css";

interface ImportExportBarProps {
  setRefreshConfigs: Dispatch<SetStateAction<number>>;
}

const ImportExportBar: React.FC<ImportExportBarProps> = ({
  setRefreshConfigs,
}) => {
  const [exportLoading, setExportLoading] = useState<boolean>(false);
  const [importLoading, setImportLoading] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const isMobile = useMobileDetection();

  const handleExport = async () => {
    try {
      setExportLoading(true);
      notifications.show({
        id: "config-export",
        color: "gray",
        title: "Exporting Configurations",
        message: "Please wait while configurations are being exported...",
        loading: true,
        autoClose: false,
        classNames: classes,
        position: isMobile ? "bottom-center" : "bottom-right",
      });

      const response = await fetch("/api/config/export", {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "configs.zip";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      notifications.update({
        id: "config-export",
        color: "green",
        title: "Configurations Exported",
        message: "Configurations exported successfully!",
        loading: false,
        autoClose: 2000,
        classNames: classes,
        position: isMobile ? "bottom-center" : "bottom-right",
      });
      setExportLoading(false);
    } catch (error) {
      console.error("Failed to export configs:", error);
      notifications.update({
        id: "config-export",
        color: "red",
        title: "Error exporting configurations",
        message: (error as Error).message,
        loading: false,
        autoClose: 2000,
        classNames: classes,
        position: isMobile ? "bottom-center" : "bottom-right",
      });
      setExportLoading(false);
    }
  };

  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setImportLoading(true);
    try {
      notifications.show({
        id: "config-import",
        color: "gray",
        title: "Importing Configurations",
        message: "Please wait while configurations are being imported...",
        loading: true,
        autoClose: false,
        classNames: classes,
        position: isMobile ? "bottom-center" : "bottom-right",
      });

      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/config/import", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      notifications.update({
        id: "config-import",
        color: "green",
        title: "Configurations Imported",
        message: "Configurations imported successfully!",
        loading: false,
        autoClose: 2000,
        classNames: classes,
        position: isMobile ? "bottom-center" : "bottom-right",
      });
      setImportLoading(false);
      setRefreshConfigs((prev) => prev + 1);
    } catch (error) {
      console.error("Failed to import configs:", error);
      notifications.update({
        id: "config-import",
        color: "red",
        title: "Error importing configurations",
        message: (error as Error).message,
        loading: false,
        autoClose: 2000,
        classNames: classes,
        position: isMobile ? "bottom-center" : "bottom-right",
      });
      setImportLoading(false);
    } finally {
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <Flex justify="flex-end" gap="sm">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImport}
        accept=".zip"
        style={{ display: "none" }}
      />
      <Button
        variant="light"
        leftSection={<Upload size={16} />}
        onClick={() => fileInputRef.current?.click()}
        loading={importLoading}
        disabled={exportLoading || importLoading}
      >
        Import
      </Button>
      <Button
        variant="light"
        leftSection={<Download size={16} />}
        onClick={handleExport}
        loading={exportLoading}
        disabled={exportLoading || importLoading}
      >
        Export
      </Button>
    </Flex>
  );
};
export default ImportExportBar;
