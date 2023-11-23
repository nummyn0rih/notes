import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { theme } from "./theme";
import { Router } from "./Router";
import { AuthProvider } from "./context/AuthProvider";

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <AuthProvider>
        <Router/>
      </AuthProvider>
    </MantineProvider>);
}
