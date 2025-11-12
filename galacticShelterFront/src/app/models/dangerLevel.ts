export enum DangerLevel {
  LOW = "Bas",
  MEDIUM = "Moyen",
  HIGH = "Haut"
}

export const DangerLevelLabels: Record<DangerLevel, string> = {
  [DangerLevel.LOW]: "LOW",
  [DangerLevel.MEDIUM]: "MEDIUM",
  [DangerLevel.HIGH]: "HIGH",
};

export function dangerLevelToLabel(level: DangerLevel): string {
  return DangerLevelLabels[level];
}

export function labelToDangerLevel(label: string): DangerLevel | undefined {
  return (Object.entries(DangerLevelLabels)
    .find(([_, v]) => v === label)?.[0] as DangerLevel) ?? undefined;
}
