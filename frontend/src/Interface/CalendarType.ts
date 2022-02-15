const Monthly = 'Monthly' as const;
const Weekly = 'Weekly' as const;

export type CalendarType = typeof Monthly | typeof Weekly;
