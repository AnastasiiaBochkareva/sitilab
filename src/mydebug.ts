function logIfDebug(message: string): void {
  const parsedUrl = new URL(window.location.href);
  if (parsedUrl.searchParams.get('mydebug') === '1') {
    console.log(message);
  }
}

// Пример:
logIfDebug('Отладка включена');
// Мое использование:
// logIfDebug('[survey] clicked');
export { logIfDebug };
