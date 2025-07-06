import Layout from "./components/Layout.jsx";
import MainDashboard from "./components/MainDashboard.jsx";
import { HistoryProvider } from '@/context/HistoryContext';

<HistoryProvider>
  <AppRoutes />
</HistoryProvider>

export default function App() {
  return (
    <Layout>
      <MainDashboard />
    </Layout>
  );
}
