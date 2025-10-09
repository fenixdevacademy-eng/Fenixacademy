'use client';

import React from 'react';
import { NavLinks } from '@/components/ui/NavigationLink';
import { ROUTES } from '@/lib/routes';

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center space-x-2 mb-4">
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-sm">F</span>
                            </div>
                            <span className="text-xl font-bold">Fenix Academy</span>
                        </div>
                        <p className="text-gray-400 mb-6 max-w-md">
                            A plataforma mais revolucionária do Brasil para desenvolvedores.
                            Aprenda React, Node.js, Python e mais com IA tutor personalizada.
                        </p>
                        <div className="flex space-x-4">
                            <NavLinks.GitHub className="text-gray-400 hover:text-white transition-colors" />
                            <NavLinks.LinkedIn className="text-gray-400 hover:text-white transition-colors" />
                            <NavLinks.Discord className="text-gray-400 hover:text-white transition-colors" />
                            <NavLinks.YouTube className="text-gray-400 hover:text-white transition-colors" />
                        </div>
                    </div>

                    {/* Learning */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Aprender</h3>
                        <ul className="space-y-2">
                            <li>
                                <NavLinks.Courses className="text-gray-400 hover:text-white transition-colors" />
                            </li>
                            <li>
                                <NavLinks.IDE className="text-gray-400 hover:text-white transition-colors" />
                            </li>
                            <li>
                                <NavLinks.AI className="text-gray-400 hover:text-white transition-colors" />
                            </li>
                            <li>
                                <NavLinks.Certificates className="text-gray-400 hover:text-white transition-colors" />
                            </li>
                            <li>
                                <NavLinks.Community className="text-gray-400 hover:text-white transition-colors" />
                            </li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Suporte</h3>
                        <ul className="space-y-2">
                            <li>
                                <NavLinks.Help className="text-gray-400 hover:text-white transition-colors" />
                            </li>
                            <li>
                                <NavLinks.Support className="text-gray-400 hover:text-white transition-colors" />
                            </li>
                            <li>
                                <NavLinks.Contact className="text-gray-400 hover:text-white transition-colors" />
                            </li>
                            <li>
                                <NavLinks.Careers className="text-gray-400 hover:text-white transition-colors" />
                            </li>
                            <li>
                                <NavLinks.Blog className="text-gray-400 hover:text-white transition-colors" />
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="border-t border-gray-800 mt-8 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="text-gray-400 text-sm">
                            © 2024 Fenix Academy. Todos os direitos reservados.
                        </div>
                        <div className="flex space-x-6 mt-4 md:mt-0">
                            <NavLinks.Terms className="text-gray-400 hover:text-white transition-colors text-sm" />
                            <NavLinks.Privacy className="text-gray-400 hover:text-white transition-colors text-sm" />
                            <NavLinks.Cookies className="text-gray-400 hover:text-white transition-colors text-sm" />
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}