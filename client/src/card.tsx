import './App.css'
import { useState, useEffect } from 'react'

interface CardProps {
  english: string,
  greek: string,
  type: string,
  chapter: string,
  englishFront?: boolean,
  showBoth?: boolean
}

export default function Card(props: CardProps) {
  // console.log("Card created");

  const [showBoth, setShowBoth] = useState(props.showBoth || false);

  const front = props.englishFront ? props.english : props.greek;
  const back = props.englishFront ? props.greek : props.english;

  const handleClick = () => {
    setShowBoth(!showBoth);
  }

  useEffect(() => {
    setShowBoth(props.showBoth || false);
  }, [props.showBoth]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div className='card' onClick={handleClick}>
        <p className="cardtext">{front}</p>
        {props.type && props.chapter &&
          <p className="cardtext">{props.type}, Ch.{props.chapter}</p>
        }
      </div>
      {showBoth &&
        <div className='card' onClick={handleClick}>
          <p className="cardtext">{back}</p>  
        </div>
      }
    </div>
  );

}