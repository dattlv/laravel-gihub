import { AnimatePresence, motion } from 'framer-motion';
import LoadingOverlay from '../LoadingOverlay';

export default function StepTransition({
  children,
  step,
  isLoading = false,
  _onNext,
  _onPrevious,
}) {
  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ x: step === 1 ? -300 : 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: step === 1 ? 300 : -300, opacity: 0 }}
          transition={{
            type: 'spring',
            stiffness: 260,
            damping: 20,
          }}
          drag={false}
          className="w-full"
        >
          {children}
        </motion.div>
      </AnimatePresence>

      {isLoading && <LoadingOverlay />}
    </div>
  );
}
