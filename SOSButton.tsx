import { motion } from "framer-motion";

interface SOSButtonProps {
  active: boolean;
  onActivate: () => void;
  onDeactivate: () => void;
}

const SOSButton = ({ active, onActivate, onDeactivate }: SOSButtonProps) => {
  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-sm text-muted-foreground">
        {active ? "SOS is active. Your contacts are being alerted." : "Press and hold if you need help"}
      </p>
      <motion.button
        whileTap={!active ? { scale: 0.95 } : {}}
        onClick={active ? onDeactivate : onActivate}
        className={`relative flex h-40 w-40 items-center justify-center rounded-full font-display text-3xl font-bold transition-all md:h-48 md:w-48 md:text-4xl ${
          active
            ? "bg-sos text-sos-foreground sos-glow sos-pulse"
            : "bg-card border-2 border-border text-foreground hover:border-sos/50 hover:bg-sos/10"
        }`}
      >
        {active ? "STOP" : "SOS"}
        {!active && (
          <span className="absolute -bottom-1 left-1/2 h-1 w-16 -translate-x-1/2 rounded-full bg-primary/20" />
        )}
      </motion.button>
      {active && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xs text-sos"
        >
          Tap to deactivate
        </motion.p>
      )}
    </div>
  );
};

export default SOSButton;
