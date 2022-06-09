import React from 'react';

const CarForm = () => {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = new FormData(event.target);
    const formData = Object.fromEntries(form.entries());
    console.log(formData);
    const res = await fetch('/api/cars', {
      body: JSON.stringify(formData),
      headers: {
        'Content-type': 'application/json',
      },
      method: 'POST',
    });

    const result = await res.json();
    console.log(result);
  };
  return (
    <form onSubmit={handleSubmit}>
      <input name="make" type="text" placeholder="make" />
      <input name="model" type="text" placeholder="model" />
      <input name="image" type="text" placeholder="image" />
      <input
        name="description"
        type="text"
        placeholder="description"
      />

      <button type="submit">Create Car</button>
    </form>
  );
};

export default CarForm;
