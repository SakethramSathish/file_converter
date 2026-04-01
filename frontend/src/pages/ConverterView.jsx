/**
 * ConverterView — Route wrapper that loads the correct category converter.
 */
import { useParams, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getCategoryById } from '../utils/constants';
import ConverterPage from '../components/converters/ConverterPage';

const pageVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
};

export default function ConverterView() {
  const { categoryId } = useParams();
  const category = getCategoryById(categoryId);

  if (!category) {
    return <Navigate to="/" replace />;
  }

  return (
    <motion.div
      key={categoryId}
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <ConverterPage category={category} />
    </motion.div>
  );
}
