import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <motion.footer
      className="frosted-glass-dark absolute bottom-0 left-0 right-0 z-20 py-4 px-6"
      initial={{ y: 80 }}
      animate={{ y: 0 }}
      transition={{ delay: 1.2, type: 'spring', stiffness: 200, damping: 25 }}
    >
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-400">
        <div className="flex items-center gap-2">
          <span className="font-bold text-white">ACS Services</span>
          <span>·</span>
          <span>Services à la personne</span>
        </div>
        <div className="flex items-center gap-4">
          <a href="#" className="hover:text-white transition-colors">Mentions légales</a>
          <a href="#" className="hover:text-white transition-colors">Contact</a>
          <span>© 2024 ACS Services</span>
        </div>
      </div>
    </motion.footer>
  )
}
