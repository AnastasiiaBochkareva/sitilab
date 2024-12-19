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
  // hoverTarget.addEventListener('click', () => {
  //   if (styleTarget.style.display === 'block') {
  //     styleTarget.style.display = 'none';
  //   } else {
  //     styleTarget.style.display = 'block';
  //   }
  // });
});
