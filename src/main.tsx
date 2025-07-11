import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";

// ✅ Import persistence utilities
import { persistQueryClient } from "@tanstack/react-query-persist-client";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { queryClient } from "./api/queries/reactQuery";
import { ToastProvider } from "./api/services/toastService";

// ✅ Create a persister using localStorage
const localStoragePersister = createSyncStoragePersister({
  storage: window.localStorage,
});

// ✅ Persist the query client
persistQueryClient({
  queryClient,
  persister: localStoragePersister,
  maxAge: Infinity, // Keeps data forever; adjust if needed
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <ToastProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ToastProvider>
  </QueryClientProvider>
);
