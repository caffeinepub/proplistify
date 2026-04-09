import { ExternalBlob } from "@/backend";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ImageIcon, Loader2, Upload, X } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";

async function uploadFileToStorage(file: File): Promise<string> {
  const bytes = new Uint8Array(await file.arrayBuffer());
  const blob = ExternalBlob.fromBytes(bytes);
  return blob.getDirectURL();
}

interface ImageUploadFieldProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  accept?: string;
  className?: string;
}

export function ImageUploadField({
  value,
  onChange,
  label = "Upload Image",
  accept = "image/*",
  className,
}: ImageUploadFieldProps) {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File) {
    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file.");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      toast.error("Image must be under 10MB.");
      return;
    }
    setUploading(true);
    try {
      const url = await uploadFileToStorage(file);
      onChange(url);
      toast.success("Image uploaded successfully.");
    } catch {
      toast.error("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) void handleFile(file);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) void handleFile(file);
  }

  return (
    <div className={cn("space-y-2", className)}>
      {label && <p className="text-sm font-medium text-foreground">{label}</p>}

      {value ? (
        <div className="relative rounded-xl overflow-hidden border border-border group">
          <img
            src={value}
            alt="Uploaded"
            className="w-full h-48 object-cover"
          />
          <div className="absolute inset-0 bg-foreground/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
            <Button
              type="button"
              size="sm"
              variant="secondary"
              onClick={() => inputRef.current?.click()}
            >
              <Upload className="w-4 h-4 mr-1" />
              Replace
            </Button>
            <Button
              type="button"
              size="sm"
              variant="destructive"
              onClick={() => onChange("")}
            >
              <X className="w-4 h-4 mr-1" />
              Remove
            </Button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          className={cn(
            "w-full border-2 border-dashed rounded-xl transition-all duration-200 cursor-pointer",
            dragOver
              ? "border-accent bg-accent/5"
              : "border-border hover:border-accent/50 hover:bg-muted/30",
          )}
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          aria-label="Upload image"
          onClick={() => inputRef.current?.click()}
        >
          <div className="flex flex-col items-center justify-center py-10 gap-3 text-center px-4">
            {uploading ? (
              <Loader2 className="w-8 h-8 text-accent animate-spin" />
            ) : (
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                <ImageIcon className="w-6 h-6 text-accent" />
              </div>
            )}
            <div>
              <p className="text-sm font-medium text-foreground">
                {uploading
                  ? "Uploading..."
                  : "Drop image here or click to browse"}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                PNG, JPG, WebP up to 10MB
              </p>
            </div>
          </div>
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="sr-only"
        aria-label="File upload input"
        onChange={handleInputChange}
      />
    </div>
  );
}

interface MultiImageUploadProps {
  values: string[];
  onChange: (urls: string[]) => void;
  label?: string;
  maxImages?: number;
  className?: string;
}

export function MultiImageUpload({
  values,
  onChange,
  label = "Gallery Images",
  maxImages = 10,
  className,
}: MultiImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  async function handleFiles(files: FileList) {
    const toUpload = Array.from(files).slice(0, maxImages - values.length);
    setUploading(true);
    try {
      const urls = await Promise.all(toUpload.map(uploadFileToStorage));
      onChange([...values, ...urls]);
      toast.success(
        `${urls.length} image${urls.length !== 1 ? "s" : ""} added.`,
      );
    } catch {
      toast.error("Upload failed.");
    } finally {
      setUploading(false);
    }
  }

  function removeImage(idx: number) {
    onChange(values.filter((_, i) => i !== idx));
  }

  return (
    <div className={cn("space-y-3", className)}>
      {label && <p className="text-sm font-medium text-foreground">{label}</p>}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {values.map((url, idx) => (
          <div
            key={url}
            className="relative group rounded-lg overflow-hidden border border-border aspect-square"
          >
            <img
              src={url}
              alt={`Gallery ${idx + 1}`}
              className="w-full h-full object-cover"
            />
            <button
              type="button"
              onClick={() => removeImage(idx)}
              aria-label={`Remove image ${idx + 1}`}
              className="absolute top-1 right-1 bg-card/80 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive hover:text-destructive-foreground"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        ))}
        {values.length < maxImages && (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="aspect-square rounded-lg border-2 border-dashed border-border hover:border-accent/50 flex items-center justify-center text-muted-foreground hover:text-accent transition-colors"
            aria-label="Add image"
          >
            {uploading ? (
              <Loader2 className="w-6 h-6 animate-spin" />
            ) : (
              <Upload className="w-6 h-6" />
            )}
          </button>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="sr-only"
        aria-label="Multiple file upload"
        onChange={(e) => e.target.files && void handleFiles(e.target.files)}
      />
    </div>
  );
}
