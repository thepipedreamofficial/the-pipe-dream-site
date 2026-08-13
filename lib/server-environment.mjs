export const PRODUCTION_PUBLIC_ORIGIN = "https://pipedreamband.com";
export const PRODUCTION_HEIST_ORIGIN = "https://portal.pipedreamband.com";
export const STAGING_PUBLIC_ORIGIN = "https://the-pipe-dream-site-staging.vercel.app";
export const STAGING_HEIST_ORIGIN = "https://pipe-dream-band-portal-staging.vercel.app";
export const PRODUCTION_VERCEL_PROJECT_ID = "prj_M2qYrn6dszvJbYUmdTNBgg2URsRy";
export const STAGING_VERCEL_PROJECT_ID = "prj_DF2tKJXVwjcejGyz8UtaFJv8TVZA";

const VALID_ENVIRONMENTS = new Set(["development", "staging", "production"]);

function clean(value) {
  return String(value || "").trim();
}

function exactOrigin(value, name) {
  const input = clean(value);
  if (!input) return "";
  let url;
  try {
    url = new URL(input);
  } catch {
    throw new Error(`${name} must be a valid HTTPS origin`);
  }
  if (
    url.protocol !== "https:"
    || url.username
    || url.password
    || url.pathname !== "/"
    || url.search
    || url.hash
  ) {
    throw new Error(`${name} must be an HTTPS origin without credentials, a path, query, or fragment`);
  }
  return url.origin;
}

function requiredExactOrigin(env, name, expected) {
  const value = exactOrigin(env[name], name);
  if (!value) throw new Error(`${name} is required for staging/preview deployments`);
  if (value !== expected) throw new Error(`${name} must be ${expected} in staging`);
  return value;
}

export function publicSiteEnvironment(env = process.env) {
  const explicit = clean(env.PUBLIC_SITE_ENVIRONMENT).toLowerCase();
  const vercel = clean(env.VERCEL_ENV).toLowerCase();
  const vercelProjectId = clean(env.VERCEL_PROJECT_ID);
  const stagingProjectProduction = vercel === "production" && vercelProjectId === STAGING_VERCEL_PROJECT_ID;
  if (explicit && !VALID_ENVIRONMENTS.has(explicit)) {
    throw new Error("PUBLIC_SITE_ENVIRONMENT must be development, staging, or production");
  }
  if (vercel === "preview" && explicit !== "staging") {
    throw new Error("Vercel Preview requires PUBLIC_SITE_ENVIRONMENT=staging");
  }
  if (vercel === "production" && vercelProjectId && ![PRODUCTION_VERCEL_PROJECT_ID, STAGING_VERCEL_PROJECT_ID].includes(vercelProjectId)) {
    throw new Error("Vercel Production uses an unrecognized project ID");
  }
  if (stagingProjectProduction && explicit !== "staging") {
    throw new Error("The staging Vercel project requires PUBLIC_SITE_ENVIRONMENT=staging");
  }
  if (vercel === "production" && !stagingProjectProduction && explicit && explicit !== "production") {
    throw new Error("Only the authorized staging Vercel project may use staging under VERCEL_ENV=production");
  }
  if (explicit) return explicit;
  if (vercel === "production") return "production";
  if (vercel === "preview") return "staging";
  return "development";
}

export function environmentRouting(env = process.env) {
  const environment = publicSiteEnvironment(env);
  if (environment === "staging") {
    return {
      environment,
      publicOrigin: requiredExactOrigin(env, "PUBLIC_SITE_ORIGIN", STAGING_PUBLIC_ORIGIN),
      heistOrigin: requiredExactOrigin(env, "HEIST_API_ORIGIN", STAGING_HEIST_ORIGIN),
    };
  }

  const configuredHeist = exactOrigin(env.HEIST_API_ORIGIN, "HEIST_API_ORIGIN");
  const configuredPublic = exactOrigin(env.PUBLIC_SITE_ORIGIN, "PUBLIC_SITE_ORIGIN");
  if (environment === "production") {
    if (configuredHeist && configuredHeist !== PRODUCTION_HEIST_ORIGIN) {
      throw new Error(`HEIST_API_ORIGIN must be ${PRODUCTION_HEIST_ORIGIN} in production`);
    }
    if (configuredPublic && configuredPublic !== PRODUCTION_PUBLIC_ORIGIN) {
      throw new Error(`PUBLIC_SITE_ORIGIN must be ${PRODUCTION_PUBLIC_ORIGIN} in production`);
    }
  }
  return {
    environment,
    publicOrigin: configuredPublic || PRODUCTION_PUBLIC_ORIGIN,
    heistOrigin: configuredHeist || PRODUCTION_HEIST_ORIGIN,
  };
}

export function heistApiUrl(pathname, env = process.env) {
  if (typeof pathname !== "string" || !pathname.startsWith("/api/")) {
    throw new Error("Heist API paths must begin with /api/");
  }
  const { heistOrigin } = environmentRouting(env);
  return new URL(pathname, `${heistOrigin}/`).toString();
}
