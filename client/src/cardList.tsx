import { useState, useEffect } from "react";
import Card from './card';
// import Database from "@replit/database";
// import AddCardMenu from "./addCard"

/*
Linux
  iota
      ] - ᾳ ῃ ῳ
  Accents
      ;  - ά έ ί ό ύ
      '  - ὰ ὲ ὶ ὸ ὺ
      [  - ᾶ ῖ ῦ
  
  Breathing
  shift; - Ἀ smooth
  shift' - Ἁ rough

Windows
  iota - 
*/

// const db = new Database();

interface card {
  type: string;
  chapter: string;
  english: string;
  greek: string;
}

const listOfCards: card[] = [
  { type: "verb", chapter: "10", english: "hear, listen to , hear of", greek: "ἀκούω, ἀκούσομαι, ἤκουσα" },
  { type: "verb", chapter: "10", english: "die", greek: "ἀποθνῄσκω, άποθανοῦμι, ἀπέθανον" },
  { type: "verb", chapter: "10", english: "do, accomplish, act", greek: "δράω δράσω, ἔδρασα" },
  { type: "verb", chapter: "10", english: "live", greek: "ζάω, ζήσω, ἔζησα" },
  { type: "verb", chapter: "10", english: "call, summon", greek: "καλέω, καλῶ ἐκάλεσα" },
  { type: "verb", chapter: "10", english: "see", greek: "ὁράω, ὄψομαι, εἶδον" },
  { type: "verb", chapter: "10", english: "make, do; treat", greek: "ποιέω, πιήσω, ἐποίησα" },
  { type: "verb", chapter: "10", english: "treat well; treat badly", greek: "εὖ ποιέω; κακῶς ποιέω" },
  { type: "verb", chapter: "10", english: "honor", greek: "τιμάω, τιμήσω, ἐτίησ" },
  { type: "verb", chapter: "10", english: "love, like", greek: "φιλέω, φιλήσω ἐφίλησα" },

  { type: "noun", chapter: "10", english: "earth, land", greek: "γῆ, γῆς, ἡ" },
  { type: "noun", chapter: "10", english: "peace", greek: "εἰρήνη, εἰρήνης, ἡ" },
  { type: "noun", chapter: "10", english: "hope, expectation", greek: "ἐλπίς, ἐλπίδος, ἡ" },
  { type: "noun", chapter: "10", english: "Xenophon", greek: "Ξενοφῶν, Ξενοφῶντος, ὁ" },
  { type: "noun", chapter: "10", english: "ally; allied with (+dat)", greek: "σύμμαχος, σθμμάχου, ὁ" },

  { type: "preposition", chapter: "10", english: "(+ gen.) down from, down upon \n(+acc.) over, down along; according to; against, opposite", greek: "κατά" },
  { type: "preposition", chapter: "10", english: "by land \nby sea", greek: "κατά γῆν, κατά θάλατταν" },

  { type: "conjunction", chapter: "10", english: "if", greek: "εἰ" },
  { type: "conjunction", chapter: "10", english: "when, since, after", greek: "ἐπεί / ἐπειδή" },
  { type: "conjunction", chapter: "10", english: "when", greek: "ὅτε" },
  { type: "conjunction", chapter: "10", english: "because", greek: "ὅτι" },

  { type: "particle", chapter: "10", english: "(+indic.) marks impossibility (does not translate)", greek: "ἄν \n(postpos.)" }
]



export default function CardList() {
  console.log("Created Cardlist");
  const [list, setList] = useState(listOfCards);
  const [englishFront, setEnglishFront] = useState(false);
  const [showBoth, setShowBoth] = useState(false);

  const addCardMenu = (
    <div className="addCard">
      <label>English:</label>
      <input type="text" id="ncEnglish" name="ncEnglish" />

      <label>Greek:</label>
      <input type="text" id="ncGreek" name="ncGreek" />

      <select name="wordType" id="wordType">
        <option value="verb">verb</option>
        <option value="noun">noun</option>
        <option value="preposition">preposition</option>
        <option value="conjunction">conjunction</option>
        <option value="particle">particle</option>
      </select>

      <select name="chapter" id="chapter">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
        <option value="11">11</option>
      </select>

      <button name="submit" id="submit" onClick={submitNewCard}>Add Card</button>
    </div>
  );

  // useEffect(() => {
  //   async function fetchCards() {
  //     const storedCards = await db.get('cards') as card[];
  //     console.log(storedCards);
  //     setList(storedCards || []);
  //   }

  //   fetchCards();
  // }, []);

  function submitNewCard(): void {
    const englishInput = document.getElementById('ncEnglish') as HTMLInputElement;
    const greekInput = document.getElementById('ncGreek') as HTMLInputElement;
    const wordType = document.getElementById('wordType') as HTMLInputElement;
    const chapter = document.getElementById('chapter') as HTMLInputElement;

    if (englishInput && greekInput && wordType && chapter) {
      const newCard = {
        type: wordType.value,
        chapter: chapter.value,
        english: englishInput.value,
        greek: greekInput.value
      };

      setList(prevList => {
        const updatedList = [...prevList, newCard];
        // db.set('cards', updatedList);
        return updatedList;
      });

      englishInput.value = "";
      greekInput.value = "";
    }
  }


  const openAllBtn = (<button type="button"
    onClick={() => setShowBoth(true)
    }>Open All</button>);

  const closeAllBtn = (<button type="button"
    onClick={() => { setShowBoth(false); }}>Close All</button>);


  return (<>
    <div className="settings">
      {showBoth ? closeAllBtn : openAllBtn}
      <br /><br />
      {addCardMenu}
    </div>

    <div className="card-grid">
      {list.map(({ english, greek, type, chapter }, index) => (
        <Card key={index} english={english} greek={greek} englishFront={englishFront} showBoth={showBoth} type={type} chapter={chapter} />
      ))}
    </div>

  </>);
}