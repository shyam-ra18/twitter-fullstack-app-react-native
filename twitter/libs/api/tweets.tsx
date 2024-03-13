import { createContext, PropsWithChildren, useContext } from 'react';
import { useAuth } from '../../context/Authcontext';
import { API_URL } from './config';

const TweetApiContext = createContext({});

const TweetApiContextProvider = ({ children }: PropsWithChildren) => {

  const { authToken } = useAuth()

  //Get all tweets
  async function listTweets() {
    if (!authToken) return;
    try {
      const res = await fetch(`${API_URL}tweet`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      if (res.status === 401) {
        throw new Error('Not authorized');
      }
      if (res.status !== 200) {
        throw new Error('Error fetching Tweets');
      }
      const data = await res.json();
      return data;
    } catch (error: any) {
      console.error('Error fetching data:', error.message);
    }
  }

  //Get single tweet
  async function getTweet(id: string) {
    if (!authToken) return;
    try {
      const res = await fetch(`${API_URL}tweet/${id}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      if (res.status === 401) {
        throw new Error('Not authorized');
      }
      if (res.status !== 200) {
        throw new Error('Error fetching Tweets');
      }
      const data = await res.json();
      return data;
    } catch (error: any) {
      console.error('Error fetching data:', error.message);
    }
  }

  //Create a tweet
  async function createTweet(data: { content: string }) {
    if (!authToken) return;
    try {
      const res = await fetch(`${API_URL}tweet`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (res.status === 401) {
        throw new Error('Not authorized');
      }
      if (res.status !== 201) {
        throw new Error('Error creating Tweet');
      }
      const response = await res.json();
      return response;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  return (
    <TweetApiContext.Provider value={{ listTweets, getTweet, createTweet }}>{children}</TweetApiContext.Provider>
  );
};


export default TweetApiContextProvider;
export const useTweetsApi = () => useContext(TweetApiContext)