document.addEventListener('click', (event) => {
  const icoInfo = event.target.closest('.ico-info');
  if (icoInfo) {
    event.preventDefault();
    event.stopPropagation();
  }
});
