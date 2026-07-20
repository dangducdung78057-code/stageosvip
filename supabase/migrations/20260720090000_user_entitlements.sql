DO $$ BEGIN
  CREATE TYPE public.membership_tier AS ENUM ('free', 'member', 'custom');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

CREATE TABLE IF NOT EXISTS public.user_entitlements (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  tier public.membership_tier NOT NULL DEFAULT 'free',
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'past_due', 'cancelled', 'expired')),
  starts_at timestamptz NOT NULL DEFAULT now(),
  expires_at timestamptz,
  source text NOT NULL DEFAULT 'manual',
  external_reference text,
  updated_at timestamptz NOT NULL DEFAULT now(),
  CHECK (expires_at IS NULL OR expires_at > starts_at)
);

GRANT SELECT ON public.user_entitlements TO authenticated;
GRANT ALL ON public.user_entitlements TO service_role;
REVOKE INSERT, UPDATE, DELETE ON public.user_entitlements FROM authenticated, anon;

ALTER TABLE public.user_entitlements ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "user_entitlements_read_own" ON public.user_entitlements;
CREATE POLICY "user_entitlements_read_own" ON public.user_entitlements
  FOR SELECT TO authenticated USING (user_id = auth.uid());

DROP TRIGGER IF EXISTS touch_user_entitlements_updated_at ON public.user_entitlements;
CREATE TRIGGER touch_user_entitlements_updated_at
  BEFORE UPDATE ON public.user_entitlements
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

COMMENT ON TABLE public.user_entitlements IS
  'Server-managed StageOS membership entitlements. Payment/admin services write via service_role only.';
