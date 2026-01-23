function alignRows() {
    if (window.innerWidth < 1000) return;

    const cols = document.querySelectorAll('.table-grid__col');
    if (!cols.length) return;

    cols.forEach(col => {
        const cells = col.querySelectorAll('.cell');
        cells.forEach((cell, index) => {
            if (index === cells.length - 1) return;
            cell.style.height = '';
        });
    });

    const rowsCount = Math.max(
        ...Array.from(cols).map(col => col.querySelectorAll('.cell').length - 1)
    );

    for (let rowIndex = 0; rowIndex < rowsCount; rowIndex++) {
        let maxHeight = 0;

        cols.forEach(col => {
            const cells = col.querySelectorAll('.cell');
            const cell = cells[rowIndex];

            if (!cell) return;
            maxHeight = Math.max(
                maxHeight,
                cell.getBoundingClientRect().height
            );
        });

        cols.forEach(col => {
            const cells = col.querySelectorAll('.cell');
            const cell = cells[rowIndex];

            if (!cell) return;
            cell.style.height = `${maxHeight}px`;
        });
    }
}

window.addEventListener('load', alignRows);
window.addEventListener('resize', alignRows);
