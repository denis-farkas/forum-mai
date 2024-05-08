import { Link } from 'react-router-dom';
import "./card.css"
const Card = ({item}) => {
  return (
    <div className="card mb-3">
    <h3 className="card-header">{item.title}</h3>
    <div className="card-body">
     <Link
        key={item.id}
        to={`/projet/${item.id}`}
        state={{ item: item }}
      >
        <img className="card-img-top" src={item.image } alt={item.name} />
     </Link>
    </div>
    <div className="card-footer ">
    <p>  {item.description} </p>
    </div>
    </div>

  )
}

export default Card