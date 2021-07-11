
import { useEffect } from 'react';
import flute from './flute.wav';
import click from './click.wav';
import negativeTone from './negative-tone.wav';
import positiveTone from './positive.wav';
import { connect } from 'react-redux';
import { newSound } from '../store/soundsReducer';

const allSounds = {
  flute,
  click,
  negativeTone,
  positiveTone
}

function Sounds({ newSound }) {

  useEffect(() => {
    for(let sound in allSounds) {
      newSound(allSounds[sound], sound)
    }
  }, [])

  return null;
}

const mapDispatchToProps = { newSound };

export default connect(null, mapDispatchToProps)(Sounds);