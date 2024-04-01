import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getPriceQueryParams } from '../../helpers/helpers';
import StarRatings from 'react-star-ratings';

export default function Filters({ categories }) {
  const navigate = useNavigate();
  let [searchParams] = useSearchParams();

  const [min, setMin] = useState(0);
  const [max, setMax] = useState(0);

  useEffect(() => {
    searchParams.has('min') && setMin(searchParams.get('min'));
    searchParams.has('max') && setMax(searchParams.get('max'));
  }, []);

  const handleBottomClick = (e) => {
    e.preventDefault();
    searchParams = getPriceQueryParams(searchParams, 'min', min);
    searchParams = getPriceQueryParams(searchParams, 'max', max);
    const path = window.location.pathname + '?' + searchParams.toString();
    navigate(path);
  };

  const handleClick = (checkbox) => {
    const checkboxes = document.getElementsByName(checkbox.name);

    checkboxes.forEach((item) => {
      if (item !== checkbox) item.checked = false;
    });

    if (!checkbox.checked) {
      if (searchParams.has(checkbox.name)) {
        searchParams.delete(checkbox.name);
      }
    } else {
      if (searchParams.has(checkbox.name)) {
        searchParams.set(checkbox.name, checkbox.value);
      } else {
        searchParams.append(checkbox.name, checkbox.value);
      }
    }

    const path = window.location.pathname + '?' + searchParams.toString();
    navigate(path);
  };

  const defaultCheckHandler = (checkboxType, checkboxValue) => {
    const value = searchParams.get(checkboxType);

    if (checkboxValue === value) return true;
    return false;
  };

  return (
    <div className="border p-3 filter">
      <h3>Filtros</h3>
      <hr />
      <h5 className="filter-heading mb-3">Precio</h5>
      <form id="filter_form" className="px-2" onSubmit={handleBottomClick}>
        <div className="row">
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="Min ($)"
              name="min"
              value={min}
              onChange={(e) => setMin(e.target.value)}
            />
          </div>
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="Max ($)"
              name="max"
              value={max}
              onChange={(e) => setMax(e.target.value)}
            />
          </div>
          <div className="col">
            <button type="submit" className="btn btn-primary">
              GO
            </button>
          </div>
        </div>
      </form>
      <hr />
      <h5 className="mb-3">Categoría</h5>
      {categories?.map((category) => (
        <div className="form-check" key={category?.id}>
          <input
            className="form-check-input"
            type="checkbox"
            name="category"
            id="check4"
            value={category?.name}
            defaultChecked={defaultCheckHandler('category', category?.name)}
            onClick={(e) => handleClick(e.target)}
          />
          <label className="form-check-label" htmlFor="check4">
            {' '}
            {category?.name}{' '}
          </label>
        </div>
      ))}
      <hr />
      <h5 className="mb-3">Ratings</h5>
      {[5, 4, 3, 2, 1].map((rating) => (
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            name="ratings"
            id="check7"
            value={rating}
            defaultChecked={defaultCheckHandler('ratings', rating?.toString())}
            onClick={(e) => handleClick(e.target)}
          />
          <label className="form-check-label" htmlFor="check7">
            <StarRatings
              rating={rating}
              starRatedColor="#ffb829"
              numberOfStars={5}
              name="rating"
              starDimension="22px"
              starSpacing="1px"
            />
          </label>
        </div>
      ))}
    </div>
  );
}
