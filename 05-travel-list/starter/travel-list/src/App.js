import { useState } from "react";

function App() {
  const [items, setItems] = useState([]);

  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }

  function handleDelete(id) {
    setItems((items) => items.filter((n) => n.id !== id));
  }

  function handleToggleItem(id) {
    setItems((items) =>
      items.map((n) => (n.id === id ? { ...n, packed: !n.packed } : n))
    );
  }

  return (
    <div className="app">
      <Logo />
      <Form onHandleAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItems={handleDelete}
        onToggleItem={handleToggleItem}
      />
      <Stats items={items} />
    </div>
  );
}

function Logo() {
  return <h1>🌴 Far Away 💼</h1>;
}
function Form({ onHandleAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();
    if (!description) return;

    const newItems = { id: Date.now(), description, quantity, packed: false };

    onHandleAddItems(newItems);
    setDescription("");
    setQuantity(1);
  }
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😍 trip ?</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></input>

      <button>Add</button>
    </form>
  );
}
function PackingList({ items, onDeleteItems, onToggleItem, onItemsCount }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Items
            item={item}
            onDeleteItems={onDeleteItems}
            onToggleItem={onToggleItem}
            onItemsCount={onItemsCount}
            key={item.id}
          />
        ))}
      </ul>
    </div>
  );
}

function Items({ item, onDeleteItems, onToggleItem }) {
  return (
    <li>
      <input type="checkbox" onChange={() => onToggleItem(item.id)} />
      <span
        style={
          item.packed
            ? { textDecoration: "line-through" }
            : { textDecoration: "none" }
        }
      >
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItems(item.id)}>❌</button>
    </li>
  );
}

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

export default App;
