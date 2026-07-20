"use client";

import React, { useState } from "react";
import { login } from "@/app/actions/auth";
import { Button } from "@/components/ui/Button";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    try {
      await login(password);
    } catch (err: any) {
      setError(err.message || "Erro ao fazer login");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background-deep flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-surface border border-border/20 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-32 bg-gold-soft/10 blur-[60px] pointer-events-none" />
        
        <div className="relative z-10">
          <h1 className="text-3xl font-serif text-white text-center mb-2">Acesso Restrito</h1>
          <p className="text-muted text-center mb-8">Painel Administrativo da Neew Era</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">Senha de Acesso</label>
              <input 
                type="password" 
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full bg-background-deep border border-border/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold-soft transition-colors"
                placeholder="••••••••"
                required
              />
            </div>

            {error && (
              <p className="text-red-400 text-sm text-center">{error}</p>
            )}

            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? "ENTRANDO..." : "ENTRAR NO PAINEL"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
