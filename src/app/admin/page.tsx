"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Lock, LogOut, Plus, Edit2, Trash2, Image as ImageIcon, Save, X } from "lucide-react";
import type { Product } from "@/lib/data";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  
  useEffect(() => {
    fetch("/api/auth")
      .then(res => setIsAuthenticated(res.ok))
      .catch(() => setIsAuthenticated(false));
  }, []);

  if (isAuthenticated === null) return <div className="min-h-[100dvh] flex items-center justify-center bg-brand-dark text-white">Cargando...</div>;

  return isAuthenticated ? (
    <AdminDashboard onLogout={() => setIsAuthenticated(false)} />
  ) : (
    <AdminLogin onLogin={() => setIsAuthenticated(true)} />
  );
}

function AdminLogin({ onLogin }: { onLogin: () => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });

      if (res.ok) {
        onLogin();
      } else {
        const data = await res.json();
        setError(data.error || "Credenciales inválidas");
      }
    } catch (err) {
      setError("Error de conexión");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[100dvh] bg-brand-dark flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel p-8 rounded-2xl w-full max-w-md border border-white/10"
      >
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-brand-red/20 text-brand-red flex items-center justify-center">
            <Lock size={32} />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-white text-center mb-8">Acceso Administrativo</h1>
        
        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-500 text-sm p-3 rounded-lg mb-4 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-1">Usuario</label>
            <input 
              type="text" 
              value={username}
              onChange={e => setUsername(e.target.value)}
              className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-red transition-colors"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-1">Contraseña</label>
            <input 
              type="password" 
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-red transition-colors"
              required
            />
          </div>
          <button 
            type="submit"
            disabled={isLoading}
            className="w-full bg-brand-red text-white font-semibold py-3 rounded-lg mt-6 shadow-[0_0_20px_rgba(225,29,72,0.3)] hover:shadow-[0_0_30px_rgba(225,29,72,0.5)] transition-shadow disabled:opacity-50"
          >
            {isLoading ? "Verificando..." : "Ingresar"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}

function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [isEditing, setIsEditing] = useState<Product | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleLogout = async () => {
    await fetch("/api/auth", { method: "DELETE" });
    onLogout();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("¿Estás seguro de eliminar este producto?")) return;
    try {
      await fetch("/api/products", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id })
      });
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-[100dvh] bg-brand-dark p-4 md:p-6">
      <div className="max-w-5xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 glass-panel p-5 rounded-xl border border-white/10">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-white">Panel de Administración</h1>
            <p className="text-zinc-400 text-sm mt-1">Gestiona tu catálogo de productos</p>
          </div>
          <div className="flex w-full md:w-auto gap-3">
            <button 
              onClick={() => setIsCreating(true)}
              className="flex-1 md:flex-none justify-center bg-white/10 text-white px-4 py-2.5 rounded-lg hover:bg-white/20 transition flex items-center gap-2 text-sm font-medium"
            >
              <Plus size={18} /> <span className="hidden sm:inline">Nuevo Producto</span><span className="sm:hidden">Nuevo</span>
            </button>
            <button 
              onClick={handleLogout}
              className="flex-1 md:flex-none justify-center bg-brand-red/10 text-brand-red px-4 py-2.5 rounded-lg hover:bg-brand-red hover:text-white transition flex items-center gap-2 text-sm font-medium"
            >
              <LogOut size={18} /> Salir
            </button>
          </div>
        </header>

        {isLoading ? (
          <div className="text-white text-center py-20">Cargando catálogo...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {products.map(p => (
              <div key={p.id} className="glass-panel p-6 rounded-xl border border-white/5 relative group flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <span className="text-xs font-semibold text-brand-red uppercase tracking-wider">{p.category}</span>
                      <h3 className="text-white font-bold text-lg leading-tight mt-1">{p.name}</h3>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-zinc-400">
                    <p className="flex flex-col">Menudeo <span className="text-white font-semibold">${p.prices.menudeo}</span></p>
                    <p className="flex flex-col">M. Mayoreo <span className="text-white font-semibold">${p.prices.medio_mayoreo}</span></p>
                    <p className="flex flex-col">Mayoreo <span className="text-white font-semibold">${p.prices.mayoreo}</span></p>
                  </div>
                </div>
                
                <div className="flex flex-row md:flex-col gap-2 pt-4 md:pt-0 border-t md:border-t-0 md:border-l border-white/10 md:pl-4 mt-2 md:mt-0 items-center justify-end md:justify-start">
                  <button onClick={() => setIsEditing(p)} className="flex-1 md:flex-none bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white p-2 rounded-lg transition-colors flex items-center justify-center">
                    <Edit2 size={18} />
                  </button>
                  <button onClick={() => handleDelete(p.id)} className="flex-1 md:flex-none bg-brand-red/5 hover:bg-brand-red/20 text-brand-red p-2 rounded-lg transition-colors flex items-center justify-center">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {(isEditing || isCreating) && (
        <ProductModal 
          product={isEditing} 
          onClose={() => { setIsEditing(null); setIsCreating(false); }}
          onSaved={() => { setIsEditing(null); setIsCreating(false); fetchProducts(); }}
        />
      )}
    </div>
  );
}

function ProductModal({ product, onClose, onSaved }: { product: Product | null, onClose: () => void, onSaved: () => void }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const [formData, setFormData] = useState({
    id: product?.id || "",
    name: product?.name || "",
    category: product?.category || "Res",
    description: product?.description || "",
    menudeo: product?.prices.menudeo || 0,
    medio_mayoreo: product?.prices.medio_mayoreo || 0,
    mayoreo: product?.prices.mayoreo || 0,
    unit: product?.unit || "KG",
    isPopular: product?.isPopular || false
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value.toString());
    });
    if (imageFile) {
      data.append("image", imageFile);
    }
    if (product?.imageUrl) {
      data.append("existingImageUrl", product.imageUrl);
    }

    try {
      await fetch("/api/products", {
        method: "POST",
        body: data
      });
      onSaved();
    } catch (err) {
      console.error(err);
      alert("Error al guardar");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-end md:items-center justify-center p-0 md:p-4">
      <motion.div 
        initial={{ y: "100%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="bg-zinc-900 border border-white/10 rounded-t-3xl md:rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl"
      >
        <div className="bg-zinc-900/90 backdrop-blur border-b border-white/10 p-5 md:p-6 flex justify-between items-center rounded-t-3xl md:rounded-2xl shrink-0">
          <h2 className="text-lg md:text-xl font-bold text-white">{product ? "Editar Producto" : "Nuevo Producto"}</h2>
          <button onClick={onClose} className="text-zinc-400 hover:text-white bg-white/5 hover:bg-white/10 p-2 rounded-full transition-colors"><X size={20} /></button>
        </div>

        <div className="overflow-y-auto p-5 md:p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs text-zinc-400 mb-1.5">ID (identificador único)</label>
                <input type="text" value={formData.id} onChange={e => setFormData({...formData, id: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-brand-red focus:outline-none transition-colors" required disabled={!!product} />
              </div>
              <div>
                <label className="block text-xs text-zinc-400 mb-1.5">Nombre Comercial</label>
                <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-brand-red focus:outline-none transition-colors" required />
              </div>
              
              <div>
                <label className="block text-xs text-zinc-400 mb-1.5">Categoría</label>
                <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value as "Res" | "Cerdo" | "Pollo" | "Especiales"})} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-brand-red focus:outline-none transition-colors appearance-none">
                  <option value="Res">Res</option>
                  <option value="Cerdo">Cerdo</option>
                  <option value="Pollo">Pollo</option>
                  <option value="Especiales">Especiales</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-zinc-400 mb-1.5">Unidad de Venta</label>
                <select value={formData.unit} onChange={e => setFormData({...formData, unit: e.target.value as "KG" | "PZA" | "LBS"})} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-brand-red focus:outline-none transition-colors appearance-none">
                  <option value="KG">Kilogramo (KG)</option>
                  <option value="PZA">Pieza (PZA)</option>
                  <option value="LBS">Libra (LBS)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs text-zinc-400 mb-1.5">Descripción</label>
              <textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} rows={2} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white resize-none focus:border-brand-red focus:outline-none transition-colors" required />
            </div>

            <div className="bg-white/5 p-4 rounded-xl border border-white/5">
              <h3 className="text-white font-medium mb-4 text-sm">Precios por Modalidad</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs text-brand-red mb-1.5">Menudeo (1-4 uds)</label>
                  <input type="number" step="0.01" value={formData.menudeo} onChange={e => setFormData({...formData, menudeo: parseFloat(e.target.value)})} className="w-full bg-black/50 border border-brand-red/30 rounded-xl px-4 py-2.5 text-white focus:border-brand-red focus:outline-none transition-colors" required />
                </div>
                <div>
                  <label className="block text-xs text-brand-red mb-1.5">Medio Mayoreo (5-9)</label>
                  <input type="number" step="0.01" value={formData.medio_mayoreo} onChange={e => setFormData({...formData, medio_mayoreo: parseFloat(e.target.value)})} className="w-full bg-black/50 border border-brand-red/30 rounded-xl px-4 py-2.5 text-white focus:border-brand-red focus:outline-none transition-colors" required />
                </div>
                <div>
                  <label className="block text-xs text-brand-red mb-1.5">Mayoreo (10+ uds)</label>
                  <input type="number" step="0.01" value={formData.mayoreo} onChange={e => setFormData({...formData, mayoreo: parseFloat(e.target.value)})} className="w-full bg-black/50 border border-brand-red/30 rounded-xl px-4 py-2.5 text-white focus:border-brand-red focus:outline-none transition-colors" required />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs text-zinc-400 mb-1.5">Fotografía del Producto</label>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-black/30 p-3 rounded-xl border border-white/5">
                {product?.imageUrl && !imageFile && (
                  <img src={product.imageUrl} alt="preview" className="w-16 h-16 rounded-lg object-cover shrink-0" />
                )}
                <div className="flex-1 w-full">
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={e => setImageFile(e.target.files?.[0] || null)}
                    className="w-full text-zinc-400 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-brand-red file:text-white hover:file:bg-brand-red/80 file:cursor-pointer file:transition-colors" 
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-white/5 p-4 rounded-xl border border-white/5">
              <input type="checkbox" id="isPopular" checked={formData.isPopular} onChange={e => setFormData({...formData, isPopular: e.target.checked})} className="w-5 h-5 rounded bg-black border-white/10 text-brand-red focus:ring-brand-red focus:ring-offset-zinc-900" />
              <label htmlFor="isPopular" className="text-sm font-medium text-white cursor-pointer select-none">Destacar como "Más Vendido"</label>
            </div>

            <div className="pt-2 flex flex-col-reverse sm:flex-row justify-end gap-3 pb-4">
              <button type="button" onClick={onClose} className="w-full sm:w-auto px-6 py-3 text-white hover:bg-white/10 rounded-xl transition font-medium">Cancelar</button>
              <button type="submit" disabled={isSaving} className="w-full sm:w-auto bg-brand-red text-white px-8 py-3 rounded-xl shadow-[0_0_15px_rgba(225,29,72,0.3)] hover:shadow-[0_0_25px_rgba(225,29,72,0.5)] transition-all flex items-center justify-center gap-2 font-bold disabled:opacity-70 disabled:cursor-not-allowed">
                {isSaving ? "Guardando..." : <><Save size={18} /> Guardar Producto</>}
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
