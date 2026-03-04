import { motion } from "framer-motion";
import { Mic, Play, Pause, Download, Trash2 } from "lucide-react";
import { useState, useRef } from "react";

interface AudioRecording {
  id: string;
  blob: Blob;
  url: string;
  timestamp: Date;
  duration: number;
}

interface AudioRecordingsProps {
  recordings: AudioRecording[];
  onDelete: (id: string) => void;
}

const formatDuration = (s: number) => {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m}:${sec.toString().padStart(2, "0")}`;
};

const RecordingItem = ({
  rec,
  onDelete,
}: {
  rec: AudioRecording;
  onDelete: (id: string) => void;
}) => {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggle = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(rec.url);
      audioRef.current.onended = () => setPlaying(false);
    }
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current.play();
      setPlaying(true);
    }
  };

  const download = () => {
    const a = document.createElement("a");
    a.href = rec.url;
    const ext = rec.blob.type.includes("mp4") ? "mp4" : rec.blob.type.includes("ogg") ? "ogg" : "webm";
    a.download = `SOS_${rec.timestamp.toISOString().replace(/[:.]/g, "-")}.${ext}`;
    a.click();
  };

  return (
    <div className="card-glass flex items-center gap-3 rounded-xl p-3">
      <button
        onClick={toggle}
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary transition-colors hover:bg-primary/30"
      >
        {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
      </button>
      <div className="flex-1 min-w-0">
        <p className="truncate text-sm font-medium text-foreground">
          {rec.timestamp.toLocaleTimeString()}
        </p>
        <p className="text-xs text-muted-foreground">
          {rec.timestamp.toLocaleDateString()} · {formatDuration(rec.duration)}
        </p>
      </div>
      <button
        onClick={download}
        className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
      >
        <Download className="h-4 w-4" />
      </button>
      <button
        onClick={() => onDelete(rec.id)}
        className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-destructive/20 hover:text-destructive"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  );
};

const AudioRecordings = ({ recordings, onDelete }: AudioRecordingsProps) => {
  return (
    <div>
      <h2 className="mb-4 flex items-center gap-2 font-display text-xl font-semibold text-foreground">
        <Mic className="h-5 w-5 text-primary" />
        Audio Evidence
      </h2>

      {recordings.length === 0 ? (
        <p className="rounded-xl bg-muted/30 p-6 text-center text-sm text-muted-foreground">
          Audio recordings will appear here when SOS is activated.
        </p>
      ) : (
        <div className="space-y-3">
          {recordings.map((rec) => (
            <motion.div
              key={rec.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <RecordingItem rec={rec} onDelete={onDelete} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AudioRecordings;
