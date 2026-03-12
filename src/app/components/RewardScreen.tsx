import { motion } from 'motion/react';

interface RewardScreenProps {
  onContinue: () => void;
}

export default function RewardScreen({ onContinue }: RewardScreenProps) {
  return (
    <div className="screen-bg min-h-screen flex flex-col items-center justify-center p-6">
      <div className="ambient-orb w-80 h-80 bg-yellow-600/15 top-1/4 left-1/2 -translate-x-1/2" style={{position:'absolute'}} />

      {/* Animated Coin */}
      <motion.div
        initial={{ scale: 0, rotate: 0 }}
        animate={{ scale: 1, rotate: 360 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="mb-8 relative z-10"
      >
        <div className="text-9xl" style={{filter:'drop-shadow(0 0 30px rgba(234,179,8,0.6))'}}>💰</div>
      </motion.div>

      {/* Celebration */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="text-center mb-10 w-full max-w-md relative z-10"
      >
        <h1 className="display-title text-3xl mb-5">Congratulations!</h1>

        <div className="balance-card p-8 mb-4">
          <p className="mb-2" style={{color:'rgba(223,182,178,0.6)', fontSize:'0.9rem'}}>You earned</p>
          <h2 className="text-4xl mb-2" style={{
            background:'linear-gradient(135deg, #4ade80, #22c55e)',
            WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text',
            filter:'drop-shadow(0 0 10px rgba(34,197,94,0.4))'
          }}>₹50,000</h2>
          <p style={{color:'rgba(223,182,178,0.6)', fontSize:'0.9rem'}}>virtual cash!</p>
        </div>

        <p style={{color:'rgba(223,182,178,0.55)'}}>Practice investing with zero risk.</p>
      </motion.div>

      {/* CTA */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        onClick={onContinue}
        className="btn-primary w-full max-w-md py-4 text-base relative z-10"
        style={{borderRadius:'1rem', background:'linear-gradient(135deg, #22c55e, #16a34a)', boxShadow:'0 6px 30px rgba(34,197,94,0.35)'}}
      >
        Enter Market
      </motion.button>
    </div>
  );
}
