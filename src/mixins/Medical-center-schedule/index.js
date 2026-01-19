function updateTodayLabel() {
    // убираем "сегодня" у всех колонок
    document.querySelectorAll('.table-grid__col .today').forEach(el => el.remove());

    const activeCol = document.querySelector('.table-grid__col.active');
    if (!activeCol) return;

    const firstCell = activeCol.querySelector('.cell');
    if (!firstCell) return;

    // заменяем содержимое на span.today
    firstCell.innerHTML = '<span class="today">сегодня</span>';
}

function alignRows() {
    const cols = document.querySelectorAll('.table-grid__col');
    if (!cols.length) return;

    // сбрасываем высоты (важно при resize)
    cols.forEach(col => {
        col.querySelectorAll('.cell').forEach(cell => {
            cell.style.height = '';
        });
    });

    const rowsCount = Math.max(...Array.from(cols).map(col => col.querySelectorAll('.cell').length));

    for (let rowIndex = 0; rowIndex < rowsCount; rowIndex++) {
        let maxHeight = 0;

        cols.forEach(col => {
            const cell = col.querySelectorAll('.cell')[rowIndex];
            if (!cell) return;

            const height = cell.getBoundingClientRect().height;
            if (height > maxHeight) maxHeight = height;
        });

        cols.forEach(col => {
            const cell = col.querySelectorAll('.cell')[rowIndex];
            if (!cell) return;
            cell.style.height = `${maxHeight}px`;
        });
    }
}

function init() {
    updateTodayLabel(); // сначала добавляем текст
    alignRows();        // потом выравниваем строки
}

window.addEventListener('load', init);
window.addEventListener('resize', init);

// переключение колонок
document.querySelectorAll('.table-grid__col').forEach(col => {
    col.addEventListener('click', () => {
        document.querySelectorAll('.table-grid__col').forEach(c => c.classList.remove('active'));
        col.classList.add('active');
        init();
    });
});
