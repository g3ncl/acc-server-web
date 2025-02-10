"use client";
import { AppShell, Flex, Text, UnstyledButton } from "@mantine/core";
import Link from "next/link";
import { usePathname } from "next/navigation";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Settings, Medal, ChevronsLeftRightEllipsis } from "lucide-react";
import styles from "./Layout.module.css";
import { useMobileDetection } from "@/hooks/useMobileDetection";

const version = process.env.version;

const navItems = [
  { icon: ChevronsLeftRightEllipsis, label: "Status", href: "/status" },
  { icon: Settings, label: "Configuration", href: "/configuration" },
  // { icon: Medal, label: "Results", href: "/results" },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isMobile = useMobileDetection();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 240,
        breakpoint: "sm",
      }}
      footer={{ height: 82, collapsed: !isMobile }}
      padding="md"
    >
      <AppShell.Header>
        <Flex gap="md" h={60} justify="start" ml="md" mr="md" align="center">
          <>
            <Text size="2rem" fw={500}>
              acc-server-web
            </Text>
            <Text size="2rem" c="dimmed">
              v{version || "0.0.0"}
            </Text>
          </>
        </Flex>
      </AppShell.Header>

      <AppShell.Navbar visibleFrom="sm" p="md">
        <nav className={styles.nav}>
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className={styles.link}>
              <UnstyledButton
                className={`${styles.navButton} ${
                  pathname === item.href ? styles.activeNavButton : ""
                }`}
              >
                <item.icon size={20} strokeWidth={2} />
                <Text fw={500} className={styles.linkText}>
                  {item.label}
                </Text>
              </UnstyledButton>
            </Link>
          ))}
        </nav>
      </AppShell.Navbar>
      <AppShell.Main>
        <div>{children}</div>
      </AppShell.Main>
      <AppShell.Footer hiddenFrom="sm">
        <div className={styles.mobileNav}>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`${styles.mobileLink}`}
            >
              <UnstyledButton
                className={`${styles.mobileNavButton} ${
                  pathname === item.href ? styles.activeNavButton : ""
                }`}
              >
                <item.icon size={24} strokeWidth={2} />
                <Text fw={500} className={styles.linkText}>
                  {item.label}
                </Text>
              </UnstyledButton>
            </Link>
          ))}
        </div>
      </AppShell.Footer>
    </AppShell>
  );
}
