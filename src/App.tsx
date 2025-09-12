import { Toaster } from "sonner";
import { route, RouterProvider } from "./index";

function App() {
  return (
    <main className="flex h-screen">
      <RouterProvider router={route} />
      <Toaster closeButton className="p-12" position={"top-right"} />
    </main>
  );
}

export default App;
