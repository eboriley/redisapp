import React from 'react';

const SearchForm = () => {
  const [hits, setHits] = React.useState([]);

  const search = async (event) => {
    const q = event.target.value;
    if (q.length > 2) {
      const params = new URLSearchParams({ q });
      const res = await fetch('/api/search?' + params);
      const result = await res.json();
      console.log(result);
      setHits(result['cars']);
    }
  };
  return (
    <div>
      <h1>Find a Car</h1>
      <input onChange={search} type="text" />
      <ol>
        {hits.map((hit) => (
          <div key={hit.entityId}>
            <li>
              {hit.make} {hit.model}
            </li>
            <img src={hit.image} />
          </div>
        ))}
      </ol>
    </div>
  );
};

export default SearchForm;
