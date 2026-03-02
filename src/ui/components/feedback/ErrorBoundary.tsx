import { Component, type ReactNode } from "react";

type Props = { children: ReactNode };
type State = { hasError: boolean; message: string };

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, message: "" };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, message: error.message };
  }

  componentDidCatch(error: Error, info: { componentStack: string }) {
    // Solo loguea en desarrollo
    if (import.meta.env.DEV) {
      console.error("[ErrorBoundary]", error, info.componentStack);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-6 text-center">
          <h1 className="text-2xl font-bold text-white">Algo salió mal</h1>
          <p className="text-slate-400 text-sm max-w-md">
            Ocurrió un error inesperado. Por favor recarga la página o contacta al administrador.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-2 px-5 py-2 rounded-lg bg-brand-accent text-brand-bg font-semibold hover:bg-emerald-400 transition"
          >
            Recargar
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}