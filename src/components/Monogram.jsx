const Monogram = ({ className = "", alt = "JF gear logo" }) => (
  <img
    src="/logo-jf.png"
    alt={alt}
    className={`inline-block w-10 h-10 object-contain select-none ${className}`}
  />
);

export default Monogram;
