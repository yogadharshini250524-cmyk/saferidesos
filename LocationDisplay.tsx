import { MapPin, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

interface LocationDisplayProps {
  lat: number;
  lng: number;
}

const LocationDisplay = ({ lat, lng }: LocationDisplayProps) => {
  const mapsUrl = `https://www.google.com/maps?q=${lat},${lng}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="card-glass mx-auto max-w-lg rounded-xl border-sos/30 p-6"
    >
      <div className="mb-3 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sos/20">
          <MapPin className="h-4 w-4 text-sos" />
        </div>
        <h3 className="font-display font-semibold text-foreground">Live Location</h3>
        <span className="ml-auto flex items-center gap-1 text-xs text-sos">
          <span className="h-2 w-2 animate-pulse rounded-full bg-sos" />
          Tracking
        </span>
      </div>
      <div className="mb-4 grid grid-cols-2 gap-3 rounded-lg bg-muted/50 p-3 text-sm">
        <div>
          <p className="text-muted-foreground">Latitude</p>
          <p className="font-mono font-medium text-foreground">{lat.toFixed(6)}</p>
        </div>
        <div>
          <p className="text-muted-foreground">Longitude</p>
          <p className="font-mono font-medium text-foreground">{lng.toFixed(6)}</p>
        </div>
      </div>
      <a
        href={mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 rounded-lg bg-primary/10 px-4 py-2.5 text-sm font-medium text-primary transition-colors hover:bg-primary/20"
      >
        <ExternalLink className="h-4 w-4" />
        Open in Google Maps
      </a>
    </motion.div>
  );
};

export default LocationDisplay;
