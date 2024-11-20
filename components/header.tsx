"use client";

import { Bell } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export function Header() {
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2">
          <span className="text-lg">👋</span>
          <span className="font-medium">
            Bem-vindo, <span className="text-blue-600">Nome do user</span>
          </span>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative">
            <button 
              className="p-2 rounded-full hover:bg-white/80 relative"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <Bell className="w-6 h-6" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50">
                <div className="px-4 py-2 border-b border-gray-100">
                  <h3 className="font-semibold">Notificações</h3>
                </div>
                <div className="max-h-[400px] overflow-y-auto">
                  <div className="px-4 py-3 hover:bg-gray-50 cursor-pointer">
                    <p className="text-sm font-medium">Novo recurso disponível!</p>
                    <p className="text-xs text-gray-500 mt-1">Experimente nossa nova ferramenta de geração de imagens com IA.</p>
                  </div>
                  <div className="px-4 py-3 hover:bg-gray-50 cursor-pointer">
                    <p className="text-sm font-medium">Limite atingido</p>
                    <p className="text-xs text-gray-500 mt-1">Você atingiu seu limite diário de transcrições.</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Image
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt="Profile picture"
                width={40}
                height={40}
                className="rounded-full border-2 border-gray-200"
              />
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}