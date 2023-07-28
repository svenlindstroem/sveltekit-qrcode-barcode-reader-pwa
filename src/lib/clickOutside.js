/** Dispatch event on click outside of node */
export function clickOutside(node) {
  const handleClick = (event) => {
    // ignore clicks on the menu or burger button
    const el = event.target.closest('.ignore-clickoutside')
    if (el) return
    if (node && !node.contains(event.target) && !event.defaultPrevented) {
      node.dispatchEvent(new CustomEvent('clickedOutside', node))
    }
  }

  document.addEventListener('click', handleClick, true)

  return {
    destroy() {
      document.removeEventListener('click', handleClick, true)
    }
  }
}
