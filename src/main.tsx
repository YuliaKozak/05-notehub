import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./components/App/App";
import "modern-normalize";

// 1. Обов'язково імпортуємо клієнт та провайдер для TanStack Query
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// 2. Створюємо екземпляр клієнта (це наш менеджер кешу та запитів)
const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* 3. Огортаємо App у провайдер і передаємо йому наш клієнт */}
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>,
);
