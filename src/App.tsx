import { route, RouterProvider } from "./index";

function App() {
  return (
    <main className="flex h-screen">
      <RouterProvider router={route} />
    </main>
  );
}

export default App;
