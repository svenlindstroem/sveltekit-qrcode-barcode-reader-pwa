/** Dispatch event on click outside of node */
export function clickOutside(node: HTMLElement) {
  const handleClick = (event: MouseEvent) => {
    // ignore clicks on the menu or burger button
    const target = event.target
    if (!(target instanceof HTMLElement)) return
    const el = target.closest('.ignore-clickoutside')
    if (el) return

    if (node && !node.contains(target) && !event.defaultPrevented) {
      node.dispatchEvent(new CustomEvent('clickedOutside'))
    }
  }

  document.addEventListener('click', handleClick, true)

  return {
    destroy() {
      document.removeEventListener('click', handleClick, true)
    }
  }
}
