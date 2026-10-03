export interface VisualDef {
  /** must match the `id` used in the markdown `:::visual{id="..."}` directive */
  id: string;
  /** build the widget inside `host`; return an optional handle with destroy() */
  mount(host: HTMLElement, props: Record<string, string>): void | { destroy?: () => void };
}
