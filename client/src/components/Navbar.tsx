  
  type NavBarProps = {
    title:string
  }

  function NavBar({ title }: NavBarProps) {
    // console.log(title);
    return (
      <nav className="bg-gray-900 text-white px-6 py-4">
        <h1>{title}</h1>
        
      </nav>
    )
  }

  export default NavBar