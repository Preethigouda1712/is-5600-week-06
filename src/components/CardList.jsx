import React, { useState, useEffect } from "react";
import Search from "./Search";
import Card from "./Card";

import Button from "./Button";

const CardList = ({data}) => {

  const limit = 10;
  const defaultDataset = data.slice(0, limit);

  const [offset, setOffset] = useState(0);
  const [products, setProducts] = useState(defaultDataset);

  // Define the handlePrevious function
  const handlePrevious = () => {
    setOffset(offset - limit);
  }

  // Define the handleNext function
  const handleNext = () => {
    setOffset(offset + limit);
  }

  useEffect(() => {
    setProducts(data.slice(offset, offset + limit));
  }, [offset, limit, data]);

  const filterTags = (searchQuery) => {
    if (!searchQuery) {
      setOffset(0);
      setProducts(data.slice(0, limit));
      return;
    }

    const filtered = data.filter(product =>
      product.tags.find(({ title }) => title.toLowerCase() === searchQuery)
    );
    setOffset(0);
    setProducts(filtered);
  };

  return (
    <div className="cf pa2">
      <Search handleSearch={filterTags} />
      <div className="mt2 mb2">
      {products?.map((product) => (
        <Card key={product.id} {...product} />
      ))}
      </div>

      <div className="w-100 mt3 flex items-center justify-center pa4">   
        <Button text="Previous" handleClick={handlePrevious} />
        <Button text="Next" handleClick={handleNext} />
      </div>
    </div>
  )
}

export default CardList;