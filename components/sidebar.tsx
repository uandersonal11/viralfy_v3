"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  MessageSquare,
  FileAudio,
  Pencil,
  Mic,
  Palette,
  Languages,
  Sparkles,
  Hash,
  Image,
  Type,
  Music,
  FileText,
  LifeBuoy,
  UserCircle,
  LogOut,
} from "lucide-react";

const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/",
  },
  {
    title: "Chat Assistante",
    icon: MessageSquare,
    href: "/chat",
  },
  {
    title: "Transcrição",
    icon: FileAudio,
    href: "/transcricao",
  },
  {
    title: "Roteiros IA",
    icon: Pencil,
    href: "/roteiros",
  },
  {
    title: "Narração",
    icon: Mic,
    href: "/narracao",
    badge: "PRO",
  },
  {
    title: "Temas",
    icon: Palette,
    href: "/temas",
  },
  {
    title: "Traduzir",
    icon: Languages,
    href: "/traduzir",
  },
  {
    title: "Gerar Prompts",
    icon: Sparkles,
    href: "/prompts",
  },
  {
    title: "Hashtag viral",
    icon: Hash,
    href: "/hashtags",
  },
  {
    title: "Gerar Imagens IA",
    icon: Image,
    href: "/imagens",
    badge: "PRO",
  },
  {
    title: "Títulos",
    icon: Type,
    href: "/titulos",
  },
  {
    title: "Trilhas sonoras",
    icon: Music,
    href: "/trilhas",
  },
  {
    title: "Notas",
    icon: FileText,
    href: "/notas",
  },
];

const bottomMenuItems = [
  {
    title: "Suporte",
    icon: LifeBuoy,
    href: "/suporte",
  },
  {
    title: "Minha conta",
    icon: UserCircle,
    href: "/conta",
  },
  {
    title: "Sair",
    icon: LogOut,
    href: "/logout",
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="hidden lg:flex flex-col w-64 bg-[#101214] text-white min-h-screen">
      <div className="p-6">
        <Link href="/" className="flex items-center">
          <span className="text-2xl font-bold">
            <span className="text-blue-500">Viral</span>
            <span>Fy</span>
          </span>
        </Link>
      </div>

      <div className="px-4 text-sm font-medium text-gray-400">MENU</div>

      <nav className="flex-1 px-2 py-4 space-y-1">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center px-4 py-2 rounded-lg transition-colors",
              pathname === item.href
                ? "bg-blue-600 text-white"
                : "text-gray-300 hover:bg-blue-600/10 hover:text-white"
            )}
          >
            <item.icon className="w-5 h-5 mr-3" />
            {item.title}
            {item.badge && (
              <span className="ml-auto text-xs bg-blue-600 px-2 py-1 rounded">
                {item.badge}
              </span>
            )}
          </Link>
        ))}
      </nav>

      <div className="mt-auto">
        <div className="px-2 py-4 border-t border-gray-800">
          {bottomMenuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center px-4 py-2 text-gray-300 rounded-lg hover:bg-blue-600/10 hover:text-white transition-colors"
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.title}
            </Link>
          ))}
        </div>

        <div className="p-4 text-xs text-gray-400 border-t border-gray-800">
          v1.0 | Desenvolvido com ❤️ por Brev Mídias
        </div>
      </div>
    </div>
  );
}