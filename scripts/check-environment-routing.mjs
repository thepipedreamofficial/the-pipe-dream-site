import {
  PRODUCTION_HEIST_ORIGIN,
  PRODUCTION_PUBLIC_ORIGIN,
  PRODUCTION_VERCEL_PROJECT_ID,
  STAGING_HEIST_ORIGIN,
  STAGING_PUBLIC_ORIGIN,
  STAGING_VERCEL_PROJECT_ID,
  environmentRouting,
} from "../lib/server-environment.mjs";

function expectFailure(name, env) {
  try {
    environmentRouting(env);
    throw new Error(`${name} unexpectedly passed`);
  } catch (error) {
    if (String(error?.message).endsWith("unexpectedly passed")) throw error;
  }
}

const production = environmentRouting({
  VERCEL_ENV: "production",
  VERCEL_PROJECT_ID: PRODUCTION_VERCEL_PROJECT_ID,
});
if (production.heistOrigin !== PRODUCTION_HEIST_ORIGIN || production.publicOrigin !== PRODUCTION_PUBLIC_ORIGIN) {
  throw new Error("Production routing defaults changed unexpectedly");
}

const staging = environmentRouting({
  VERCEL_ENV: "preview",
  PUBLIC_SITE_ENVIRONMENT: "staging",
  PUBLIC_SITE_ORIGIN: STAGING_PUBLIC_ORIGIN,
  HEIST_API_ORIGIN: STAGING_HEIST_ORIGIN,
});
if (staging.heistOrigin !== STAGING_HEIST_ORIGIN || staging.publicOrigin !== STAGING_PUBLIC_ORIGIN) {
  throw new Error("Staging routing did not resolve to the staging origins");
}

const stagingProjectProduction = environmentRouting({
  VERCEL_ENV: "production",
  VERCEL_PROJECT_ID: STAGING_VERCEL_PROJECT_ID,
  PUBLIC_SITE_ENVIRONMENT: "staging",
  PUBLIC_SITE_ORIGIN: STAGING_PUBLIC_ORIGIN,
  HEIST_API_ORIGIN: STAGING_HEIST_ORIGIN,
});
if (
  stagingProjectProduction.heistOrigin !== STAGING_HEIST_ORIGIN
  || stagingProjectProduction.publicOrigin !== STAGING_PUBLIC_ORIGIN
) {
  throw new Error("The authorized staging Vercel project did not resolve to staging origins");
}

expectFailure("Preview without explicit staging configuration", { VERCEL_ENV: "preview" });
expectFailure("Preview pointed at production Heist", {
  VERCEL_ENV: "preview",
  PUBLIC_SITE_ENVIRONMENT: "staging",
  PUBLIC_SITE_ORIGIN: STAGING_PUBLIC_ORIGIN,
  HEIST_API_ORIGIN: PRODUCTION_HEIST_ORIGIN,
});
expectFailure("Production pointed at staging Heist", {
  VERCEL_ENV: "production",
  VERCEL_PROJECT_ID: PRODUCTION_VERCEL_PROJECT_ID,
  PUBLIC_SITE_ENVIRONMENT: "production",
  PUBLIC_SITE_ORIGIN: PRODUCTION_PUBLIC_ORIGIN,
  HEIST_API_ORIGIN: STAGING_HEIST_ORIGIN,
});
expectFailure("Production project claiming the staging environment", {
  VERCEL_ENV: "production",
  VERCEL_PROJECT_ID: PRODUCTION_VERCEL_PROJECT_ID,
  PUBLIC_SITE_ENVIRONMENT: "staging",
  PUBLIC_SITE_ORIGIN: STAGING_PUBLIC_ORIGIN,
  HEIST_API_ORIGIN: STAGING_HEIST_ORIGIN,
});
expectFailure("Staging project without its explicit staging environment", {
  VERCEL_ENV: "production",
  VERCEL_PROJECT_ID: STAGING_VERCEL_PROJECT_ID,
  PUBLIC_SITE_ORIGIN: STAGING_PUBLIC_ORIGIN,
  HEIST_API_ORIGIN: STAGING_HEIST_ORIGIN,
});
expectFailure("Unknown Vercel project claiming production", {
  VERCEL_ENV: "production",
  VERCEL_PROJECT_ID: "prj_unknown",
  PUBLIC_SITE_ENVIRONMENT: "production",
});

const current = environmentRouting(process.env);
console.log(
  `Environment routing verified for ${current.environment}: ${current.publicOrigin} -> ${current.heistOrigin}.`,
);
