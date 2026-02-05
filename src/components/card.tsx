import * as React from "react";

import { cn } from "../lib/utils.js";

/**
 * Card component props.
 */
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * A card container component.
 *
 * @example
 * ```tsx
 * <Card>
 *   <CardHeader>
 *     <CardTitle>Card Title</CardTitle>
 *     <CardDescription>Card description</CardDescription>
 *   </CardHeader>
 *   <CardContent>
 *     <p>Card content goes here.</p>
 *   </CardContent>
 *   <CardFooter>
 *     <Button>Action</Button>
 *   </CardFooter>
 * </Card>
 * ```
 */
const Card = React.forwardRef<HTMLDivElement, CardProps>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("rounded-xl border border-gray-200 bg-white text-gray-900 shadow", className)} {...props} />
));
Card.displayName = "Card";

/**
 * Card header component props.
 */
export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * Container for card title and description.
 */
const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
));
CardHeader.displayName = "CardHeader";

/**
 * Card title component props.
 */
export interface CardTitleProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * The title of the card.
 */
const CardTitle = React.forwardRef<HTMLDivElement, CardTitleProps>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("leading-none font-semibold tracking-tight", className)} {...props} />
));
CardTitle.displayName = "CardTitle";

/**
 * Card description component props.
 */
export interface CardDescriptionProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * Supporting description text in the card.
 */
const CardDescription = React.forwardRef<HTMLDivElement, CardDescriptionProps>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("text-sm text-gray-500", className)} {...props} />
));
CardDescription.displayName = "CardDescription";

/**
 * Card content component props.
 */
export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * Main content area of the card.
 */
const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

/**
 * Card footer component props.
 */
export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * Footer section of the card.
 */
const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex items-center p-6 pt-0", className)} {...props} />
));
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
