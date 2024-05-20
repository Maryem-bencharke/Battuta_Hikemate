import React, { createContext, useState, useEffect, useContext } from 'react';
import { firestore, auth } from '../firebase';
import { collection, query, where, getDocs, deleteDoc, doc, updateDoc, addDoc } from 'firebase/firestore';

const TrackContext = createContext();

export const useTracks = () => useContext(TrackContext);

export const TrackProvider = ({ children }) => {
  const [tracks, setTracks] = useState([]);

  const fetchTracks = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        const q = query(collection(firestore, 'tracks'), where('userId', '==', user.uid));
        const querySnapshot = await getDocs(q);
        const tracksList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setTracks(tracksList);
      }
    } catch (error) {
      console.error('Error fetching tracks:', error);
    }
  };

  const deleteTrack = async (trackId) => {
    try {
      const trackRef = doc(firestore, 'tracks', trackId);
      await deleteDoc(trackRef);
      setTracks(tracks.filter(track => track.id !== trackId));
    } catch (error) {
      console.error('Error deleting track:', error);
    }
  };

//   const updateTrack = async (trackId, updatedData) => {
//     try {
//       const trackRef = doc(firestore, 'tracks', trackId);
//       await updateDoc(trackRef, updatedData);
//       fetchTracks(); // Refresh the tracks list
//     } catch (error) {
//       console.error('Error updating track:', error);
//     }
//   };
    const updateTrack = async (trackId, updatedTrackData) => {
    try {
      const trackRef = doc(firestore, 'tracks', trackId);
      await updateDoc(trackRef, updatedTrackData);
      // Optionally update local state if you're maintaining a local cache of tracks
      setTracks(tracks.map(track => track.id === trackId ? { ...track, ...updatedTrackData } : track));
    } catch (error) {
      console.error('Error updating track:', error);
    }
  };
  
  const saveTrack = async (trackData) => {
    try {
      const user = auth.currentUser;
      if (user) {
        await addDoc(collection(firestore, 'tracks'), {
          ...trackData,
          userId: user.uid, // Ensure the userId is set correctly
          createdAt: new Date()
        });
        fetchTracks(); // Refresh the tracks list
      }
    } catch (error) {
      console.error('Error saving track:', error);
    }
  };

  useEffect(() => {
    fetchTracks();
  }, []);

  return (
    <TrackContext.Provider value={{ tracks, fetchTracks, deleteTrack, updateTrack, saveTrack }}>
      {children}
    </TrackContext.Provider>
  );
};
