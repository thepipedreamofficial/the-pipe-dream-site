import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import {
  PRODUCTION_VERCEL_PROJECT_ID,
  STAGING_VERCEL_PROJECT_ID,
  environmentRouting,
} from "../lib/server-environment.mjs";

const EXPECTED_REPOSITORY = "matawayllc/the-pipe-dream-site";
const EXPECTED_OWNER = "matawayllc";
const EXPECTED_SLUG = "the-pipe-dream-site";
const EXPECTED_VERCEL_ORG = "team_tqhy8d1nlmvdo7uhjlig8bf9";
const RETIRED_OWNER = "thepipedreamofficial";

function normalized(value) {
  return String(value || "").trim().toLowerCase();
}

function repositoryFromRemote(remote) {
  const value = normalized(remote).replace(/\.git$/, "");
  const match = value.match(/github\.com[/:]([^/]+)\/([^/]+)$/);
  return match ? `${match[1]}/${match[2]}` : "";
}

function localOrigin() {
  try {
    return execFileSync("git", ["remote", "get-url", "origin"], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
  } catch {
    return "";
  }
}

function allowedVercelProjects(environment, vercelEnvironment) {
  if (environment !== "staging") return new Set([normalized(PRODUCTION_VERCEL_PROJECT_ID)]);
  if (vercelEnvironment === "production") return new Set([normalized(STAGING_VERCEL_PROJECT_ID)]);
  return new Set([
    normalized(PRODUCTION_VERCEL_PROJECT_ID),
    normalized(STAGING_VERCEL_PROJECT_ID),
  ]);
}

function verifyProjectMatrix() {
  const production = allowedVercelProjects("production", "production");
  const stagingProduction = allowedVercelProjects("staging", "production");
  const stagingPreview = allowedVercelProjects("staging", "preview");
  if (!production.has(normalized(PRODUCTION_VERCEL_PROJECT_ID)) || production.has(normalized(STAGING_VERCEL_PROJECT_ID))) {
    throw new Error("Production Vercel project authorization matrix is invalid");
  }
  if (!stagingProduction.has(normalized(STAGING_VERCEL_PROJECT_ID)) || stagingProduction.has(normalized(PRODUCTION_VERCEL_PROJECT_ID))) {
    throw new Error("Staging production project authorization matrix is invalid");
  }
  if (!stagingPreview.has(normalized(PRODUCTION_VERCEL_PROJECT_ID)) || !stagingPreview.has(normalized(STAGING_VERCEL_PROJECT_ID))) {
    throw new Error("Staging Preview project authorization matrix is invalid");
  }
}

verifyProjectMatrix();
const environment = environmentRouting(process.env).environment;
const vercelEnvironment = normalized(process.env.VERCEL_ENV);
const allowedProjectIds = allowedVercelProjects(environment, vercelEnvironment);

const errors = [];
const checks = [];
const origin = localOrigin();
const originRepository = repositoryFromRemote(origin);

if (origin) {
  checks.push(`Git origin ${origin}`);
  if (normalized(origin).includes(RETIRED_OWNER)) {
    errors.push(`Git origin uses retired owner ${RETIRED_OWNER}: ${origin}`);
  } else if (originRepository && originRepository !== EXPECTED_REPOSITORY) {
    errors.push(`Git origin is ${originRepository}; expected ${EXPECTED_REPOSITORY}`);
  }
}

const githubRepository = normalized(process.env.GITHUB_REPOSITORY);
if (githubRepository) {
  checks.push(`GitHub Actions repository ${githubRepository}`);
  if (githubRepository !== EXPECTED_REPOSITORY) {
    errors.push(`GITHUB_REPOSITORY is ${githubRepository}; expected ${EXPECTED_REPOSITORY}`);
  }
}

const vercelOwner = normalized(process.env.VERCEL_GIT_REPO_OWNER);
const vercelSlug = normalized(process.env.VERCEL_GIT_REPO_SLUG);
if (vercelOwner || vercelSlug) {
  checks.push(`Vercel Git source ${vercelOwner || "<missing owner>"}/${vercelSlug || "<missing slug>"}`);
  if (vercelOwner !== EXPECTED_OWNER || vercelSlug !== EXPECTED_SLUG) {
    errors.push(
      `Vercel Git source is ${vercelOwner || "<missing owner>"}/${vercelSlug || "<missing slug>"}; expected ${EXPECTED_REPOSITORY}`,
    );
  }
}

const runtimeVercelProjectId = normalized(process.env.VERCEL_PROJECT_ID);
if (runtimeVercelProjectId) {
  checks.push(`Vercel runtime project ${runtimeVercelProjectId} (${environment})`);
  if (!allowedProjectIds.has(runtimeVercelProjectId)) {
    errors.push(`Vercel runtime project ${runtimeVercelProjectId} is not authorized for ${environment}`);
  }
}

try {
  const project = JSON.parse(readFileSync(".vercel/project.json", "utf8"));
  checks.push(`Vercel project ${normalized(project.orgId)}/${normalized(project.projectId)}`);
  if (normalized(project.orgId) !== EXPECTED_VERCEL_ORG || !allowedProjectIds.has(normalized(project.projectId))) {
    errors.push(`Local Vercel link is not authorized for the ${environment} public-site environment`);
  }
} catch (error) {
  if (error?.code !== "ENOENT") errors.push("Could not validate .vercel/project.json");
}

if (!checks.length) {
  errors.push("Could not verify routing from Git origin, GitHub Actions, or Vercel metadata");
}

if (errors.length) {
  console.error("Repository routing check failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Repository routing verified for ${EXPECTED_REPOSITORY}.`);
