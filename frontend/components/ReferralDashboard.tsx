'use client';

import React, { useState, useEffect } from 'react';
import { Share2, Users, DollarSign, Award, Copy, CheckCircle, Gift, Star, TrendingUp, Crown, Target, Zap } from 'lucide-react';
import { referralService, ReferralStats, ReferralTier, Referral } from '@/lib/referrals/referral-service';

interface ReferralDashboardProps {
    userId: string;
    userName: string;
    userEmail: string;
    className?: string;
}

export function ReferralDashboard({ userId, userName, userEmail, className = '' }: ReferralDashboardProps) {
    const [stats, setStats] = useState<ReferralStats | null>(null);
    const [referrals, setReferrals] = useState<Referral[]>([]);
    const [referralCode, setReferralCode] = useState<string>('');
    const [copied, setCopied] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadReferralData();
    }, [userId]);

    const loadReferralData = async () => {
        try {
            setIsLoading(true);

            // Buscar ou criar código de referência
            let code = await referralService.getUserReferralCode(userId);
            if (!code) {
                code = await referralService.createReferralCode(userId, userName, userEmail);
            }
            setReferralCode(code.code);

            // Buscar estatísticas
            const userStats = await referralService.getUserReferralStats(userId);
            setStats(userStats);

            // Buscar referências
            const userReferrals = await referralService.getUserReferrals(userId);
            setReferrals(userReferrals);
        } catch (error) {
            console.error('Erro ao carregar dados de referência:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const copyReferralLink = async () => {
        const link = `${window.location.origin}/assinaturas?ref=${referralCode}`;
        await navigator.clipboard.writeText(link);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const shareReferralLink = async () => {
        const link = `${window.location.origin}/assinaturas?ref=${referralCode}`;
        const text = `Junte-se à Fenix Academy usando meu código de referência: ${referralCode}`;

        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'Fenix Academy - Referência',
                    text,
                    url: link,
                });
            } catch (error) {
                console.log('Compartilhamento cancelado');
            }
        } else {
            // Fallback para navegadores que não suportam Web Share API
            await navigator.clipboard.writeText(`${text}\n${link}`);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const getTierInfo = (referralCount: number): ReferralTier => {
        return referralService.getUserTier(referralCount);
    };

    const getProgressToNextTier = (currentCount: number): number => {
        const tiers = referralService.getAllTiers();
        const nextTier = tiers.find(tier => tier.minReferrals > currentCount);
        if (!nextTier) return 100;

        const previousTier = tiers.find(tier => tier.minReferrals <= currentCount);
        const previousCount = previousTier?.minReferrals || 0;
        const progress = ((currentCount - previousCount) / (nextTier.minReferrals - previousCount)) * 100;

        return Math.min(Math.max(progress, 0), 100);
    };

    if (isLoading) {
        return (
            <div className={`bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 ${className}`}>
                <div className="animate-pulse">
                    <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-4"></div>
                    <div className="space-y-3">
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
                    </div>
                </div>
            </div>
        );
    }

    if (!stats) {
        return (
            <div className={`bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 ${className}`}>
                <div className="text-center text-gray-500 dark:text-gray-400">
                    Erro ao carregar dados de referência
                </div>
            </div>
        );
    }

    const currentTier = getTierInfo(stats.totalReferrals);
    const progressToNext = getProgressToNextTier(stats.totalReferrals);

    return (
        <div className={`bg-white dark:bg-gray-900 rounded-lg shadow-lg ${className}`}>
            {/* Header */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg">
                        <Share2 className="w-6 h-6" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                            Programa de Referência
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400">
                            Indique amigos e ganhe recompensas incríveis!
                        </p>
                    </div>
                </div>

                {/* Current Tier */}
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-full ${currentTier.color} text-white`}>
                                <span className="text-lg">{currentTier.icon}</span>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900 dark:text-white">
                                    Nível {currentTier.name}
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    {stats.totalReferrals} referências realizadas
                                </p>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-2xl font-bold text-gray-900 dark:text-white">
                                R$ {stats.totalEarnings.toFixed(2)}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                Total ganho
                            </div>
                        </div>
                    </div>

                    {/* Progress Bar */}
                    {stats.nextReward && (
                        <div className="mt-4">
                            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                                <span>Próximo nível</span>
                                <span>{stats.nextReward.referralsNeeded} referências restantes</span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                <div
                                    className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
                                    style={{ width: `${progressToNext}%` }}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="p-6 space-y-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                        <div className="flex items-center gap-3">
                            <Users className="w-8 h-8 text-blue-500" />
                            <div>
                                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                                    {stats.totalReferrals}
                                </div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">
                                    Total de Referências
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                        <div className="flex items-center gap-3">
                            <CheckCircle className="w-8 h-8 text-green-500" />
                            <div>
                                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                                    {stats.completedReferrals}
                                </div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">
                                    Concluídas
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4">
                        <div className="flex items-center gap-3">
                            <DollarSign className="w-8 h-8 text-yellow-500" />
                            <div>
                                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                                    R$ {stats.availableRewards.toFixed(2)}
                                </div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">
                                    Disponível
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
                        <div className="flex items-center gap-3">
                            <Award className="w-8 h-8 text-purple-500" />
                            <div>
                                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                                    {currentTier.name}
                                </div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">
                                    Seu Nível
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Referral Code */}
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        Seu Código de Referência
                    </h3>
                    <div className="flex gap-3">
                        <div className="flex-1 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-3">
                            <code className="text-lg font-mono text-gray-900 dark:text-white">
                                {referralCode}
                            </code>
                        </div>
                        <button
                            onClick={copyReferralLink}
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
                        >
                            {copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                            {copied ? 'Copiado!' : 'Copiar Link'}
                        </button>
                        <button
                            onClick={shareReferralLink}
                            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2"
                        >
                            <Share2 className="w-4 h-4" />
                            Compartilhar
                        </button>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                        Compartilhe este código com seus amigos e ganhe recompensas quando eles se inscreverem!
                    </p>
                </div>

                {/* Tier Benefits */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        Benefícios do Nível {currentTier.name}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {currentTier.benefits.map((benefit, index) => (
                            <div key={index} className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                                <Gift className="w-4 h-4 text-green-500" />
                                {benefit}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Referrals */}
                <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        Referências Recentes
                    </h3>
                    {referrals.length === 0 ? (
                        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                            <Users className="w-12 h-12 mx-auto mb-3 opacity-50" />
                            <p>Nenhuma referência ainda</p>
                            <p className="text-sm">Compartilhe seu código para começar a ganhar!</p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {referrals.slice(0, 5).map((referral) => (
                                <div
                                    key={referral.id}
                                    className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className={`w-3 h-3 rounded-full ${referral.status === 'completed' ? 'bg-green-500' :
                                                referral.status === 'pending' ? 'bg-yellow-500' :
                                                    'bg-gray-400'
                                            }`} />
                                        <div>
                                            <div className="font-medium text-gray-900 dark:text-white">
                                                {referral.refereeName}
                                            </div>
                                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                                {referral.refereeEmail}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-medium text-gray-900 dark:text-white">
                                            R$ {referral.reward.value.toFixed(2)}
                                        </div>
                                        <div className={`text-sm ${referral.status === 'completed' ? 'text-green-600 dark:text-green-400' :
                                                referral.status === 'pending' ? 'text-yellow-600 dark:text-yellow-400' :
                                                    'text-gray-500 dark:text-gray-400'
                                            }`}>
                                            {referral.status === 'completed' ? 'Concluída' :
                                                referral.status === 'pending' ? 'Pendente' :
                                                    'Cancelada'}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Call to Action */}
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg p-6 text-center">
                    <h3 className="text-xl font-bold mb-2">
                        Comece a Ganhar Hoje!
                    </h3>
                    <p className="mb-4 opacity-90">
                        Compartilhe seu código e ganhe recompensas a cada nova inscrição
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <button
                            onClick={shareReferralLink}
                            className="px-6 py-3 bg-white text-purple-600 rounded-lg font-medium hover:bg-gray-100 transition-colors flex items-center gap-2"
                        >
                            <Share2 className="w-5 h-5" />
                            Compartilhar Agora
                        </button>
                        <button className="px-6 py-3 border-2 border-white text-white rounded-lg font-medium hover:bg-white hover:text-purple-600 transition-colors">
                            Ver Como Funciona
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ReferralDashboard;

