'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode, useState } from 'react';

export default function ReactQueryProvider({ children }: { children: ReactNode }) {
    // ⚡ Ensure client-side query client (Next.js safe)
    const [queryClient] = useState(() => new QueryClient({
        defaultOptions: {
            queries: {
                refetchOnWindowFocus: false,
                retry: 2,
                staleTime: 1000 * 60 * 5, // cache for 5 minutes
            },
        },
    }));

    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
