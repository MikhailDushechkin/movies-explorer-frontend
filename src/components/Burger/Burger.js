import './Burger.css'

function Burger({ loggedIn, isMenuOpen, setIsMenuOpen }) {
  const handleBurgerClick = () => setIsMenuOpen(!isMenuOpen);

  return (
    <button
      className={`burger ${!loggedIn ? 'burger_type_invisible' : ''} ${
        isMenuOpen ? 'burger_type_close' : ''
      }`}
      type="button"
      onClick={handleBurgerClick}
    >
      <span className="burger__line" />
    </button>
  );
}

export default Burger;
