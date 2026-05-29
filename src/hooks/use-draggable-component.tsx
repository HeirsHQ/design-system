import { useCallback, useState } from "react";
import type React from "react";

/**
 * Props for the useDraggableComponent hook.
 * @template T - The type of HTML element being made draggable
 */
interface UseDraggableComponentProps<T> {
  /** Initial [x, y] position of the draggable element */
  initialPosition: [number, number];
  /** React ref pointing to the draggable element */
  ref: React.RefObject<T | null>;
}

/**
 * Return type for the useDraggableComponent hook.
 */
interface UseDraggableComponentReturn {
  /** Whether the element is currently being dragged */
  isDragging: boolean;
  /** Handler for mousedown events - attach to the draggable element */
  onMouseDown: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  /** Handler for mouseleave events - attach to the drag container */
  onMouseLeave: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  /** Handler for mousemove events - attach to the drag container */
  onMouseMove: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  /** Handler for mouseup events - attach to the drag container */
  onMouseUp: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  /** Current [x, y] position of the element */
  position: [number, number];
}

/**
 * Hook that enables drag-and-drop functionality for a component.
 *
 * @template T - The type of HTML element being made draggable
 * @param props - Configuration options
 * @param props.initialPosition - Starting [x, y] coordinates
 * @param props.ref - React ref to the draggable element
 * @returns Object containing position state and mouse event handlers
 *
 * @example
 * ```tsx
 * const ref = useRef<HTMLDivElement>(null);
 * const { position, isDragging, onMouseDown, onMouseMove, onMouseUp, onMouseLeave } =
 *   useDraggableComponent({ initialPosition: [100, 100], ref });
 *
 * return (
 *   <div onMouseMove={onMouseMove} onMouseUp={onMouseUp} onMouseLeave={onMouseLeave}>
 *     <div
 *       ref={ref}
 *       onMouseDown={onMouseDown}
 *       style={{ left: position[0], top: position[1], position: "absolute" }}
 *     >
 *       Drag me!
 *     </div>
 *   </div>
 * );
 * ```
 */
export const useDraggableComponent = <T extends HTMLElement>({
  initialPosition,
  ref,
}: UseDraggableComponentProps<T>): UseDraggableComponentReturn => {
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState<[number, number]>([0, 0]);

  const onMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      setDragStart([e.clientX - rect.left, e.clientY - rect.top]);
      setIsDragging(true);
      e.preventDefault();
    },
    [ref],
  );

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (!isDragging) return;

      setPosition([e.clientX - dragStart[0], e.clientY - dragStart[1]]);
    },
    [isDragging, dragStart],
  );

  const onMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const onMouseLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  return {
    isDragging,
    onMouseDown,
    onMouseLeave,
    onMouseMove,
    onMouseUp,
    position,
  };
};
