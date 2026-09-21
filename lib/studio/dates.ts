/** 한국 시간 기준의 오늘 날짜(YYYY-MM-DD). 서버 시간대와 무관하게 같은 값이 나온다. */
export function koreaToday(): string {
  return new Date(Date.now() + 9 * 60 * 60 * 1000).toISOString().slice(0, 10);
}
