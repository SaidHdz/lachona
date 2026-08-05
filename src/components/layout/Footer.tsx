"use client";

import { MapPin, Phone, Mail, Send, ShieldCheck, Clock } from "lucide-react";
import { motion } from "framer-motion";

export function Footer() {
  return (
    <footer id="contacto" className="bg-zinc-950 border-t border-white/5 pt-16 pb-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-brand-red/10 via-brand-dark to-brand-dark opacity-50"></div>
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-16">
          {/* Contact Info */}
          <div>
            <h2 className="text-3xl font-bold text-white mb-6">
              ¿Listo para hacer tu <span className="text-brand-red">pedido?</span>
            </h2>
            <p className="text-zinc-400 mb-8 max-w-md">
              Surtimos a restaurantes, taquerías y público en general. Contáctanos para una cotización personalizada o visítanos en nuestra sucursal.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-brand-red flex-shrink-0">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className="text-white font-medium mb-1">Ubicación</h4>
                  <p className="text-sm text-zinc-400">Central de abastos Reynosa, calle Chile bodega 81, 82, 83 y 84</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-brand-red flex-shrink-0">
                  <Phone size={20} />
                </div>
                <div>
                  <h4 className="text-white font-medium mb-1">Teléfonos de Atención</h4>
                  <p className="text-sm text-zinc-400">8992299540, 8991410355,<br />8991410043 y 8991410552</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-brand-red flex-shrink-0">
                  <Clock size={20} />
                </div>
                <div>
                  <h4 className="text-white font-medium mb-1">Horario de Servicio</h4>
                  <p className="text-sm text-zinc-400">Lunes a Sábado: 8:00am a 6:00pm<br/>Domingo: 8:00am a 3:00pm</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-brand-red flex-shrink-0">
                  <Mail size={20} />
                </div>
                <div>
                  <h4 className="text-white font-medium mb-1">Correo Electrónico</h4>
                  <p className="text-sm text-zinc-400">ventas@distribuidoralachona.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="glass-panel p-8 rounded-2xl relative">
            <h3 className="text-xl font-bold text-white mb-6">Solicitar Cotización</h3>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1">Nombre Completo o Empresa</label>
                <input 
                  type="text" 
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-red transition-colors"
                  placeholder="Ej. Taquería El Pastor"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1">Teléfono (WhatsApp)</label>
                <input 
                  type="tel" 
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-red transition-colors"
                  placeholder="10 dígitos"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1">Mensaje o Pedido</label>
                <textarea 
                  rows={3}
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-red transition-colors resize-none"
                  placeholder="¿Qué cortes necesitas?"
                />
              </div>
              
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-brand-red text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(225,29,72,0.3)] hover:shadow-[0_0_30px_rgba(225,29,72,0.5)] transition-shadow"
              >
                <span>Enviar Solicitud</span>
                <Send size={16} />
              </motion.button>
            </form>
            
            <div className="mt-4 flex items-center justify-center gap-2 text-xs text-zinc-500">
              <ShieldCheck size={14} />
              <span>Protegido por Google reCAPTCHA v3</span>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>© {new Date().getFullYear()} Distribuidora de Carnes La Chona. Todos los derechos reservados.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition-colors">Aviso de Privacidad</a>
            <a href="#" className="hover:text-white transition-colors">Términos y Condiciones</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
