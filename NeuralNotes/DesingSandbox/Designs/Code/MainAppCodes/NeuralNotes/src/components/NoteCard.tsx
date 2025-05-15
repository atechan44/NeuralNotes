import React from 'react'
import { motion } from 'framer-motion'

interface NoteCardProps {
  title: string
  content: string
  date: string
  starred?: boolean
}

const NoteCard: React.FC<NoteCardProps> = ({ title, content, date, starred = false }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-zinc-900 rounded-lg p-4 flex flex-col h-full border border-zinc-800 hover:border-zinc-700 transition-colors"
    >
      <div className="flex justify-between mb-2">
        <h3 className="text-lg font-medium text-white">{title}</h3>
        {starred && (
          <span className="text-yellow-400">★</span>
        )}
      </div>
      
      <p className="text-zinc-400 text-sm mb-4 whitespace-pre-line flex-grow">
        {content}
      </p>
      
      <div className="text-xs text-zinc-500 mt-auto">
        {date}
      </div>
    </motion.div>
  )
}

export default NoteCard 