import Layout from "./components/Layout.jsx";
import MainDashboard from "./components/MainDashboard.jsx";
import { HistoryProvider } from "@/context/HistoryContext.jsx";
import { PreferencesProvider } from "@/context/PreferencesContext.jsx";
import { ThemeProvider } from "@/components/hooks/useTheme";

export default function App() {
  return (
    <ThemeProvider>
      <PreferencesProvider>
        <HistoryProvider>
          <Layout>
            <MainDashboard />
          </Layout>
        </HistoryProvider>
      </PreferencesProvider>
    </ThemeProvider>
  );
}
