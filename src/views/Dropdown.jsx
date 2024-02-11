import { useNavigate } from 'react-router-dom';
import './Dropdown.css';

const Dropdown = ({recipes}) => {

  const navigate = useNavigate();

  return (
    <div>
      <div className="dropdown">
        <button className="dropbtn">Recipes</button>
        <div className="dropdown-content">
          {recipes.map((recipe) => (
            <a key={recipe.id} onClick={() => navigate(`${recipe.id}`)}>
              {recipe.title}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dropdown;
