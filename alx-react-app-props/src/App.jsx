
import ProfilePage from './ProfilePage';
import UserContext from './UserContext';
function App() {
  const userData = { name: "faith iheabata", email: "Faithiheabata1@gmail.com" };

  return (
    
    <UserContext.Provider value={userData}>
      <ProfilePage /> 
    </UserContext.Provider>
  );
}

export default App;