import { useState, useEffect } from 'react';
import { Audio } from 'expo-av'
import flute from './flute.wav'
import click from './click.wav';

export const allSounds = {
  flute,
  click
}

/**
 * @name usePlaySound
 * @param {Array} soundsToLoad Array with names of sounds needed for component.
 * Sound names must match sounds found in allSounds object
 */
export default function usePlaySound(soundsToLoad) {

  const [sounds, setSounds] = useState()

  useEffect(() => {

    /**
     * @name soundsNeeded
     * {
     * flute: Audio.Sound.loadAsync('./flute.wav'),
     * click: Audio.Sound.loadAsync('./click.wav')
     * }
     */
    const soundsNeeded = {}

    for (let sound of soundsToLoad) {
      soundsNeeded[sound] = new Audio.Sound()
    }

    try {
      (async () => {
        for (let sound in soundsNeeded) {
          await soundsNeeded[sound].loadAsync(allSounds[sound]);
        }
      })()

      setSounds(soundsNeeded);

    } catch (e) {
      console.log(e)
    }

    return async () => {
      for (let sound in soundsNeeded) {
        await soundsNeeded[sound].unloadAsync()
      }
    }

  }, [])

  /**
   * @param {sounds} soundName
   */
  const playSound = async soundName => {
    try {
      const obj = await sounds[soundName].replayAsync()
      console.log(obj)
    } catch (e) {
      console.log(e)
    }
  }

  return { playSound }
}