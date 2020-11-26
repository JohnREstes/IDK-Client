import bento from '../images/bento.png'
import chinese from  '../images/chinese.png'
import egg from '../images/egg.png'
import fish from '../images/fish.png'
import hamburger from '../images/hamburger.png'
import pho from '../images/noodles.png'
import pizza from '../images/pizza.png'
import sandwich from '../images/sandwich.png'
import spaghetti from '../images/spaghetti.png'
import taco from '../images/taco.png'

const cuisineTypes = [
  {
    label: <h4><img className="cuisineItems" src={hamburger} alt="American"/>  American</h4>,
    value: 'tradamerican',
    image: hamburger
  },
  {
    value: 'breakfast',
    label: <h4><img className="cuisineItems" src={egg} alt="Breakfast"/>  Breakfast</h4>,
    image: egg
  },
  {
    value: 'chinese',
    label: <h4><img className="cuisineItems" src={chinese} alt="Chinese"/>  Chinese</h4>,
    image: chinese
  }, 
  {
    value: 'italian',
    label: <h4><img className="cuisineItems" src={spaghetti} alt="Italian"/>  Italian</h4>,
    image: spaghetti
  },  
  {
    value: 'japanese',
    label: <h4><img className="cuisineItems" src={bento} alt="Japanese"/>  Japanese</h4>,
    image: bento
  },
  {
    label: <h4><img className="cuisineItems" src={taco} alt="Mexican"/>  Mexican</h4>,
    value: 'mexican',
    image: taco
  },
  {
    label: <h4><img className="cuisineItems" src={pho} alt="Pho"/>  Phở</h4>,
    value: 'vietnamese',
    image: pho
  }, 
  {
    value: 'pizza',
    label: <h4><img className="cuisineItems" src={pizza} alt="Pizza"/>  Pizza</h4>,
    image: pizza
  },
  {
    value: 'sandwiches',
    label: <h4><img className="cuisineItems" src={sandwich} alt="Sandwich"/>  Sandwich</h4>,
    image: sandwich
  }, 
  {
    value: 'seafood',
    label: <h4><img className="cuisineItems" src={fish} alt="Seafood"/>  Seafood</h4>,
    image: fish
  }, 
];

export default cuisineTypes