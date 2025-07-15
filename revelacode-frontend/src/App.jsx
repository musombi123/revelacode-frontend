import Layout from "./components/Layout.jsx";
import MainDashboard from "./components/MainDashboard.jsx";
import { HistoryProvider } from "@/context/HistoryContext.jsx";
import { PreferencesProvider } from "@/context/PreferencesContext.jsx";
import { ThemeProvider } from "@/components/hooks/useTheme";
import { AuthProvider } from "@/context/AuthContext.jsx";  // ✅ add this

export default function App() {
  return (
    <ThemeProvider>
      <PreferencesProvider>
        <AuthProvider>  {/* ✅ wrap your app with AuthProvider */}
          <HistoryProvider>
            <Layout>
              <MainDashboard />
            </Layout>
          </HistoryProvider>
        </AuthProvider>
      </PreferencesProvider>
    </ThemeProvider>
  );
}
