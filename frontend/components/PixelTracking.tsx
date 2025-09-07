'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { pixelTracking } from '../lib/pixel-tracking';

export default function PixelTracking() {
    const pathname = usePathname();

    useEffect(() => {
        // Track page view on route change
        pixelTracking.trackPageView();
    }, [pathname]);

    return null; // This component doesn't render anything
}
