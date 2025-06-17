import { motion } from "motion/react";
import { FcGlobe, FcNook } from "react-icons/fc";
import { BiPhoneCall } from "react-icons/bi";
import { FaSackDollar } from "react-icons/fa6";
import { MdLoop } from "react-icons/md";

const benefits = [
  {
    title: "Verified Reviews",
    description:
      "Read honest feedback from real customers to make the best choice.",
    icon: <FcNook />,
  },
  {
    title: "Best Price Guarantee",
    description: "Get the lowest prices with no hidden fees or surprises.",
    icon: <FaSackDollar />,
  },
  {
    title: "24/7 Customer Support",
    description:
      "Our team is available anytime to assist you with your booking.",
    icon: <BiPhoneCall />,
  },
  {
    title: "Easy Cancellation",
    description: "Flexible cancellation policies to fit your travel plans.",
    icon: <MdLoop />,
  },
  {
    title: "Wide Selection",
    description:
      "Choose from thousands of hotels worldwide across all budgets.",
    icon: <FcGlobe />,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.3, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

export default function WhyBookWithUs() {
  return (
    <>
      <section className="bg-gradient-to-r from-blue-50 to-white py-16 px-4 text-center">
        {/* Title with fade + slide */}
        <motion.h2
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-3xl md:text-4xl font-bold text-gray-800 mb-6"
        >
          Why Book With HotelHub?
        </motion.h2>

        {/* Intro paragraph with fade */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="max-w-3xl mx-auto text-gray-700 text-lg mb-12"
        >
          We provide a seamless and secure booking experience with 24/7 customer
          support, verified reviews, and unbeatable pricing. Your perfect stay
          is just a few clicks away!
        </motion.p>

        {/* Benefits list with staggered slide up */}
        <motion.div
          className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {benefits.map(({ title, description, icon }, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              className="bg-white p-6 rounded-lg shadow-md cursor-pointer"
            >
              <motion.div
                whileInView={{ scale: 1.1 }}
                whileHover={{ scale: 2 }}
                whileTap={{ scale: 0.95 }}
                className="text-5xl mb-4 flex justify-center items-center"
              >
                {icon}
              </motion.div>
              <motion.h3
                animate={{ x: [0, 30, -30, -20, -10] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="text-xl font-semibold mb-2 text-gray-900"
              >
                {title}
              </motion.h3>
              <p className="text-gray-700">{description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA button with bounce */}
        <motion.button
          whileHover={{
            scale: 1.1,
            y: -5,
            boxShadow: "0 8px 15px rgba(0,0,0,0.3)",
          }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="mt-14 bg-blue-600 text-white px-8 py-3 rounded shadow-lg font-semibold"
        >
          Book Your Stay Now
        </motion.button>
      </section>

      {/*  */}

      <section className="bg-yellow-50 py-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          {/* Title scale + fade */}
          <motion.h3
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold mb-4"
          >
            Stay Updated with HotelHub
          </motion.h3>

          {/* Subtitle fade */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 mb-8"
          >
            Subscribe to get exclusive deals, updates, and travel tips to make
            your trips unforgettable!
          </motion.p>

          {/* Form slide up */}
          <motion.form
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            onSubmit={(e) => e.preventDefault()}
          >
            <motion.input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2 border rounded-md w-full sm:w-auto"
              whileFocus={{ scale: 1.05, borderColor: "#3b82f6" }}
            />
            <motion.button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
              whileHover={{ scale: 1.1, y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              Subscribe
            </motion.button>
          </motion.form>

          {/* Extra info with fade and pulse */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-sm text-gray-500 mt-6 italic"
            whileHover={{ scale: 1.02, color: "#f59e0b" }}
          >
            We respect your privacy. Unsubscribe anytime.
          </motion.p>
        </div>
      </section>
    </>
  );
}
