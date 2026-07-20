import { lazy, Suspense, useCallback, useEffect, useState } from "react";
import { AlertTriangle, LockKeyhole, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import type { Stage25DViewportProps } from "./Stage25DViewport";

const Stage25DViewport = lazy(() => import("./Stage25DViewport").then((module) => ({ default: module.Stage25DViewport })));

type AccessState =
  | { status: "checking" }
  | { status: "allowed"; tier: "member" | "custom" }
  | { status: "denied" | "error"; code: string; message: string };

type MemberStage25DProps = Stage25DViewportProps & { projectId: string };

export function MemberStage25D({ projectId, ...viewportProps }: MemberStage25DProps) {
  const [access, setAccess] = useState<AccessState>({ status: "checking" });

  const checkAccess = useCallback(async () => {
    setAccess({ status: "checking" });
    try {
      const result = await supabase.functions.invoke("preview-entitlement", {
        body: { projectId, mode: "stage-2.5d" },
      });
      const data = result.data as { allowed?: boolean; tier?: "member" | "custom"; code?: string; message?: string } | null;
      if (data?.allowed && data.tier) {
        setAccess({ status: "allowed", tier: data.tier });
        return;
      }
      const code = data?.code ?? (result.error ? "FUNCTION_ERROR" : "ENTITLEMENT_REQUIRED");
      setAccess({
        status: code === "ENTITLEMENT_REQUIRED" || code === "CONFIRMATION_REQUIRED" ? "denied" : "error",
        code,
        message: data?.message ?? result.error?.message ?? "会员权益校验失败。",
      });
    } catch (cause) {
      setAccess({ status: "error", code: "NETWORK_ERROR", message: cause instanceof Error ? cause.message : "会员权益校验失败。" });
    }
  }, [projectId]);

  useEffect(() => { void checkAccess(); }, [checkAccess]);

  if (access.status === "checking") {
    return <div className="panel panel-body"><div className="h-[460px] md:h-[620px] rounded-md bg-muted animate-pulse" aria-label="正在验证会员权益" /></div>;
  }
  if (access.status !== "allowed") {
    return (
      <div className="panel panel-body space-y-3">
        <div className="rounded-md border border-warning/40 bg-warning/5 p-4 flex items-start gap-3">
          {access.status === "denied" ? <LockKeyhole className="h-5 w-5 text-warning shrink-0" /> : <AlertTriangle className="h-5 w-5 text-destructive shrink-0" />}
          <div className="min-w-0">
            <div className="font-medium">{access.status === "denied" ? "会员 2.5D 尚未解锁" : "暂时无法验证会员权益"}</div>
            <p className="text-sm text-muted-foreground mt-1">{access.message}</p>
            <p className="text-xs text-muted-foreground mt-1 font-mono">{access.code}</p>
          </div>
        </div>
        <Button size="sm" variant="outline" onClick={() => void checkAccess()}><RefreshCw className="h-4 w-4 mr-1" />重新验证</Button>
      </div>
    );
  }
  return (
    <Suspense fallback={<div className="panel panel-body"><div className="h-[460px] md:h-[620px] rounded-md bg-muted animate-pulse" /></div>}>
      <Stage25DViewport {...viewportProps} />
    </Suspense>
  );
}
