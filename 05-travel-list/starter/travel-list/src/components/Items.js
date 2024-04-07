export default function Items({ item, onDeleteItems, onToggleItem }) {
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
