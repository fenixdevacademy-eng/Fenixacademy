'use client';

import React from 'react';
import Link from 'next/link';
import { useNavigation } from '@/hooks/useNavigation';
import { cn } from '@/lib/utils';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
    name: string;
    href?: string;
    current?: boolean;
}

export interface BreadcrumbProps {
    items?: BreadcrumbItem[];
    showHome?: boolean;
    separator?: React.ReactNode;
    className?: string;
    itemClassName?: string;
    currentItemClassName?: string;
    separatorClassName?: string;
}

const Breadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>(
    ({
        items = [],
        showHome = true,
        separator = <ChevronRight className="h-4 w-4" />,
        className,
        itemClassName,
        currentItemClassName,
        separatorClassName,
        ...props
    }, ref) => {
        const { getBreadcrumb } = useNavigation();

        // Use provided items or generate from current path
        const breadcrumbItems = items.length > 0 ? items : getBreadcrumb();

        return (
            <nav
                ref={ref}
                className={cn("flex items-center space-x-1 text-sm", className)}
                aria-label="Breadcrumb"
                {...props}
            >
                <ol className="flex items-center space-x-1">
                    {showHome && (
                        <li>
                            <Link
                                href="/"
                                className={cn(
                                    "text-theme-text-secondary hover:text-theme-primary transition-colors duration-200",
                                    itemClassName
                                )}
                                aria-label="Página inicial"
                            >
                                <Home className="h-4 w-4" />
                                <span className="sr-only">Início</span>
                            </Link>
                        </li>
                    )}

                    {breadcrumbItems.map((item, index) => (
                        <React.Fragment key={index}>
                            {index > 0 || showHome ? (
                                <li className="flex items-center">
                                    <span className={cn("text-theme-text-secondary", separatorClassName)}>
                                        {separator}
                                    </span>
                                </li>
                            ) : null}

                            <li>
                                {item.href && !item.current ? (
                                    <Link
                                        href={item.href}
                                        className={cn(
                                            "text-theme-text-secondary hover:text-theme-primary transition-colors duration-200",
                                            itemClassName
                                        )}
                                    >
                                        {item.name}
                                    </Link>
                                ) : (
                                    <span
                                        className={cn(
                                            "text-theme-text font-medium",
                                            currentItemClassName
                                        )}
                                        aria-current={item.current ? "page" : undefined}
                                    >
                                        {item.name}
                                    </span>
                                )}
                            </li>
                        </React.Fragment>
                    ))}
                </ol>
            </nav>
        );
    }
);

Breadcrumb.displayName = "Breadcrumb";

export default Breadcrumb;