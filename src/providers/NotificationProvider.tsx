import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

export type NotificationIntent = "info" | "success" | "error";

export type NotifyOptions = {
  message: string;
  title?: string;
  intent?: NotificationIntent;
  duration?: number;
};

type InternalNotification = NotifyOptions & { id: string; intent: NotificationIntent; createdAt: number };

type NotificationContextValue = {
  notify: (options: NotifyOptions) => string;
  dismiss: (id: string) => void;
};

const NotificationContext = createContext<NotificationContextValue | undefined>(undefined);

const DEFAULT_DURATION = 5000;

const generateId = () => {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return Math.random().toString(36).slice(2, 11);
};

const intentStyles: Record<NotificationIntent, string> = {
  info: "border-slate-200 bg-white text-slate-700",
  success: "border-emerald-200 bg-emerald-50 text-emerald-700",
  error: "border-rose-200 bg-rose-50 text-rose-700",
};

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notifications, setNotifications] = useState<InternalNotification[]>([]);

  const dismiss = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id));
  }, []);

  const notify = useCallback(
    ({ intent = "info", duration = DEFAULT_DURATION, ...options }: NotifyOptions): string => {
      const id = generateId();
      const notification: InternalNotification = {
        ...options,
        id,
        intent,
        duration,
        createdAt: Date.now(),
      };

      setNotifications((prev) => [...prev, notification]);

      if (typeof window !== "undefined") {
        window.setTimeout(() => dismiss(id), duration);
      }

      return id;
    },
    [dismiss],
  );

  const value = useMemo<NotificationContextValue>(
    () => ({ notify, dismiss }),
    [notify, dismiss],
  );

  return (
    <NotificationContext.Provider value={value}>
      {children}
      <div className="pointer-events-none fixed inset-x-0 top-0 z-[2000] flex flex-col items-end gap-3 px-4 py-6 sm:px-6">
        {notifications.map(({ id, title, message, intent }) => (
          <div
            key={id}
            role={intent === "error" ? "alert" : "status"}
            className={`pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-xl border px-4 py-3 shadow-lg ring-1 ring-black/5 transition ${intentStyles[intent]}`}
          >
            <div className="flex-1 text-sm">
              {title && <p className="font-semibold">{title}</p>}
              <p className={title ? "mt-1" : undefined}>{message}</p>
            </div>
            <button
              type="button"
              className="ml-auto text-xs font-semibold uppercase tracking-wide text-slate-500 transition hover:text-slate-800"
              onClick={() => dismiss(id)}
            >
              Close
            </button>
          </div>
        ))}
      </div>
    </NotificationContext.Provider>
  );
};

export const useNotifications = (): NotificationContextValue => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotifications must be used within a NotificationProvider");
  }
  return context;
};
