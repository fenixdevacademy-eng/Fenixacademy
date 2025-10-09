'use client'

import { useEffect } from 'react'

export default function CacheBuster() {
  useEffect(() => {
    // Força atualização do cache
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistrations().then(function(registrations) {
        for(let registration of registrations) {
          registration.unregister();
        }
      });
    }

    // Limpa cache do browser
    if ('caches' in window) {
      caches.keys().then(function(names) {
        for (let name of names) {
          caches.delete(name);
        }
      });
    }

    // Adiciona timestamp para forçar reload
    const timestamp = new Date().getTime();
    const currentUrl = window.location.href;
    
    if (currentUrl.includes('?')) {
      window.location.href = currentUrl + '&_t=' + timestamp;
    } else {
      window.location.href = currentUrl + '?_t=' + timestamp;
    }
  }, []);

  return null;
}


