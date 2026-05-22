import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <motion.footer
      className="glass-light absolute bottom-0 left-0 right-0 z-20 py-3 px-6"
      initial={{ y: 60 }}
      animate={{ y: 0 }}
      transition={{ delay: 0.8, type: 'spring', stiffness: 220, damping: 26 }}
    >
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <span className="font-bold text-slate-700">ACS Services</span>
          <span>·</span>
          <span>Services à la personne</span>
        </div>
        <div className="flex items-center gap-4">
          <a href="#" className="hover:text-slate-700 transition-colors">Mentions légales</a>
          <a href="#" className="hover:text-slate-700 transition-colors">Contact</a>
          <span>© 2024 ACS Services</span>
        </div>
      </div>
    </motion.footer>
  )
}
