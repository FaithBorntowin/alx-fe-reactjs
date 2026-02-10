function UserProfile() {
  return (
    <div className="user-profile  bg-gray-100 p-8max-w-sm  mx-auto, my-20 rounded-lgshadow-lg ">
      <img src="https://via.placeholder.com/150" alt="User" className="rounded-full w-36 h-36 mx-auto" />
      <h1 className="text-xl text-blue-800 my-4 text-gray-600 text-base">John Doe</h1> 
      <p>Developer at Example Co. Loves to write code and explore new technologies.</p>
    </div>
  );
}

export default UserProfile;