import { motion, AnimatePresence } from 'framer-motion';
import LoadingOverlay from '@/Components/LoadingOverlay';

export default function StepTransition({ children, step, isLoading, onNext, onPrevious }) {
    const slideVariants = {
        enter: (direction) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1
        },
        exit: (direction) => ({
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0
        })
    };

    const swipeConfidenceThreshold = 10000;
    const swipePower = (offset, velocity) => {
        return Math.abs(offset) * velocity;
    };

    return (
        <div className="relative w-full">
            <AnimatePresence initial={false} mode="wait" custom={step}>
                <motion.div
                    key={step}
                    custom={step}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                        x: { type: "spring", stiffness: 300, damping: 30 },
                        opacity: { duration: 0.2 }
                    }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={1}
                    onDragEnd={(e, { offset, velocity }) => {
                        const swipe = swipePower(offset.x, velocity.x);

                        if (swipe < -swipeConfidenceThreshold) {
                            // Swipe left to go forward
                            if (step === 1 && onNext) onNext();
                        } else if (swipe > swipeConfidenceThreshold) {
                            // Swipe right to go back
                            if (step === 2 && onPrevious) onPrevious();
                        }
                    }}
                    className="w-full"
                >
                    {children}
                </motion.div>
            </AnimatePresence>

            <AnimatePresence>
                {isLoading && (
                    <motion.div
                        key="loading-wrapper"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="absolute inset-0"
                    >
                        <LoadingOverlay message="Đang xác thực..." />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
