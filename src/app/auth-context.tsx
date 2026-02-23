'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface User {
  id: string
  email: string
  name: string
  plan: 'free' | 'pro'
  generationsLeft: number
}

interface AuthContextType {
  user: User | null
  loading: boolean
  signUp: (email: string, password: string, name: string) => Promise<boolean>
  signIn: (email: string, password: string) => Promise<boolean>
  signOut: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('contentforge_user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setLoading(false)
  }, [])

  const signUp = async (email: string, password: string, name: string): Promise<boolean> => {
    // Check if user exists
    const users = JSON.parse(localStorage.getItem('contentforge_users') || '[]')
    
    if (users.find((u: any) => u.email === email)) {
      return false
    }

    // Create new user
    const newUser: User = {
      id: Date.now().toString(),
      email,
      name,
      plan: 'free',
      generationsLeft: 5,
    }

    users.push({ ...newUser, password })
    localStorage.setItem('contentforge_users', JSON.stringify(users))
    localStorage.setItem('contentforge_user', JSON.stringify(newUser))
    setUser(newUser)
    return true
  }

  const signIn = async (email: string, password: string): Promise<boolean> => {
    const users = JSON.parse(localStorage.getItem('contentforge_users') || '[]')
    const foundUser = users.find((u: any) => u.email === email && u.password === password)

    if (!foundUser) {
      return false
    }

    const { password: _, ...userWithoutPassword } = foundUser
    localStorage.setItem('contentforge_user', JSON.stringify(userWithoutPassword))
    setUser(userWithoutPassword)
    return true
  }

  const signOut = () => {
    localStorage.removeItem('contentforge_user')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
