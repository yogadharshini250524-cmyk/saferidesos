import { Phone } from "lucide-react";

interface HelplineCardProps {
  name: string;
  number: string;
  icon: string;
}

const HelplineCard = ({ name, number, icon }: HelplineCardProps) => {
  return (
    <a
      href={`tel:${number}`}
      className="card-glass flex items-center gap-4 rounded-xl p-4 transition-all hover:border-primary/30 hover:bg-muted/50"
    >
      <span className="text-2xl">{icon}</span>
      <div className="flex-1">
        <p className="font-display font-semibold text-foreground">{name}</p>
        <p className="text-sm text-muted-foreground">{number}</p>
      </div>
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-safe/20">
        <Phone className="h-4 w-4 text-safe" />
      </div>
    </a>
  );
};

export default HelplineCard;
