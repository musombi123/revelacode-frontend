import Layout from "./components/Layout.jsx";
import MainDashboard from "./components/MainDashboard.jsx";
import { HistoryProvider } from '@/context/HistoryContext';

export default function App() {
  return (
    <HistoryProvider>
      <Layout>
        <MainDashboard />
      </Layout>
    </HistoryProvider>
  );
}
