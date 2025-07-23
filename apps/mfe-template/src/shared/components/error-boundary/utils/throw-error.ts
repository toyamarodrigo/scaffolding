// Function for throwing errors programmatically
export function throwError(error: Error | string) {
  const errorObj = typeof error === "string" ? new Error(error) : error;
  throw errorObj;
}
