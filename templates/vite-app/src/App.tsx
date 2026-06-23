import { Button } from "@heirshq/design-system";
import { Rocket } from "lucide-react";

const App = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 p-6 text-center">
      <Rocket className="text-primary-500 size-10" />
      <div className="space-y-1.5">
        <h1 className="text-2xl font-semibold">Heirs Design System</h1>
        <p className="text-muted-foreground text-sm">Vite + React starter — start building.</p>
      </div>
      <Button>Get started</Button>
    </main>
  );
};

export default App;
