/**
 * Sistema de Cache Avançado
 * Cache em memória, localStorage e IndexedDB
 */

interface CacheItem<T = any> {
    data: T;
    timestamp: number;
    ttl: number;
    version: string;
}

interface CacheOptions {
    ttl?: number; // Time to live em ms
    version?: string;
    storage?: 'memory' | 'localStorage' | 'indexedDB';
    maxSize?: number; // Tamanho máximo em bytes
}

class CacheManager {
    private memoryCache = new Map<string, CacheItem>();
    private defaultTTL = 5 * 60 * 1000; // 5 minutos
    private maxMemorySize = 50 * 1024 * 1024; // 50MB
    private currentMemorySize = 0;

    constructor() {
        this.initializeIndexedDB();
    }

    private async initializeIndexedDB() {
        if (typeof window === 'undefined') return;

        return new Promise<void>((resolve, reject) => {
            const request = indexedDB.open('FenixCache', 1);

            request.onerror = () => reject(request.error);
            request.onsuccess = () => resolve();

            request.onupgradeneeded = (event) => {
                const db = (event.target as IDBOpenDBRequest).result;
                if (!db.objectStoreNames.contains('cache')) {
                    db.createObjectStore('cache', { keyPath: 'key' });
                }
            }
        });
    }

    private getStorageKey(key: string): string {
        return `fenix_cache_${key}`;
    }

    private calculateSize(data: any): number {
        return new Blob([JSON.stringify(data)]).size;
    }

    private isExpired(item: CacheItem): boolean {
        return Date.now() - item.timestamp > item.ttl;
    }

    private async getFromIndexedDB(key: string): Promise<CacheItem | null> {
        if (typeof window === 'undefined') return null;

        return new Promise((resolve, reject) => {
            const request = indexedDB.open('FenixCache', 1);

            request.onsuccess = () => {
                const db = request.result;
                const transaction = db.transaction(['cache'], 'readonly');
                const store = transaction.objectStore('cache');
                const getRequest = store.get(key);

                getRequest.onsuccess = () => {
                    const result = getRequest.result;
                    if (result && !this.isExpired(result)) {
                        resolve(result);
                    } else {
                        resolve(null);
                    }
                }

                getRequest.onerror = () => reject(getRequest.error);
            }

            request.onerror = () => reject(request.error);
        });
    }

    private async setToIndexedDB(key: string, item: CacheItem): Promise<void> {
        if (typeof window === 'undefined') return;

        return new Promise((resolve, reject) => {
            const request = indexedDB.open('FenixCache', 1);

            request.onsuccess = () => {
                const db = request.result;
                const transaction = db.transaction(['cache'], 'readwrite');
                const store = transaction.objectStore('cache');
                const putRequest = store.put({ key, ...item });

                putRequest.onsuccess = () => resolve();
                putRequest.onerror = () => reject(putRequest.error);
            }

            request.onerror = () => reject(request.error);
        });
    }

    private async removeFromIndexedDB(key: string): Promise<void> {
        if (typeof window === 'undefined') return;

        return new Promise((resolve, reject) => {
            const request = indexedDB.open('FenixCache', 1);

            request.onsuccess = () => {
                const db = request.result;
                const transaction = db.transaction(['cache'], 'readwrite');
                const store = transaction.objectStore('cache');
                const deleteRequest = store.delete(key);

                deleteRequest.onsuccess = () => resolve();
                deleteRequest.onerror = () => reject(deleteRequest.error);
            }

            request.onerror = () => reject(request.error);
        });
    }

    private cleanupMemoryCache() {
        const now = Date.now();
        const keysToDelete: string[] = [];

        // Remover itens expirados
        for (const [key, item] of this.memoryCache.entries()) {
            if (this.isExpired(item)) {
                keysToDelete.push(key);
                this.currentMemorySize -= this.calculateSize(item.data);
            }
        }

        keysToDelete.forEach(key => this.memoryCache.delete(key));

        // Se ainda estiver muito grande, remover os mais antigos
        if (this.currentMemorySize > this.maxMemorySize) {
            const sortedEntries = Array.from(this.memoryCache.entries())
                .sort((a, b) => a[1].timestamp - b[1].timestamp);

            for (const [key, item] of sortedEntries) {
                this.memoryCache.delete(key);
                this.currentMemorySize -= this.calculateSize(item.data);

                if (this.currentMemorySize <= this.maxMemorySize * 0.8) {
                    break;
                }
            }
        }
    }

    async get<T>(key: string, options: CacheOptions = {}): Promise<T | null> {
        const storage = options.storage || 'memory';
        const storageKey = this.getStorageKey(key);

        try {
            let item: CacheItem | null = null;

            switch (storage) {
                case 'memory':
                    item = this.memoryCache.get(key) || null;
                    break;

                case 'localStorage':
                    if (typeof window !== 'undefined') {
                        const stored = localStorage.getItem(storageKey);
                        item = stored ? JSON.parse(stored) : null;
                    }
                    break;

                case 'indexedDB':
                    item = await this.getFromIndexedDB(key);
                    break;
            }

            if (!item || this.isExpired(item)) {
                return null;
            }

            return item.data as T;
        } catch (error) {
            console.warn('Cache get error:', error);
            return null;
        }
    }

