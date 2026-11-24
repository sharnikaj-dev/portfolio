import { useEffect, useRef, useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url';
import { motion } from 'motion/react';
import { EyeOff, Lock, ShieldAlert, X } from 'lucide-react';
import { CertificationItem } from '../data/portfolioData';

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

interface CertificateViewerModalProps {
  certificate: CertificationItem | null;
  onClose: () => void;
}

function drawWatermarkPattern(ctx: CanvasRenderingContext2D, width: number, height: number) {
  ctx.save();
  ctx.fillStyle = 'rgba(24, 24, 27, 0.14)';
  ctx.font = '600 15px "DM Sans", system-ui, sans-serif';
  ctx.textAlign = 'center';
  const stepX = 310;
  const stepY = 145;
  ctx.translate(width / 2, height / 2);
  ctx.rotate(-Math.PI / 6);
  for (let y = -height; y <= height; y += stepY) {
    for (let x = -width; x <= width; x += stepX) {
      ctx.fillText('SHARNIKA J · PROTECTED ORIGINAL · VIEW ONLY', x, y);
    }
  }
  ctx.restore();
}

export function CertificateViewerModal({
  certificate,
  onClose,
}: CertificateViewerModalProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [focusLost, setFocusLost] = useState(false);
  const [captureWarning, setCaptureWarning] = useState<string | null>(null);
  const [loadingCanvas, setLoadingCanvas] = useState(false);
  const [renderError, setRenderError] = useState<string | null>(null);

  useEffect(() => {
    if (!certificate) return;
    setFocusLost(false);
    setCaptureWarning(null);
    document.body.style.overflow = 'hidden';

    const triggerShield = (reason: string) => {
      setCaptureWarning(reason);
      setFocusLost(true);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }

      const keyLower = e.key.toLowerCase();
      const isModifierCapture =
        (e.metaKey && e.shiftKey && ['3', '4', '5', 's'].includes(keyLower)) ||
        ((e.ctrlKey || e.metaKey) && ['s', 'p', 'u'].includes(keyLower)) ||
        ((e.ctrlKey || e.metaKey) && e.shiftKey && ['i', 's', 'c', 'j'].includes(keyLower)) ||
        e.key === 'PrintScreen' ||
        e.key === 'F12';

      if (isModifierCapture) {
        e.preventDefault();
        e.stopPropagation();
        if (e.key === 'PrintScreen' && navigator.clipboard?.writeText) {
          navigator.clipboard.writeText('').catch(() => {});
        }
        triggerShield('Screenshots, saving, and printing are disabled for this certificate.');
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'PrintScreen') {
        if (navigator.clipboard?.writeText) {
          navigator.clipboard.writeText('').catch(() => {});
        }
        triggerShield('Screenshot shortcut blocked. Certificate view obscured for protection.');
      }
    };

    const handleBlur = () => setFocusLost(true);
    const handleFocus = () => setFocusLost(false);
    const handleVisibility = () => {
      if (document.visibilityState !== 'visible') {
        setFocusLost(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown, true);
    window.addEventListener('keyup', handleKeyUp, true);
    window.addEventListener('blur', handleBlur);
    window.addEventListener('focus', handleFocus);
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown, true);
      window.removeEventListener('keyup', handleKeyUp, true);
      window.removeEventListener('blur', handleBlur);
      window.removeEventListener('focus', handleFocus);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [certificate, onClose]);

  useEffect(() => {
    if (!certificate) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let cancelled = false;
    setLoadingCanvas(true);
    setRenderError(null);

    const sourceUrl = certificate.originalFilePath;
    const isPdfSource = certificate.originalFileType === 'pdf';

    if (isPdfSource) {
      const loadPdf = async () => {
        try {
          const loadingTask = pdfjsLib.getDocument({ url: sourceUrl });
          const pdf = await loadingTask.promise;
          const page = await pdf.getPage(1);
          if (cancelled) return;

          const baseViewport = page.getViewport({ scale: 1 });
          const targetWidth = 1120;
          const scale = targetWidth / baseViewport.width;
          const viewport = page.getViewport({ scale });

          canvas.width = Math.round(viewport.width);
          canvas.height = Math.round(viewport.height);
          ctx.clearRect(0, 0, canvas.width, canvas.height);

          await page.render({ canvasContext: ctx, viewport, canvas }).promise;
          if (cancelled) return;

          drawWatermarkPattern(ctx, canvas.width, canvas.height);
          setLoadingCanvas(false);
        } catch {
          if (!cancelled) {
            setRenderError('Could not render certificate preview.');
            setLoadingCanvas(false);
          }
        }
      };
      loadPdf();
    } else {
      const img = new Image();
      img.onload = () => {
        if (cancelled) return;
        const targetW = 1080;
        const ratio = img.height / img.width || 0.75;
        const targetH = Math.max(480, Math.round(targetW * ratio));
        canvas.width = targetW;
        canvas.height = targetH;
        ctx.clearRect(0, 0, targetW, targetH);
        ctx.drawImage(img, 0, 0, targetW, targetH);
        drawWatermarkPattern(ctx, targetW, targetH);
        setLoadingCanvas(false);
      };
      img.onerror = () => {
        if (!cancelled) {
          setRenderError('Could not load certificate image.');
          setLoadingCanvas(false);
        }
      };
      img.src = sourceUrl;
    }

    return () => {
      cancelled = true;
    };
  }, [certificate]);

  if (!certificate) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cert-viewer-title"
      onContextMenu={(e) => {
        e.preventDefault();
        setCaptureWarning('Right-click saving is disabled on protected certificates.');
      }}
      onDragStart={(e) => e.preventDefault()}
      className="protected-certificate-modal no-print fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md select-none sm:p-6"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 18, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
        className="relative max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-2xl border border-zinc-800 bg-[#111114] p-5 text-zinc-100 shadow-2xl sm:p-7"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-zinc-800/90 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#F2B705]">
              <Lock className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Locked Original Certificate · Strictly View-Only</span>
            </div>
            <h3 id="cert-viewer-title" className="mt-1 font-display text-xl font-bold text-zinc-50">
              {certificate.title}
            </h3>
            <p className="mt-0.5 text-xs text-zinc-400">
              {certificate.issuer} · {certificate.period} ·{' '}
              <span className="font-mono-tabular text-zinc-300">{certificate.credentialCode}</span>
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close certificate viewer"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-700 bg-[#18181D] text-zinc-300 transition-colors hover:border-[#F2B705]/60 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {captureWarning && (
          <div
            role="alert"
            className="mt-4 flex items-center justify-between gap-3 rounded-lg border border-[#F2B705]/50 bg-[#F2B705]/10 px-4 py-2.5 text-xs font-medium text-amber-200"
          >
            <span className="flex items-center gap-2">
              <ShieldAlert className="h-4 w-4 shrink-0 text-[#F2B705]" aria-hidden="true" />
              {captureWarning}
            </span>
            <button
              type="button"
              onClick={() => {
                setCaptureWarning(null);
                setFocusLost(false);
              }}
              className="font-semibold text-[#F2B705] hover:underline whitespace-nowrap shrink-0"
            >
              Resume View
            </button>
          </div>
        )}

        <div className="relative mt-5 overflow-hidden rounded-xl border border-zinc-800 bg-[#0B0B0E]">
          {loadingCanvas && (
            <div className="flex h-64 items-center justify-center text-xs font-medium text-zinc-400">
              Rendering protected original certificate...
            </div>
          )}

          {renderError && (
            <div className="flex h-64 items-center justify-center text-xs font-medium text-rose-400">
              {renderError}
            </div>
          )}

          <div
            className={`transition-all duration-150 ${
              focusLost ? 'blur-2xl scale-[1.01] opacity-15' : 'blur-0 opacity-100'
            }`}
          >
            <canvas
              ref={canvasRef}
              onContextMenu={(e) => e.preventDefault()}
              className={`pointer-events-none block h-auto w-full select-none ${
                loadingCanvas || renderError ? 'hidden' : 'block'
              }`}
            />
          </div>

          {focusLost && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#08080A]/90 p-6 text-center backdrop-blur-md">
              <EyeOff className="h-8 w-8 text-[#F2B705]" aria-hidden="true" />
              <p className="font-display text-base font-bold text-zinc-50">
                Protected View Paused
              </p>
              <p className="max-w-md text-xs leading-relaxed text-zinc-400">
                To prevent unauthorized screenshots or screen capture, the certificate canvas automatically blurs when focus leaves this window or a capture shortcut is pressed.
              </p>
              <button
                type="button"
                onClick={() => {
                  setFocusLost(false);
                  setCaptureWarning(null);
                }}
                className="mt-1 rounded-lg bg-[#F2B705] px-4 py-2 text-xs font-semibold text-zinc-950 transition-colors hover:bg-amber-300"
              >
                Click to Resume View
              </button>
            </div>
          )}
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-zinc-400">
          <span>
            Canvas-locked original: editing, downloading, right-click saving, drag export, and printing are disabled.
          </span>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-zinc-700 bg-[#18181D] px-3.5 py-1.5 text-xs font-medium text-zinc-200 transition-colors hover:border-[#F2B705]/60 hover:text-white"
          >
            Close
          </button>
        </div>
      </motion.div>
    </div>
  );
}
