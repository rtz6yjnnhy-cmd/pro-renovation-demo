export const SELECT_SERVICE_EVENT = "pro-renovation:select-service";

/** Preselects a service in the estimate form, then lets the anchor scroll to it. */
export function selectService(id: string) {
  window.dispatchEvent(new CustomEvent<string>(SELECT_SERVICE_EVENT, { detail: id }));
}
