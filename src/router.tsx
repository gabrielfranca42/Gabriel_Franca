import { Switch, Route, Router as WouterRouter } from "wouter";
import Home from "@/pages/home";
import NotFound from "@/pages/not-found";

export function Router() {
  return (
    <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </WouterRouter>
  );
}
