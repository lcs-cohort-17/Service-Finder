import { Component, type ErrorInfo, type ReactNode } from "react";
import MapFallback, { type MapFallbackService } from "./MapFallback";
import { logError, toUserFacingMessage } from "../../utils/errorLogger";

interface MapErrorBoundaryProps {
  children: ReactNode;
  fallbackServices?: MapFallbackService[];
  maxRetries?: number;
  onRetry?: (attempt: number) => void;
}

interface MapErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  retryCount: number;
  resetKey: number;
}

const DEFAULT_MAX_RETRIES = 3;

/**
 * RESILIENCE-002: Global error boundary for map failures.
 *
 * Wrap any map-dependent tree with this component:
 *
 *   <MapErrorBoundary fallbackServices={services} onRetry={refetchMapData}>
 *     <MapContainer />
 *   </MapErrorBoundary>
 *
 * - Catches render/lifecycle errors thrown by the map and its children.
 * - Never leaves a blank screen: always shows MapFallback with a clear
 *   message and a retry button.
 * - Retry remounts the wrapped subtree (via key), so data-fetching
 *   effects inside it run again.
 * - Logs every caught error via errorLogger.
 *
 * Note: this only catches errors thrown during render/lifecycle in the
 * tree below it. A rejected fetch promise or a setTimeout callback won't
 * be caught automatically.
 */
export default class MapErrorBoundary extends Component<MapErrorBoundaryProps, MapErrorBoundaryState> {
  state: MapErrorBoundaryState = {
    hasError: false,
    error: null,
    retryCount: 0,
    resetKey: 0,
  };

  static getDerivedStateFromError(error: Error): Partial<MapErrorBoundaryState> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    logError(error, errorInfo.componentStack, {
      boundary: "map",
      retryCount: this.state.retryCount,
    });
  }

  handleRetry = (): void => {
    const maxRetries = this.props.maxRetries ?? DEFAULT_MAX_RETRIES;
    if (this.state.retryCount >= maxRetries) {
      return;
    }

    const attempt = this.state.retryCount + 1;
    this.props.onRetry?.(attempt);

    this.setState((prev: MapErrorBoundaryState) => ({
      hasError: false,
      error: null,
      retryCount: attempt,
      resetKey: prev.resetKey + 1,
    }));
  };

  render(): ReactNode {
    const { children, fallbackServices, maxRetries = DEFAULT_MAX_RETRIES } = this.props;
    const { hasError, error, retryCount, resetKey } = this.state;

    if (hasError && error) {
      return (
        <MapFallback
          message={toUserFacingMessage(error)}
          onRetry={this.handleRetry}
          retryCount={retryCount}
          maxRetries={maxRetries}
          services={fallbackServices}
        />
      );
    }

    return <div key={resetKey}>{children}</div>;
  }
}