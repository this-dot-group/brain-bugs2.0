import { useState, useEffect } from 'react';
import { Audio } from 'expo-av'
import flute from './flute.wav'
import click from './click.wav';

export default function usePlaySound() {
  
  const sounds = {
    flute,
    click
  }
  const [sound, setSound] = useState()

  useEffect(() => {
    console.log('start')
    return () => console.log('end')
  },[])

  /**
   * @param {sounds} soundName
   */
  const playSound = async (soundName) => {
    const { sound } = await Audio.Sound.createAsync(
      sounds[soundName]
    );
    setSound(sound);

    await sound.playAsync();
  }

  useEffect(() => {

    return sound
      ?  () => {
        sound.unloadAsync();
      }
      : undefined;
  }, [sound]);

  const soundCleanUp = () => {
    console.log(sound)
    if (sound) sound.unloadAsync();
  }

  return {playSound, soundCleanUp}
  
}