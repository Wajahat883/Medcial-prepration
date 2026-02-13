'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useAuthStore } from '@/store/auth-store'
import {
  LayoutDashboard,
  BookOpen,
  Clock,
  BarChart3,
  Bookmark,
  Settings,
  LogOut,
  GraduationCap,
  X,
} from 'lucide-react'

const sidebarNavItems = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Question Bank',
    href: '/question-bank',
    icon: BookOpen,
  },
  {
    title: 'Practice Test',
    href: '/test',
    icon: Clock,
  },
  {
    title: 'Analytics',
    href: '/analytics',
    icon: BarChart3,
  },
  {
    title: 'Bookmarks',
    href: '/bookmarks',
    icon: Bookmark,
  },
  {
    title: 'Settings',
    href: '/settings',
    icon: Settings,
  },
]

interface SidebarProps {
  mobile?: boolean
  onClose?: () => void
}

export function Sidebar({ mobile, onClose }: SidebarProps) {
  const pathname = usePathname()
  const { logout } = useAuthStore()

  const handleLogout = () => {
    logout()
    if (onClose) onClose()
  }

  return (
    <div className={cn(
      "h-full border-r bg-white",
      mobile ? "w-full" : "fixed left-0 top-16 z-40 h-[calc(100vh-4rem)] w-64"
    )}>
      <ScrollArea className="h-full py-4">
        <div className="px-3 py-2">
          <Link href="/" className="flex items-center gap-2 px-2 mb-6" onClick={onClose}>
            <div className="w-8 h-8 bg-gradient-to-br from-medical-500 to-teal-500 rounded-lg flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-slate-900">AMC Prep</span>
            {mobile && (
              <Button variant="ghost" size="icon" className="ml-auto" onClick={onClose}>
                <X className="w-5 h-5" />
              </Button>
            )}
          </Link>
          
          <nav className="space-y-1">
            {sidebarNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
              >
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start gap-3 font-normal",
                    pathname === item.href
                      ? "bg-medical-50 text-medical-700 hover:bg-medical-100"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  {item.title}
                </Button>
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-auto px-3 py-2 absolute bottom-4 w-full">
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            onClick={handleLogout}
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </Button>
        </div>
      </ScrollArea>
    </div>
  )
}
