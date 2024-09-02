/*eslint-disable*/
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.form-card');
    buttons.forEach(button => {
      button.addEventListener('click', (event) => {
        event.preventDefault();
        if (button.classList.contains('active')) {
          button.classList.remove('active');
        } else {
          buttons.forEach(btn => btn.classList.remove('active'));
          button.classList.add('active');
        }
      });
    });
});