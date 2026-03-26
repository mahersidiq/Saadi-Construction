import { useState, useRef } from 'react';
import Image from 'next/image';
import { Upload, Trash2 } from 'lucide-react';
import supabase from '@/lib/supabase';
import Spinner from './Spinner';

/**
 * Image upload component for admin panels.
 * Uploads files to Supabase Storage and returns the public URL.
 *
 * @param {object}   props
 * @param {Function} props.onUpload     - Callback receiving the public URL after upload
 * @param {string}   [props.currentImage] - URL of the currently set image
 * @param {string}   [props.bucket='media'] - Supabase Storage bucket name
 * @param {'projects'|'blog'} [props.folder='projects'] - Sub-folder inside the bucket
 */
export default function ImageUpload({
  onUpload,
  currentImage,
  bucket = 'media',
  folder = 'projects',
}) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(currentImage || null);
  const [error, setError] = useState(null);
  const inputRef = useRef(null);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/avif'];
    if (!allowedTypes.includes(file.type)) {
      setError('Please select a JPEG, PNG, WebP, or AVIF image.');
      return;
    }

    // Validate file size (max 5 MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image must be smaller than 5 MB.');
      return;
    }

    setError(null);
    setUploading(true);

    try {
      // Generate a unique file name
      const ext = file.name.split('.').pop();
      const fileName = `${folder}/${Date.now()}-${Math.random()
        .toString(36)
        .slice(2, 8)}.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false,
        });

      if (uploadError) throw uploadError;

      const {
        data: { publicUrl },
      } = supabase.storage.from(bucket).getPublicUrl(fileName);

      setPreview(publicUrl);
      onUpload(publicUrl);
    } catch (err) {
      console.error('Upload failed:', err);
      setError(err.message || 'Upload failed. Please try again.');
    } finally {
      setUploading(false);
      // Reset input so the same file can be re-selected
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  const handleRemove = () => {
    setPreview(null);
    onUpload(null);
  };

  return (
    <div className="space-y-3">
      {/* Preview */}
      {preview && (
        <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-mid-gray">
          <Image
            src={preview}
            alt="Upload preview"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 400px"
          />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute right-2 top-2 rounded-lg bg-charcoal/70 p-1.5 text-white transition-colors hover:bg-red-600"
            aria-label="Remove image"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Upload area */}
      <label
        className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed px-4 py-8 transition-colors ${
          uploading
            ? 'border-mid-gray bg-light-gray text-charcoal/40'
            : 'border-mid-gray bg-light-gray text-charcoal/60 hover:border-gold hover:text-gold'
        }`}
      >
        {uploading ? (
          <>
            <Spinner size="md" />
            <span className="text-sm font-medium">Uploading...</span>
          </>
        ) : (
          <>
            <Upload className="h-6 w-6" />
            <span className="text-sm font-medium">
              Click to upload an image
            </span>
            <span className="text-xs">JPEG, PNG, WebP, or AVIF (max 5 MB)</span>
          </>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/avif"
          onChange={handleFileChange}
          disabled={uploading}
          className="sr-only"
        />
      </label>

      {/* Error */}
      {error && (
        <p className="text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
