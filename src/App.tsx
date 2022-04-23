import { useEffect, useState } from 'react';
import './App.css';
import UserCard from './components/userCard';

function App() {
  const [usersData, setUsersData] = useState([]);
  const [fetchError, setFetchError] = useState('');

  const fetchUserData = async () => {
    try {
      // Use latest comic number to get total xkcd count
      // IMPORTANT: Proxying for CORS purposes. Please visit https://cors-anywhere.herokuapp.com/corsdemo
      //            and click the "Request temporary access to the demo server" button before running the app
      const xkcdPromise = fetch('https://cors-anywhere.herokuapp.com/https://xkcd.com/info.0.json');
      const usersPromise = fetch('https://randomuser.me/api/?results=10');

      const [usersResponse, xkcdResponse] = await Promise.all([usersPromise, xkcdPromise]);
      const [usersRes, xkcdRes] = await Promise.all([usersResponse.json(), xkcdResponse.json()])

      // get random xkcd number from total range
      const xkcdCount = xkcdRes.num;

      const usersData = usersRes.results.map((userRes: any) => {
        userRes.xkcd = Math.floor(Math.random() * xkcdCount);
        return userRes;
      });
    
      setUsersData(usersData);
    } catch (e) {
      console.error(e);

      // If the proxy didn't work, retry with static count for XKCD
      try {
        console.log('CORS proxy failed, fetching with static XKCD count');
        const usersResponse = await fetch('https://randomuser.me/api/?results=10');
        const usersRes = await usersResponse.json();
        const xkcdCount = 2610;

        const usersData = usersRes.results.map((userRes: any) => {
          userRes.xkcd = Math.floor(Math.random() * xkcdCount);
          return userRes;
        });
        
        setUsersData(usersData);
      } catch (e) {
        console.error(e);
        setFetchError('Could not fetch data');
      }
    }
  }

  useEffect(() => {
    fetchUserData();
  }, [])

  return (
    <>
      <header>
        Symplr Challenge
      </header>
      <main>
        {(!fetchError) ?
          usersData.map((userData, i) => {
            return <UserCard key={i} data={userData}/>
          })
        : 
          <div className="error">{fetchError}</div>
        }
      </main>
    </>
  );
}

export default App;
