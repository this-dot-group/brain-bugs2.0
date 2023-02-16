import { useEffect, useState } from 'react';
import { Keyboard } from 'react-native';

export default function useKeyboard () {
  const [keyboardActive, setKeyboardActive] = useState(false);

  useEffect(() => {
    const keyboardShowing = Keyboard.addListener('keyboardWillShow', () => setKeyboardActive(true));
    const keyboardhiding = Keyboard.addListener('keyboardWillHide', () => setKeyboardActive(false));

    return () => {
      keyboardShowing.remove();
      keyboardhiding.remove();
    }
  }, []);

  const hideKeyboard = () => Keyboard.dismiss();

  return { keyboardActive, hideKeyboard }
}