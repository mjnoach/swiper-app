import { SessionProvider } from "@/providers/session"

export function Providers({ children }: React.PropsWithChildren) {
  return <SessionProvider>{children}</SessionProvider>
}
