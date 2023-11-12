
const NavBar = () => {
  return (
    <div className="sticky top-0 z-[3] bg-[#739072] border-b-[1px] border-[#3A4D39] grid grid-flow-col items-center h-16 text-white">
      <ul className="flex space-x-20 mr-24 justify-self-end text-[#ECE3CE] font-bold">
        <li>Home</li>
        <li>Contact</li>
        <li>Blog</li>
      </ul>
    </div>
  );
};

export default NavBar;
