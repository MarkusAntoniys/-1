/**
Логирование ошибок
@param {string} context - Контекст ошибки (имя функции/компонента)
@param {Error} error - Объект ошибки
*/
export const logError = (context, error) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`[ERROR] [${context}] ${message}`);
  // TODO: Интегрировать с Sentry/Firebase для production
};

/**
Логирование информационных сообщений
@param {string} context - Контекст
@param {string} message - Сообщение
*/
export const logInfo = (context, message) => {
  console.log(`[INFO] [${context}] ${message}`);
};
