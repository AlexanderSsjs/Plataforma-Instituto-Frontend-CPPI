import { motion } from 'framer-motion';

export const AnimatedIcon = ({ children, color = "#ffffff" }) => {
    return (
        <motion.div
            whileHover={{
            }}
            
            style={
                {
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center' }
            }
        >
            {children}
        </motion.div>
    );
};