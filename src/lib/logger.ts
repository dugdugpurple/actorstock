export function logInfo(message: string, context?: unknown) {
  console.info(`[actorstock][info] ${message}`, context ?? "");
}

export function logWarn(message: string, context?: unknown) {
  console.warn(`[actorstock][warn] ${message}`, context ?? "");
}

export function logError(message: string, context?: unknown) {
  console.error(`[actorstock][error] ${message}`, context ?? "");
}
