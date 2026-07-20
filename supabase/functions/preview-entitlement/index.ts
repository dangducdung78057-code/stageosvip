import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

type PreviewMode = "stage-2.5d" | "stage-3d";
type MembershipTier = "free" | "member" | "custom";

function response(payload: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

function reject(code: string, message: string, status: number, extra: Record<string, unknown> = {}) {
  return response({ ok: false, allowed: false, code, message, ...extra }, status);
}

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const body = await req.json().catch(() => ({}));
    const projectId = body?.projectId ?? body?.project_id;
    const mode = body?.mode as PreviewMode | undefined;
    if (typeof projectId !== "string" || !UUID_RE.test(projectId)) {
      return reject("BAD_REQUEST", "projectId 必须为 UUID。", 400);
    }
    if (mode !== "stage-2.5d" && mode !== "stage-3d") {
      return reject("BAD_REQUEST", "mode 必须为 stage-2.5d 或 stage-3d。", 400);
    }

    const authHeader = req.headers.get("Authorization") ?? "";
    if (!authHeader.startsWith("Bearer ")) {
      return reject("UNAUTHORIZED", "请先登录。", 401);
    }
    const jwt = authHeader.slice("Bearer ".length);
    const anon = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
    );
    const { data: userData, error: userError } = await anon.auth.getUser(jwt);
    if (userError || !userData.user) {
      return reject("UNAUTHORIZED", "登录已失效，请重新登录。", 401);
    }
    const userId = userData.user.id;
    const service = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    const { data: project, error: projectError } = await service
      .from("projects")
      .select("id, user_id")
      .eq("id", projectId)
      .maybeSingle();
    if (projectError) throw projectError;
    if (!project || project.user_id !== userId) {
      return reject("FORBIDDEN", "无权访问该项目。", 403);
    }

    const { data: confirmation, error: confirmationError } = await service
      .from("confirmation_records")
      .select("id")
      .eq("project_id", projectId)
      .eq("status", "confirmed")
      .limit(1);
    if (confirmationError) throw confirmationError;
    if (!confirmation?.length) {
      return reject("CONFIRMATION_REQUIRED", "请先完成用户确认和隐私确认。", 403);
    }

    const { data: entitlement, error: entitlementError } = await service
      .from("user_entitlements")
      .select("tier, status, expires_at")
      .eq("user_id", userId)
      .maybeSingle();
    if (entitlementError) throw entitlementError;

    const now = Date.now();
    const unexpired = !entitlement?.expires_at || new Date(entitlement.expires_at).getTime() > now;
    const active = entitlement?.status === "active" && unexpired;
    const tier: MembershipTier = active ? entitlement.tier as MembershipTier : "free";
    const allowed = tier === "member" || tier === "custom";
    if (!allowed) {
      return reject("ENTITLEMENT_REQUIRED", "该预览模式需要有效会员权益。", 403, {
        tier,
        requiredTier: "member",
        mode,
      });
    }

    return response({ ok: true, allowed: true, tier, mode });
  } catch (error) {
    return response({
      ok: false,
      allowed: false,
      code: "INTERNAL",
      message: error instanceof Error ? error.message : "internal error",
    }, 500);
  }
});
