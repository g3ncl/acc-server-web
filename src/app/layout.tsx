import type { Metadata } from "next";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import { Ubuntu } from "next/font/google";

import {
  ColorSchemeScript,
  MantineProvider,
  createTheme,
  mantineHtmlProps,
} from "@mantine/core";
import Layout from "@/components/Layout/Layout";
import { Notifications } from "@mantine/notifications";

const font = Ubuntu({ weight: ["400", "500", "700"], subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ACC Server Web",
  description: "Assetto Corsa Competizione server management web interface",
};

const theme = createTheme({
  fontFamily: "Ubuntu, sans-serif",
  primaryColor: "red",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" {...mantineHtmlProps} className={font.className}>
      <body>
        <ColorSchemeScript defaultColorScheme="auto" />
        <MantineProvider theme={theme} defaultColorScheme="auto">
          <Notifications position="bottom-right" zIndex={2} />
          <Layout>{children}</Layout>
        </MantineProvider>
      </body>
    </html>
  );
}
