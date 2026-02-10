function UserProfile() {
  return (
    <div className="user-profile    bg-gray-100 p-8max-w-sm  mx-auto, my-20 rounded-lg shadow-lg sm:p-4 md:p-8 sm:max-w-xs md:max-w-sm hover:shadow-xl">
      <img src="https://via.placeholder.com/150" alt="User" className=" rounded-full w-36 h-36 mx-auto sm:w-24sm:h-24 md:w-36 md:h-36 hover:scale-110 transition-transform duration-300 ease-in-out hover:text-blue-500 " />
      <h1 className=" text-gray-600 text-base sm:text-lg md:text-xl text-xl text-blue-800 my-4">John Doe</h1> 
      <p className="sm:text-sm md:text-base sm: w-24 h-24 md: w-36 h-36">Developer at Example Co. Loves to write code and explore new technologies.</p>
    </div>
  );
}

export default UserProfile;