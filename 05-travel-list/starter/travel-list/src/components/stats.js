function Stats({ items }) {
  if (!items.length)
    return (
      <p className="stats">
        <em>Start packing your items! 😊</em>
      </p>
    );

  const numIntems = items.length;
  const packedItems = items.filter((n) => n.packed).length;
  const percentage = ((packedItems / numIntems) * 100).toFixed(1);

  return (
    <footer className="stats">
      <em>
        {percentage === 100
          ? `You got everything!
          Ready to go ✈`
          : ` 💼 You have ${numIntems} items on your list, and you
          allready packed ${packedItems} ( ${percentage} %) `}
      </em>
    </footer>
  );
}

export default Stats;
