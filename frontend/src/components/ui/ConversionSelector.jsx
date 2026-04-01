/**
 * ConversionSelector — Pill-style conversion type picker.
 */
import { motion } from 'framer-motion';

export default function ConversionSelector({ conversions, selected, onSelect }) {
  return (
    <div className="flex flex-wrap gap-2">
      {conversions.map((conv) => (
        <motion.button
          key={conv.id}
          onClick={() => onSelect(conv)}
          className={selected?.id === conv.id ? 'conversion-pill-active' : 'conversion-pill'}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          layout
          id={`conversion-${conv.id}`}
        >
          {conv.name}
        </motion.button>
      ))}
    </div>
  );
}
