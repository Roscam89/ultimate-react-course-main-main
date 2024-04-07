import { useState } from "react";
import Logo from "./logo";
import Form from "./form";
import PackingList from "./packingList";
import Stats from "./stats";

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

  function handleClear() {
    const message = window.confirm("Are you sure you want to delete list?");

    message ? setItems([]) : alert("Ok");
  }

  return (
    <div className="app">
      <Logo />
      <Form onHandleAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItems={handleDelete}
        onToggleItem={handleToggleItem}
        onHandleClear={handleClear}
      />
      <Stats items={items} />
    </div>
  );
}

export default App;
