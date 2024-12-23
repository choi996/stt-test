import {
  MouseEvent,
  RefObject,
  TouchEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

interface Props {
  canvasRef: RefObject<HTMLCanvasElement>;
}

export default function SignatureCanvas({ canvasRef }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [isDrawing, setIsDrawing] = useState(false);
  const [lastPosition, setLastPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;

    if (canvas && container) {
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
    }
  }, [canvasRef]);

  useEffect(() => {
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [resizeCanvas]);

  const getCanvasOffset = (
    e: MouseEvent<HTMLCanvasElement> | TouchEvent<HTMLCanvasElement>,
  ) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    const offsetX =
      'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const offsetY =
      'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    return { x: offsetX, y: offsetY };
  };

  const handleMouseDown = (e: MouseEvent<HTMLCanvasElement>) => {
    const { x, y } = getCanvasOffset(e);
    setLastPosition({ x, y });
    setIsDrawing(true);
  };

  const handleMouseMove = (e: MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !lastPosition || !canvasRef.current) return;

    const { x, y } = getCanvasOffset(e);
    const ctx = canvasRef.current.getContext('2d');
    if (ctx) {
      ctx.beginPath();
      ctx.moveTo(lastPosition.x, lastPosition.y);
      ctx.lineTo(x, y);
      ctx.strokeStyle = 'black';
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.closePath();
    }
    setLastPosition({ x, y });
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
    setLastPosition(null);
  };

  const handleTouchStart = (e: TouchEvent<HTMLCanvasElement>) => {
    const { x, y } = getCanvasOffset(e);
    setLastPosition({ x, y });
    setIsDrawing(true);
  };

  const handleTouchMove = (e: TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !lastPosition || !canvasRef.current) return;

    const { x, y } = getCanvasOffset(e);
    const ctx = canvasRef.current.getContext('2d');
    if (ctx) {
      ctx.beginPath();
      ctx.moveTo(lastPosition.x, lastPosition.y);
      ctx.lineTo(x, y);
      ctx.strokeStyle = 'black';
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.closePath();
    }
    setLastPosition({ x, y });
  };

  const handleTouchEnd = () => {
    setIsDrawing(false);
    setLastPosition(null);
  };

  return (
    <div
      className="w-full rounded-md max-h-240 bg-gray11 relative overscroll-none"
      ref={containerRef}
    >
      <canvas
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
      />
    </div>
  );
}
