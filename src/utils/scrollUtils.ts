export const findScrollableElement = (element: HTMLElement | null): HTMLElement | null => {
  if (!element) return null;
  if (element.scrollHeight > element.clientHeight) return element;
  for (let i = 0; i < element.children.length; i++) {
    const scrollable = findScrollableElement(element.children[i] as HTMLElement);
    if (scrollable) return scrollable;
  }
  return null;
};