    async set<T>(key: string, data: T, options: CacheOptions = {}): Promise<void> {
        const ttl = options.ttl || this.defaultTTL;
        const version = options.version || '1.0.0';
        const storage = options.storage || 'memory';
        const storageKey = this.getStorageKey(key);

        const item: CacheItem<T> = {
            data,
            timestamp: Date.now(),
            ttl,
            version
        }

        try {
            switch (storage) {
                case 'memory':
                    this.memoryCache.set(key, item);
                    this.currentMemorySize += this.calculateSize(data);
                    this.cleanupMemoryCache();
                    break;

                case 'localStorage':
                    if (typeof window !== 'undefined') {
                        localStorage.setItem(storageKey, JSON.stringify(item));
                    }
                    break;

                case 'indexedDB':
                    await this.setToIndexedDB(key, item);
                    break;
            }
        } catch (error) {
            console.warn('Cache set error:', error);
        }
    }

    async remove(key: string, options: CacheOptions = {}): Promise<void> {
        const storage = options.storage || 'memory';
        const storageKey = this.getStorageKey(key);

        try {
            switch (storage) {
                case 'memory':
                    const item = this.memoryCache.get(key);
                    if (item) {
                        this.currentMemorySize -= this.calculateSize(item.data);
                        this.memoryCache.delete(key);
                    }
                    break;

                case 'localStorage':
                    if (typeof window !== 'undefined') {
                        localStorage.removeItem(storageKey);
                    }
                    break;

                case 'indexedDB':
                    await this.removeFromIndexedDB(key);
                    break;
            }
        } catch (error) {
            console.warn('Cache remove error:', error);
        }
    }

    async clear(storage?: 'memory' | 'localStorage' | 'indexedDB'): Promise<void> {
        try {
            if (!storage || storage === 'memory') {
                this.memoryCache.clear();
                this.currentMemorySize = 0;
            }

            if (!storage || storage === 'localStorage') {
                if (typeof window !== 'undefined') {
                    const keys = Object.keys(localStorage);
                    keys.forEach(key => {
                        if (key.startsWith('fenix_cache_')) {
                            localStorage.removeItem(key);
                        }
                    });
                }
            }

            if (!storage || storage === 'indexedDB') {
                if (typeof window !== 'undefined') {
                    const request = indexedDB.open('FenixCache', 1);
                    request.onsuccess = () => {
                        const db = request.result;
                        const transaction = db.transaction(['cache'], 'readwrite');
                        const store = transaction.objectStore('cache');
                        store.clear();
                    }
                }
            }
        } catch (error) {
            console.warn('Cache clear error:', error);
        }
    }

    async has(key: string, options: CacheOptions = {}): Promise<boolean> {
        const data = await this.get(key, options);
        return data !== null;
    }

    // Métodos de conveniência para diferentes tipos de dados
    async getJSON<T>(key: string, options: CacheOptions = {}): Promise<T | null> {
        return this.get<T>(key, options);
    }

    async setJSON<T>(key: string, data: T, options: CacheOptions = {}): Promise<void> {
        return this.set(key, data, options);
    }

    async getString(key: string, options: CacheOptions = {}): Promise<string | null> {
        return this.get<string>(key, options);
    }

    async setString(key: string, data: string, options: CacheOptions = {}): Promise<void> {
        return this.set(key, data, options);
    }

    // Cache com fallback
    async getWithFallback<T>(
        key: string,
        fallback: () => Promise<T>,
        options: CacheOptions = {}
    ): Promise<T> {
        const cached = await this.get<T>(key, options);
        if (cached !== null) {
            return cached;
        }

        const data = await fallback();
        await this.set(key, data, options);
        return data;
    }

    // Estatísticas do cache
    getStats() {
        return {
            memorySize: this.currentMemorySize,
            memoryItems: this.memoryCache.size,
            maxMemorySize: this.maxMemorySize
        }
    }
}

// Instância singleton
export const cacheManager = new CacheManager();

// Hook para usar cache em componentes React
export function useCache<T>(
    key: string,
    fetcher: () => Promise<T>,
    options: CacheOptions = {}
) {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const result = await cacheManager.getWithFallback(key, fetcher, options);
            setData(result);
        } catch (err) {
            setError(err as Error);
        } finally {
            setLoading(false);
        }
    }, [key, fetcher, options]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const invalidate = useCallback(async () => {
        await cacheManager.remove(key, options);
        await fetchData();
    }, [key, options, fetchData]);

    return { data, loading, error, refetch: fetchData, invalidate }
}

