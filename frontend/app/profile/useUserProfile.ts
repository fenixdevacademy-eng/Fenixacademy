
'use client';

import { useState, useEffect } from 'react';
import ProfileStorage, { UserProfile } from '../../lib/profileStorage';

// Usar as interfaces do ProfileStorage

export default function useUserProfile() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        setLoading(true);

        // Tentar carregar do backend primeiro
        try {
          const response = await fetch('/api/users/profile', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });

          if (response.ok) {
            const data = await response.json();
            if (data.success) {
              setProfile(data.data);
              // Salvar no localStorage como backup
              ProfileStorage.saveProfile(data.data);
              return;
            }
          }
        } catch (apiError) {
          console.warn('API call failed, falling back to localStorage:', apiError);
        }

        // Fallback para localStorage
        const storedProfile = ProfileStorage.getProfile();
        setProfile(storedProfile);

      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao carregar perfil');
        console.error('Erro ao carregar perfil:', err);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();

    // Escutar mudanças no perfil
    const handleProfileUpdate = (event: CustomEvent) => {
      setProfile(event.detail);
    };

    window.addEventListener('profileUpdated', handleProfileUpdate as EventListener);

    return () => {
      window.removeEventListener('profileUpdated', handleProfileUpdate as EventListener);
    };
  }, []);

  const updateProfile = async (updatedData: Partial<UserProfile>) => {
    try {
      // Preparar dados para a API
      const apiData = {
        user_info: {
          name: updatedData.user_info?.name || '',
          phone: updatedData.user_info?.phone || '',
          location: updatedData.user_info?.location || '',
          bio: updatedData.user_info?.bio || ''
        },
        preferences: {
          language: updatedData.preferences?.language || 'pt-BR',
          timezone: updatedData.preferences?.timezone || 'America/Sao_Paulo',
          emailNotifications: updatedData.preferences?.emailNotifications || true,
          pushNotifications: updatedData.preferences?.pushNotifications || true
        }
      };

      // Fazer chamada para a API do backend
      const response = await fetch('/api/users/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(apiData),
      });

      if (response.ok) {
        const result = await response.json();

        if (result.success) {
          // Atualizar o estado local com os dados retornados
          const updatedProfile = result.data;
          setProfile(updatedProfile);

          // Salvar no localStorage como backup
          ProfileStorage.saveProfile(updatedProfile);

          return { success: true, message: result.message || 'Perfil atualizado com sucesso' };
        } else {
          throw new Error(result.message || 'Erro ao atualizar perfil');
        }
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || `Erro ${response.status}: ${response.statusText}`);
      }

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao atualizar perfil';
      setError(errorMessage);

      // Em caso de erro na API, tentar salvar localmente como fallback
      try {
        const updatedProfile = ProfileStorage.updateProfile(updatedData);
        setProfile(updatedProfile);
        console.warn('API failed, saved locally as fallback');
      } catch (localError) {
        console.error('Both API and local save failed:', localError);
      }

      return { success: false, error: errorMessage };
    }
  };

  return {
    profile,
    loading,
    error,
    updateProfile,
  };
}
