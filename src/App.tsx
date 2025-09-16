import { Toaster } from "sonner";
import {
  Provider,
  QueryClient,
  QueryClientProvider,
  route,
  RouterProvider,
} from "./index";
import { store } from "./lib/Redux/store";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: Infinity,
        refetchOnWindowFocus: false,
      },
    },
  });
  return (
    <main className="flex h-screen">
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <RouterProvider router={route} />
        </Provider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
      <Toaster duration={3000} className="p-12" />
    </main>
  );
}

export default App;
