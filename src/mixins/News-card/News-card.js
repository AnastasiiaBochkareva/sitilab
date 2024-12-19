/*eslint-disable */
const hoverContainers = document.querySelectorAll('.news-card');

hoverContainers.forEach((container) => {
  const hoverTarget = container.querySelector('.news-card__ad');
  const styleTarget = container.querySelector('.tooltip');

  hoverTarget.addEventListener('mouseover', () => {
    styleTarget.style.display = 'block';
  });

  hoverTarget.addEventListener('mouseout', () => {
    styleTarget.style.display = 'none';
  });

});
