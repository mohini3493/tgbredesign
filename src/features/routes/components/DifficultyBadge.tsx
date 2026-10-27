import { Badge } from "@/components/ui/badge";
import type { Difficulty } from "../schemas";

const tone = { easy: "secondary-soft", intermediate: "ink", expert: "secondary" } as const;
const label = { easy: "Easy", intermediate: "Intermediate", expert: "Expert" } as const;

export function DifficultyBadge({ level }: { level: Difficulty }) {
  return <Badge tone={tone[level]}>{label[level]}</Badge>;
}
